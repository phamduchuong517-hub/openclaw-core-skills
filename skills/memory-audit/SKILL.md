---
name: memory-audit
description: 跨系统记忆审计技能 - 审计 OpenClaw 和 Hermes 双系统记忆同步状态，识别数据不一致、时间戳断层、同步中断问题
version: 1.0.0
type: 系统诊断技能
source: 2026-04-17 记忆 forensics 任务经验
---

# 📊 Memory Audit - 跨系统记忆审计技能

**审计 OpenClaw 和 Hermes 双系统记忆同步状态，识别数据不一致问题**

---

## 使用场景

- 用户报告"记忆丢失"或"数据不一致"
- 需要验证双系统记忆同步是否正常
- 定期检查记忆系统健康状态
- 排查会话状态丢失问题

---

## 审计步骤

### 步骤 1: 定位记忆文件

```bash
# OpenClaw 记忆路径
/root/.openclaw/memory-tdai/records/*.jsonl

# Hermes 记忆路径
/root/.hermes/memories/MEMORY.md
/root/.hermes/memories/memory/*.md
/root/.hermes/SESSION-STATE.md
```

### 步骤 2: 统计记录数量

```bash
# 统计各文件记录数
wc -l /root/.openclaw/memory-tdai/records/*.jsonl

# 检查 Hermes 记忆文件是否存在
ls -la ~/.hermes/memories/
```

### 步骤 3: 读取并解析记忆

**OpenClaw (JSONL 格式)**:
```bash
# 读取指定日期记忆
cat /root/.openclaw/memory-tdai/records/2026-04-17.jsonl

# 读取最近 N 条记忆
tail -20 /root/.openclaw/memory-tdai/records/2026-04-16.jsonl
```

**Hermes (Markdown 格式)**:
```bash
# 读取主记忆文件
cat ~/.hermes/memories/MEMORY.md

# 检查最后更新时间
grep "最后更新" ~/.hermes/memories/MEMORY.md
```

### 步骤 4: 交叉验证时间戳

**关键检查点**:

| 检查项 | 预期 | 问题信号 |
|--------|------|----------|
| Hermes 最后更新时间 | <24 小时前 | 超过 24 小时未更新 |
| SESSION-STATE.md | 存在 | 文件缺失 |
| OpenClaw 记录数 | 持续增长 | 突然中断 |
| 同步文件 | auto-sync-from-hermes.jsonl 存在 | 文件缺失或过时 |

### 步骤 5: 识别同步间隙

```bash
# 检查同步文件时间戳
ls -la /root/.openclaw/memory-tdai/records/auto-sync-from-hermes.jsonl
ls -la /root/.openclaw/memory-tdai/records/shared-from-hermes.jsonl

# 对比两个系统的最后记录时间
# OpenClaw: tail -1 *.jsonl | jq .timestamps[-1]
# Hermes: grep "最后更新" MEMORY.md
```

---
---
## 常见问题模式

### 问题 1: Hermes 记忆停止更新

**症状**:
- MEMORY.md 最后更新时间 >24 小时前
- OpenClaw 记忆持续更新

**可能原因**:
- Hermes 记忆系统未初始化
- 自动记忆触发器失效
- 会话重启后未恢复记忆状态

**解决方案**:
```python
# 1. 更新 MEMORY.md 第一行 (最后更新时间)
# 2. 创建每日记忆文件 ~/.hermes/memories/memory/YYYY-MM-DD.md
# 3. 创建/更新 SESSION-STATE.md
```

**实际修复步骤**:
1. 创建每日记忆文件：`~/.hermes/memories/memory/2026-04-17.md`
2. 更新 MEMORY.md 第一行的时间戳
3. 创建 SESSION-STATE.md 包含任务状态和系统信息
4. 验证文件存在性和内容

---

### 问题 2: SESSION-STATE.md 缺失

**症状**:
- 文件不存在
- 待办事项/进行中任务丢失

**解决方案**:
重建 SESSION-STATE.md 文件，必须包含以下部分：

```markdown
# 📋 SESSION-STATE.md - 会话状态

**最后更新**: YYYY-MM-DDTHH:MM:SS+08:00
**会话 ID**: agent:main:qqbot:dm:XXX

## 🔄 进行中任务 (IN PROGRESS)
## ✅ 已完成任务 (COMPLETED)
## 📋 待办事项 (TODO)
## 📊 系统状态
## ⚠️ 已知问题
```

---

### 问题 3: 同步文件过时

**症状**:
- auto-sync-from-hermes.jsonl 时间戳陈旧
- 两个系统记录数差异大

**解决方案**:
1. 检查同步脚本是否运行
2. 验证同步 cron job 状态
3. 手动触发同步

