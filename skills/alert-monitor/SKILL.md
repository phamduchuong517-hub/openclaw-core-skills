---
name: alert-monitor
version: 1.1.0
updated: 2026-04-16
description: OpenClaw 告警监控技能 - 实时监控系统状态、API 配额、网关健康，通过 QQBot 等多渠道发送告警通知
tags: [monitoring, alerts, qqbot, notification]
---

# alert-monitor - OpenClaw 告警监控技能

## 功能说明

实时监控系统状态、API 配额、网关健康等关键指标，通过多渠道发送告警通知。

## 触发条件

当用户提到以下内容时自动触发：
- "告警"、"监控"、"预警"、"通知"
- "API 配额"、"用量"、"剩余"
- "网关状态"、"健康检查"
- "系统状态"、"异常"

## 使用方法

### 1. 启用监控
```
启用告警监控
开启 API 配额告警
```

### 2. 查看状态
```
查看告警状态
监控配置
```

### 3. 配置告警
```
设置 API 告警阈值为 80%
添加钉钉告警通知
```

### 4. 测试告警
```
发送测试告警
测试通知渠道
```

## 告警类型

| 类型 | 说明 | 默认阈值 |
|------|------|---------|
| API 配额预警 | DashScope API 用量告警 | 80% |
| API 配额紧急 | 配额即将耗尽 | 95% |
| 网关离线 | Gateway 心跳检测失败 | 3 次重试 |
| 响应超时 | 平均响应时间过长 | >30 秒 |
| 磁盘空间 | 磁盘剩余空间不足 | <10% |
| 内存占用 | 内存使用率过高 | >90% |
| 连续错误 | 任务连续失败 | 3 次 |

## 通知渠道

### QQBot（已配置）✅

**发送 QQ 消息命令**:
```bash
openclaw message send --channel qqbot --target "<openid>" --message "<消息内容>" --account <账号 ID>
```

**参数说明**:
- `--channel qqbot` - 固定值
- `--target <openid>` - 用户 QQ 开放 ID（从 `~/.openclaw/qqbot/data/known-users.json` 获取）
- `--message "<文本>"` - 消息内容
- `--account <ID>` - 账号 ID（如 `default`, `loop1`, `loop2`）

**示例**:
```bash
# 发送测试消息
openclaw message send --channel qqbot --target "685F044879F8CB43AC139D11FBE79CDE" --message "测试消息" --account loop2

# 查看已知用户列表
cat ~/.openclaw/qqbot/data/known-users.json

# 查看会话配置
cat ~/.openclaw/qqbot/sessions/*.json
```

**验证 QQBOT 状态**:
```bash
# 检查 QQBOT 目录
ls -la ~/.openclaw/qqbot/

# 检查 OpenClaw 版本
openclaw --version
```

**配置文件位置**:
- QQBOT 数据：`~/.openclaw/qqbot/data/known-users.json`
- QQBOT 会话：`~/.openclaw/qqbot/sessions/`
- 告警配置：`~/.openclaw/skills/alert-monitor/config/alerts.yaml`

---

### 其他渠道

- ⏳ 邮件（需配置 SMTP）
- ⏳ 钉钉（需配置 Webhook）
- ⏳ 企业微信（需配置 Webhook）

## 配置文件

`~/.openclaw/skills/alert-monitor/config/alerts.yaml`

## 集成 Heartbeat

自动集成到 HEARTBEAT.md，每 5 分钟检查一次关键指标。

## 作者

OpenClaw Team
## 版本

v1.0.0
