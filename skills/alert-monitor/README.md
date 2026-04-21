# OpenClaw 告警监控系统

🦞 实时监控系统状态，多渠道发送告警通知

## 快速开始

### 1. 安装

```bash
# 运行安装脚本
bash ~/.openclaw/skills/alert-monitor/scripts/install.sh
```

### 2. 配置

编辑配置文件 `~/.openclaw/config/alerts.yaml`：

```yaml
rules:
  - name: api_quota_warning
    threshold: 80  # 80% 时告警
    enabled: true
    
  - name: disk_space
    threshold_percent: 10  # 剩余 10% 时告警
    enabled: true
```

### 3. 启用定时检查

安装脚本已自动添加 cron 任务，每 5 分钟检查一次。

查看 cron 任务：
```bash
crontab -l
```

### 4. 测试

```bash
# 发送测试告警
node ~/.openclaw/skills/alert-monitor/scripts/alert_monitor.js --test

# 手动执行检查
node ~/.openclaw/skills/alert-monitor/scripts/alert_monitor.js --check
```

## 功能特性

### 监控项目

| 项目 | 说明 | 默认阈值 |
|------|------|---------|
| API 配额 | DashScope API 用量 | 80% 警告，95% 紧急 |
| 网关健康 | OpenClaw Gateway 状态 | 离线即告警 |
| 磁盘空间 | 根分区剩余空间 | <10% 紧急 |
| 内存使用 | 系统内存使用率 | >90% 警告 |
| 响应时间 | API 平均响应时间 | >30 秒警告 |
| 连续错误 | 任务失败次数 | 3 次/10 分钟 |

### 通知渠道

- ✅ **QQBot** - 已集成，通过 message tool 发送
- ⏳ **邮件** - 需配置 SMTP
- ⏳ **钉钉** - 需配置 Webhook
- ⏳ **企业微信** - 需配置 Webhook

### QQ 集成

告警系统已集成到 QQ 机器人，支持：

1. **自动告警** - 异常时自动发送 QQ 消息
2. **状态查询** - 发送"告警状态"查看监控状态
3. **测试告警** - 发送"测试告警"验证通知渠道
4. **日志查询** - 发送"告警日志"查看最近记录

QQ 命令：
- `/alert status` - 查看监控状态
- `/alert test` - 发送测试告警
- `/alert log` - 查看告警日志
- `/alert help` - 显示帮助信息

### 智能特性

- **告警去重** - 10 分钟内相同告警只发送一次
- **频率限制** - 每小时最多 10 条告警，防止轰炸
- **免打扰时段** - 可配置夜间静默（可选）
- **状态持久化** - 告警历史自动保存

## 文件结构

```
~/.openclaw/skills/alert-monitor/
├── SKILL.md              # 技能说明
├── config/
│   └── alerts.yaml       # 配置模板
├── scripts/
│   ├── alert_monitor.js  # 主监控脚本
│   ├── alert-check.sh    # Cron 包装脚本
│   ├── install.sh        # 安装脚本
│   └── heartbeat-example.md  # Heartbeat 集成示例
├── logs/                 # 日志目录（自动创建）
└── README.md             # 本文件
```

## 日志查看

```bash
# 实时查看日志
tail -f ~/.openclaw/skills/alert-monitor/logs/alert.log

# 查看最近 100 行
tail -n 100 ~/.openclaw/skills/alert-monitor/logs/alert.log
```

## 配置示例

### 添加钉钉通知

```yaml
channels:
  dingtalk:
    enabled: true
    webhook: "https://oapi.dingtalk.com/robot/send?access_token=YOUR_TOKEN"
    secret: "SECxxx"  # 可选，加签密钥

rules:
  - name: api_quota_critical
    channels: [qqbot, dingtalk]  # 同时发送到 QQ 和钉钉
```

### 添加邮件通知

```yaml
channels:
  email:
    enabled: true
    smtp_host: "smtp.qq.com"
    smtp_port: 587
    username: "your-qq@qq.com"
    password: "your-auth-code"
    from: "OpenClaw <your-qq@qq.com>"
    to: ["admin@example.com"]
```

### 配置免打扰时段

```yaml
settings:
  quiet_hours:
    enabled: true
    start: "23:00"
    end: "08:00"
  max_alerts_per_hour: 5
  dedup_window: 300  # 5 分钟去重
```

## 故障排查

### 告警不发送

1. 检查配置是否启用：`grep "enabled: true" ~/.openclaw/config/alerts.yaml`
2. 查看日志：`tail -f ~/.openclaw/skills/alert-monitor/logs/alert.log`
3. 手动测试：`node ~/.openclaw/skills/alert-monitor/scripts/alert_monitor.js --test`

### Cron 不执行

1. 检查 cron 服务：`systemctl status cron`
2. 查看 cron 日志：`grep CRON /var/log/syslog | tail -20`
3. 重新添加 cron：`bash ~/.openclaw/skills/alert-monitor/scripts/install.sh`

### 配置不生效

1. 检查 YAML 格式：`cat ~/.openclaw/config/alerts.yaml`
2. 确保缩进正确（2 空格）
3. 重启 cron 服务：`systemctl restart cron`

## 卸载

```bash
# 移除 cron 任务
crontab -l | grep -v "alert-check.sh" | crontab -

# 删除文件
rm -rf ~/.openclaw/skills/alert-monitor
rm ~/.openclaw/config/alerts.yaml
```

## 开发

### 添加新的告警规则

1. 在 `config/alerts.yaml` 中添加规则
2. 在 `alert_monitor.js` 中实现检查逻辑
3. 测试：`node alert_monitor.js --test`

### 添加新的通知渠道

1. 在 `config/alerts.yaml` 中配置渠道
2. 在 `alert_monitor.js` 中实现发送函数
3. 在规则中引用新渠道

## 版本

v1.0.0

## 许可证

MIT