**手动同步步骤**:
```python
# 读取 OpenClaw JSONL 记忆
# 解析记忆内容
# 创建 Hermes Markdown 同步文件
# 记录同步时间和记忆数量
```

**同步文件位置**:
- `~/.hermes/memories/memory/YYYY-MM-DD-OpenClaw 同步.md`

---

### 问题 4: 废弃配置未清理

**症状**:
```
plugins.entries.xxx: plugin not found (stale config)
```

**解决方案**:
```python
import json

# 读取配置文件
with open('/root/.openclaw/openclaw.json', 'r') as f:
    config = json.load(f)

# 移除废弃插件
stale_plugins = ['ddingtalk', 'wecom', 'openclaw-plugin-yuanbao']
for plugin in stale_plugins:
    if plugin in config['plugins']['entries']:
        del config['plugins']['entries'][plugin]

# 写回配置
with open('/root/.openclaw/openclaw.json', 'w') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)
```

**验证清理**:
```bash
cat /root/.openclaw/openclaw.json | grep -A20 '"plugins"'
```

---

## 修复工作流 (完整流程)

### 阶段 1: 诊断

```bash
# 1. 检查 Hermes 记忆文件
ls -la ~/.hermes/memories/
ls -la ~/.hermes/memories/memory/

# 2. 检查 OpenClaw 记忆文件
ls -la /root/.openclaw/memory-tdai/records/

# 3. 统计记录数
wc -l /root/.openclaw/memory-tdai/records/*.jsonl

# 4. 检查最后更新时间
grep "最后更新" ~/.hermes/memories/MEMORY.md
```

### 阶段 2: 修复

```bash
# 1. 创建/更新 MEMORY.md
# 2. 创建每日记忆文件
# 3. 创建 SESSION-STATE.md
# 4. 同步 OpenClaw 记忆 (如有需要)
# 5. 清理废弃配置 (如有需要)
```

### 阶段 3: 验证

```bash
# 验证文件存在性
ls -la ~/.hermes/memories/MEMORY.md
ls -la ~/.hermes/SESSION-STATE.md
ls -la ~/.hermes/memories/memory/

# 验证时间戳
head -1 ~/.hermes/memories/MEMORY.md
head -5 ~/.hermes/SESSION-STATE.md

# 验证配置清理
cat /root/.openclaw/openclaw.json | grep -A20 '"plugins"'
```

### 验证清单

- [ ] MEMORY.md 最后更新时间 <1 小时前
- [ ] SESSION-STATE.md 存在且内容完整
- [ ] 每日记忆文件存在 (YYYY-MM-DD.md)
- [ ] 无插件配置警告
- [ ] OpenClaw 和 Hermes 记忆时间戳一致

---

## 审计报告模板

```markdown
# 记忆系统审计报告

## 审计时间
YYYY-MM-DD HH:MM

## 系统状态

| 系统 | 最后更新 | 记录数 | 状态 |
|------|---------|--------|------|
| OpenClaw | YYYY-MM-DD | N 条 | ✅/❌ |
| Hermes | YYYY-MM-DD | N 条 | ✅/❌ |

## 发现的问题

1. **问题描述**
   - 严重程度：P0/P1/P2
   - 影响范围：xxx
   - 建议修复：xxx

## 同步间隙

- OpenClaw 记录：N 条 (日期范围)
- Hermes 记录：N 条 (日期范围)
- 缺失记录：N 条 (日期范围)

## 建议操作

1. [ ] 修复项 1
2. [ ] 修复项 2
3. [ ] 验证同步
```

---

## 定期检查清单

**每日检查** (通过 heartbeat):
- [ ] Hermes MEMORY.md 更新时间 <24h
- [ ] SESSION-STATE.md 存在
- [ ] 无配置警告

**每周检查**:
- [ ] 对比双系统记录数
- [ ] 验证同步文件时间戳
- [ ] 清理废弃配置

**每月检查**:
- [ ] 完整记忆审计
- [ ] 归档旧记录
- [ ] 更新记忆系统配置

---

## 相关技能

- `memory-hygiene` - LanceDB 向量记忆清理
- `error-logger` - 错误日志记录
- `self-improvement-core` - 自我进化核心 (包含记忆规则)

---

**创建时间**: 2026-04-17  
**更新时间**: 2026-04-17 (添加修复工作流和验证清单)  
**触发事件**: 用户报告"错误太多"，发现 Hermes 记忆自 4 月 16 日后未更新  
**修复成果**: 5 项任务全部完成 (记忆更新、会话状态创建、同步 25 条记忆、清理 3 个废弃插件、验证通过)
