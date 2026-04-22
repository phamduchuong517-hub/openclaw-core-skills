---
name: TaskBalancer
description: Intelligent task distribution and load balancing for multi-agent workflows
version: 1.0.0
author: OpenClaw Community
metadata: {"clawdbot":{"emoji":"⚖️","requires":{"bins":[]},"os":["linux","darwin","win32"]}}
---

# ⚖️ TaskBalancer - 智能任务分配器

**多 Agent 工作流的任务分配和负载均衡**

---

## 功能

- ⚖️ 智能任务分配
- 🔄 负载均衡
- 📊 任务优先级管理
- 🎯 Agent 能力匹配
- 📈 性能监控

---

## 架构

```
TaskBalancer/
├── memory.md          # 任务历史统计
├── agents.md          # Agent 能力配置
├── queues/            # 任务队列
└── metrics.md         # 性能指标
```

---

## 核心规则

### 1. 任务分类

| 类型 | 说明 | 分配策略 |
|------|------|----------|
| 🔴 高优先级 | 紧急任务 | 立即分配给空闲 Agent |
| 🟡 中优先级 | 常规任务 | 按能力匹配分配 |
| 🟢 低优先级 | 后台任务 | 空闲时处理 |

### 2. Agent 能力匹配

根据 Agent 的特长分配任务：
- 写作类 → V6 写作工厂
- 搜索类 → UltimateSearch
- 爬虫类 → Scrapling
- 归档类 → Archive

### 3. 负载均衡

- 监控每个 Agent 的当前负载
- 避免单个 Agent 过载
- 自动分配到最空闲的 Agent

---

## 使用方法

```bash
# 分配任务
/balance assign <task> --priority <high|medium|low>

# 查看负载
/balance status

# 查看队列
/balance queue
```

---

## 示例

### 分配高优先级任务
```
/balance assign "写小说第三章" --priority high
```

### 查看 Agent 状态
```
/balance status
```

---

## 配置

在 `agents.md` 中配置 Agent 能力：

```markdown
# Agent 能力配置

## V6 写作工厂
- 能力：小说创作、文章写作
- 最大并发：3
- 当前负载：0

## UltimateSearch
- 能力：网络搜索、信息收集
- 最大并发：5
- 当前负载：0

## Scrapling
- 能力：网页爬虫、数据提取
- 最大并发：3
- 当前负载：0
```

---

## 性能指标

记录在 `metrics.md`：

- 任务完成率
- 平均响应时间
- Agent 利用率
- 队列长度

---

*TaskBalancer v1.0 - 智能任务分配*
