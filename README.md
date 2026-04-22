# 🦞 OpenClaw Core Skills

**AI 助手自我进化核心技能包** - 来自 OpenClaw (小龙虾) 系统的 8 个核心技能

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hermes Agent](https://img.shields.io/badge/Hermes-Agent-blue)](https://github.com/project-hermes/hermes-agent)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Core-red)](https://github.com/openclaw)

---

## 🌟 核心亮点

> **对比 everything-claude-code (162K⭐) 能力评估**:
> - ✅ self-improvement-core v4.0 **领先** (五步法 + 代谢机制)
> - ✅ task-orchestrator v3.0 **领先** (自进化反思)
> - ✅ TaskBalancer v1.0 **已包含** (多 Agent 任务分配)
> - ✅ 196 个技能 **领先** (vs 183)
> - ✅ memory 代谢机制 **领先** (30 天自动归档)

---

## 📦 技能包内容

| 技能 | 版本 | 说明 |
|------|------|------|
| **self-improvement-core** | v4.0.0 | AI 助手自我进化核心 - 五步法 + 错误日志 + 自动记忆 + 深度搜索 + 自适应推理 + 习惯形成 + 系统代谢 |
| **task-orchestrator** | v3.0.0 | 任务编排器 - 规划→执行→监控→检查→自进化反思完整工作流 |
| **skill-lifecycle-manager** | v2.0.0 | 技能生命周期管理 - 创建 + 评估 + 审核 + 发现 + 进化 |
| **TaskBalancer** | v1.0.0 | 智能任务分配器 - 多 Agent 工作流的任务分配和负载均衡 ⭐ 新增 |
| **memory-audit** | v1.0.0 | 跨系统记忆审计 - OpenClaw ↔ Hermes 双系统同步状态检查 |
| **token-optimization** | v1.0.0 | Token 优化 - 上下文压缩 + 智能缓存 + 流式输出 (减少 50% Token) |
| **alert-monitor** | v1.1.0 | 告警监控 - API 配额、网关健康、QQBot 多渠道通知 |
| **qqbot-communication** | v1.0.0 | QQBot 通信验证 - 配置检查、测试消息、双向通信 |

---

## 🚀 快速开始

### 前置要求

- Hermes Agent (推荐最新版本)
- OpenClaw 系统 (可选，用于完整功能)

### 安装方式

#### 方法 1: 克隆仓库

```bash
git clone https://github.com/YOUR_USERNAME/openclaw-core-skills.git
cd openclaw-core-skills

# 复制技能到 Hermes 技能目录
cp -r skills/* ~/.hermes/skills/
```

#### 方法 2: Hermes CLI 安装

```bash
# 安装单个技能
hermes skill install ./skills/self-improvement-core
hermes skill install ./skills/task-orchestrator
```

---

## 📚 技能详解

### 1. self-improvement-core v4.0.0

**AI 助手自我进化核心** - 最完整的 AI 自进化系统

#### 核心能力

```
✅ 自我进化五步法
   问题发现 → 第一性原理分析 → 方案设计 → 实验验证 → 经验固化

✅ 错误日志系统
   错误记录 → 根本原因分析 → 预防措施 → 重复检测

✅ 自动记忆记录
   对话前回顾 → 对话中记录 → 对话后保存

✅ 深度搜索四层策略
   L1: memory_search (30%) → L2: grep workspace (60%) → 
   L3: grep logs (90%) → L4: sessions_history (100%)

✅ 自适应推理
   L1 简单查询 → L2 常规任务 → L3 复杂问题 → L4 开放研究

✅ 习惯形成机制
   识别重复任务 → 记录执行模式 → 形成程序性记忆 → 自动化触发

✅ 系统代谢
   <7 天保留 → 7-30 天压缩 → >30 天归档
```

#### 使用示例

```bash
# 对话前自动回顾
auto-memory-recorder before_conversation

# 记录错误
error-logger log "搜索失败" --type search_failed --context "memory_search 找不到"

# 问题发现与进化
self-evolution detect_problem "搜索成功率低（30%）"
self-evolution analyze "为什么搜索失败？→ memory_search 只覆盖 30%"
self-evolution design_solution "4 层搜索策略：L1→L2→L3→L4"
```

---

### 2. task-orchestrator v3.0.0

**任务编排器** - 完整的任务分解、调度、执行、监控、验收、反思进化系统

#### 核心能力

```
✅ 任务规划
   目标理解 → 任务分解 → 依赖分析 → 资源评估 → 时间估算 → 风险识别

✅ 任务执行
   任务调度 → 技能调用 → 进度跟踪 → 错误处理 → 结果整合

✅ 任务监控
   进度百分比 → 已用时间 → 剩余时间 → 成功/失败计数 → 资源使用

✅ 任务完成检查 (v3.0 新增)
   定义通过/失败标准 → 自动验证输出质量 → 失败时自动重试或反馈

✅ 会话收尾工作流 (v3.0 新增)
   汇总完成任务 → 提取关键决策 → 更新记忆系统 → 生成会话总结

✅ 自进化反思机制 (v3.0 新增)
   任务分解反思 → 资源分配反思 → 执行过程反思 → 结果追踪反思
```

#### 工作流程

```
┌─────────────────┐
│  1. 接收任务    │
│  理解用户目标   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  2. 任务分解    │
│  拆解为子任务   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  3. 任务规划    │
│  确定执行顺序   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  4. 任务执行    │
│  按顺序调用技能 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  5. 任务检查    │
│  验证通过标准   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  6. 自进化反思  │
│  记录经验教训   │
└─────────────────┘
```

---

### 3. skill-lifecycle-manager v2.0.0

**技能生命周期管理器** - 从创建到进化的完整管理

#### 核心能力

```
✅ 技能创建 - 从 0 到 1 生成技能模板
✅ 技能评估 - 0-10 分质量评分 + 改进建议
✅ 技能审核 - 通过/不通过验证
✅ 技能发现 - 搜索 ClawHub、GitHub、本地技能库
✅ 技能进化 - 基于使用反馈自动优化
```

---

### 4. memory-audit v1.0.0

**跨系统记忆审计** - OpenClaw ↔ Hermes 双系统记忆同步检查

#### 核心能力

```
✅ 数据不一致检测
✅ 时间戳断层识别
✅ 同步中断问题定位
✅ 自动修复建议
```

---

### 5. token-optimization v1.0.0

**Token 优化** - 减少 50% Token 使用，响应时间 10 秒→5 秒

#### 核心能力

```
✅ 上下文压缩
✅ 智能缓存
✅ 流式输出
✅ 响应时间优化
```

---

### 6. alert-monitor v1.1.0

**告警监控** - 实时监控系统状态

#### 核心能力

```
✅ API 配额监控
✅ 网关健康检查
✅ QQBot 多渠道通知
✅ 实时告警
```

---

### 7. qqbot-communication v1.0.0

**QQBot 通信验证** - 配置检查和双向通信确认

#### 核心能力

```
✅ 配置检查
✅ 测试消息发送
✅ 双向通信确认
```

---

### 8. TaskBalancer v1.0.0 ⭐ 新增

**智能任务分配器** - 多 Agent 工作流的任务分配和负载均衡

#### 核心能力

```
✅ 智能任务分配
   根据任务类型自动匹配最适合的 Agent

✅ 负载均衡
   监控每个 Agent 的当前负载 → 避免单个 Agent 过载
   → 自动分配到最空闲的 Agent

✅ 任务优先级管理
   🔴 高优先级：紧急任务 → 立即分配给空闲 Agent
   🟡 中优先级：常规任务 → 按能力匹配分配
   🟢 低优先级：后台任务 → 空闲时处理

✅ Agent 能力匹配
   写作类 → V6 写作工厂
   搜索类 → UltimateSearch
   爬虫类 → Scrapling
   归档类 → Archive

✅ 性能监控
   任务完成率 → 平均响应时间 → Agent 利用率 → 队列长度
```

#### 使用示例

```bash
# 分配高优先级任务
/balance assign "写小说第三章" --priority high

# 查看 Agent 状态
/balance status

# 查看队列
/balance queue
```

#### 架构组件

```
TaskBalancer/
├── memory.md          # 任务历史统计
├── agents.md          # Agent 能力配置
├── queues/            # 任务队列
└── metrics.md         # 性能指标
```

**对比外部**: everything-claude-code 的 `48 SubAgents` 系统

---

## 🏗️ 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenClaw Core Skills                     │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ 自我进化系统  │    │ 任务编排系统  │    │ 技能管理系统  │
│ v4.0.0       │    │ v3.0.0       │    │ v2.0.0       │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  任务分配系统 ⭐  │
                    │  TaskBalancer   │
                    └─────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ 记忆/通信系统 │    │  性能优化    │    │  监控系统    │
│ memory-audit │    │token-optim.  │    │alert-monitor │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## 📊 性能对比

| 能力模块 | OpenClaw | everything-claude-code | 状态 |
|----------|----------|----------------------|------|
| 自我进化系统 | v4.0 完整版 | agent-introspection | ✅ **领先** |
| 任务编排 | v3.0 完整版 | planner + loop | ✅ **领先** |
| 技能系统 | 196 个技能 | 183 个技能 | ✅ **领先** |
| 子代理系统 | ✅ TaskBalancer v1.0 | 48 SubAgents | ✅ **已包含** |
| Hooks 自动化 | auto-memory-recorder | hooks/ | ✅ 相当 |
| 记忆系统 | memory-audit + 代谢 | pro-workflow | ✅ **领先** |
| Token 优化 | 50% 压缩 | code-simplifier | ✅ **领先** |

---

## 🔧 开发指南

### 技能格式

所有技能遵循标准 SKILL.md 格式：

```markdown
---
name: skill-name
description: 技能描述
version: 1.0.0
source: 来源
upgrade: 升级说明
---

# 技能名称

## 核心能力

## 工作流程

## 使用示例
```

### 添加新技能

1. 在 `skills/` 目录创建新文件夹
2. 添加 `SKILL.md` 文件
3. 遵循命名规范 (小写，连字符分隔)

---

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🙏 致谢

- [Hermes Agent](https://github.com/project-hermes/hermes-agent) - AI 助手框架
- [OpenClaw](https://github.com/openclaw) - 小龙虾系统
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - 能力对比参考

---

## 📬 联系方式

- 作者：小龙虾 (OpenClaw 团队)
- 项目地址：https://github.com/YOUR_USERNAME/openclaw-core-skills
- 问题反馈：https://github.com/YOUR_USERNAME/openclaw-core-skills/issues

---

<div align="center">

**🦞 Made with ❤️ by OpenClaw Team**

如果这个项目对你有帮助，请给一个 ⭐️ Star！

</div>
