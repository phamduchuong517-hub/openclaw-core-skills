#!/bin/bash
# OpenClaw 告警监控 - Cron 包装脚本
# 添加到 crontab: */5 * * * * ~/.openclaw/skills/alert-monitor/scripts/alert-check.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NODE_SCRIPT="$SCRIPT_DIR/alert_monitor.js"
LOG_FILE="$HOME/.openclaw/skills/alert-monitor/logs/alert.log"

# 确保日志目录存在
mkdir -p "$(dirname "$LOG_FILE")"

# 记录开始时间
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始告警检查" >> "$LOG_FILE"

# 执行 Node.js 脚本
cd "$SCRIPT_DIR"
node "$NODE_SCRIPT" --check >> "$LOG_FILE" 2>&1

# 记录结束时间
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 告警检查完成" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
