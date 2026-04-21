---
name: qqbot-communication
description: QQBOT 通信验证技能 - 配置检查、测试消息发送、双向通信确认
version: 1.0.0
source: 2026-04-16 QQBOT 验证实战
---

# 📱 QQBOT Communication - QQBOT 通信验证技能

**用途**: 当用户需要验证 QQBOT 集成、发送测试消息、或排查 QQ 通信问题时使用此技能。

---

## 🔍 触发条件

- "QQBOT 能用吗"
- "测试 QQ 消息"
- "QQ 通信验证"
- "从 QQ 给我发消息"
- "检查 QQBOT 配置"

---

## 📋 验证流程

### 阶段 1: 配置发现

**检查位置**:
1. OpenClaw QQBOT 目录：`~/.openclaw/qqbot/`
2. 已知用户文件：`~/.openclaw/qqbot/data/known-users.json`
3. 会话配置：`~/.openclaw/qqbot/sessions/*.json`
4. 告警配置：`~/.hermes/skills/openclaw-imports/alert-monitor/config/alerts.yaml`

**关键信息**:
- 用户 ID (openid): 从 known-users.json 获取
- 账号名称 (accountId): 从 sessions 目录获取
- 应用 ID (appId): 从 sessions 配置获取

---

### 阶段 2: 发送测试消息

**命令格式**:
```bash
openclaw message send \
  --channel qqbot \
  --target "<用户 ID>" \
  --message "<消息内容>" \
  --account <账号名称>
```

**测试消息示例**:
```bash
openclaw message send \
  --channel qqbot \
  --target "685F044879F8CB43AC139D11FBE79CDE" \
  --message "🧪 Hermes Agent 测试消息

这是一条 QQ 测试消息。
如果你收到，说明 QQBOT 集成正常！" \
  --account loop2
```

---

### 阶段 3: 确认通信

**确认消息**:
```bash
openclaw message send \
  --channel qqbot \
  --target "<用户 ID>" \
  --message "✅ 通信确认

Hermes Agent 已与 QQBOT 建立通信链路。

📋 配置信息：
• 渠道：QQ Bot
• 用户 ID: <用户 ID>
• 状态：已验证 ✓

现在你可以通过 QQ 与我对话了！" \
  --account <账号名称>
```

---

## 📊 配置结构

### known-users.json 示例

```json
[
  {
    "openid": "685F044879F8CB43AC139D11FBE79CDE",
    "type": "c2c",
    "accountId": "loop2",
    "firstSeenAt": 1776306704557,
    "lastSeenAt": 1776306903660,
    "interactionCount": 4
  }
]
```

**字段说明**:
- `openid`: QQ 用户唯一标识 (用作 target)
- `type`: 通信类型 (c2c=私聊，group=群聊)
- `accountId`: OpenClaw 账号名称

---

### sessions 配置示例

```json
{
  "sessionId": "f023a1c2-62c7-4131-b062-b31fe6ed29fb",
  "accountId": "loop2",
  "appId": "1903365283"
}
```

**字段说明**:
- `accountId`: 账号名称 (用作 --account 参数)
- `appId`: QQ 应用 ID

---

## ⚠️ 常见问题

### 问题 1: 找不到 QQBOT 配置

**原因**: QQBOT 配置在 OpenClaw 目录，不在 Hermes 目录

**解决**: 检查 `~/.openclaw/qqbot/` 目录

### 问题 2: OpenClaw CLI 未安装

**检查**: `which openclaw`

**说明**: 需要先安装 OpenClaw CLI 才能发送 QQ 消息

### 问题 3: 消息发送失败

**排查步骤**:
1. 检查网关状态
2. 检查 QQBOT 插件是否加载
3. 验证用户 ID 和账号是否正确
4. 查看详细错误输出

---

## 📝 记忆更新

验证完成后更新:

1. 创建每日记忆文件：`~/.hermes/memories/memory/YYYY-MM-DD-qqbot-验证.md`
2. 更新 `~/.hermes/memories/MEMORY.md` 添加 QQBOT 状态

**记录内容**:
- 验证日期
- 用户 ID
- 渠道配置
- 验证状态 (成功/失败)

---

## 🎯 成功标准

- [ ] 找到 QQBOT 配置文件
- [ ] 获取用户 ID 和账号信息
- [ ] 成功发送测试消息
- [ ] 用户确认收到消息
- [ ] 更新记忆文件

---

## 🔗 相关技能

- [[alert-monitor]] - QQBOT 告警通知
- [[self-improvement-core]] - 自我进化核心
- [[evolution-pipeline]] - 进化管线

---

**创建时间**: 2026-04-16  
**最后更新**: 2026-04-16
