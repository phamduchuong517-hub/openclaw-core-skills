#!/bin/bash
# OpenClaw 告警监控 - 状态查看脚本

echo "🦞 OpenClaw 告警监控状态"
echo "================================"
echo ""

# 检查 cron 任务
echo "📅 Cron 任务:"
if crontab -l 2>/dev/null | grep -q "alert-check.sh"; then
    echo "   ✓ 已启用（每 5 分钟检查一次）"
    crontab -l 2>/dev/null | grep "alert-check.sh" | sed 's/^/   /'
else
    echo "   ✗ 未启用"
fi
echo ""

# 检查配置文件
echo "📄 配置文件:"
if [ -f ~/.openclaw/config/alerts.yaml ]; then
    echo "   ✓ 存在：~/.openclaw/config/alerts.yaml"
    echo "   启用的规则:"
    grep -A1 "enabled: true" ~/.openclaw/config/alerts.yaml | grep "name:" | sed 's/^/      /'
else
    echo "   ✗ 未找到"
fi
echo ""

# 检查日志
echo "📝 最近日志:"
LOG_FILE="$HOME/.openclaw/skills/alert-monitor/logs/alert.log"
if [ -f "$LOG_FILE" ]; then
    echo "   最后 5 条记录:"
    tail -n 5 "$LOG_FILE" | sed 's/^/   /'
else
    echo "   暂无日志"
fi
echo ""

# 检查状态文件
echo "💾 告警状态:"
STATE_FILE="$HOME/.openclaw/skills/alert-monitor/state.json"
if [ -f "$STATE_FILE" ]; then
    echo "   最后告警时间:"
    cat "$STATE_FILE" | grep -o '"lastAlerts":{[^}]*}' | sed 's/^/   /'
else
    echo "   暂无记录"
fi
echo ""

# 系统状态
echo "🖥️ 系统状态:"
echo "   磁盘使用：$(df -h / | tail -1 | awk '{print $5}') 已用"
echo "   内存使用：$(free | grep Mem | awk '{printf "%.1f%%", $3/$2 * 100}')"
echo "   网关状态：$(openclaw gateway status 2>&1 | head -1 | cut -c1-50)..."
echo ""

echo "================================"
echo "💡 提示:"
echo "   - 测试告警：node ~/.openclaw/skills/alert-monitor/scripts/alert_monitor.js --test"
echo "   - 手动检查：node ~/.openclaw/skills/alert-monitor/scripts/alert_monitor.js --check"
echo "   - 查看日志：tail -f ~/.openclaw/skills/alert-monitor/logs/alert.log"
echo "   - 编辑配置：nano ~/.openclaw/config/alerts.yaml"
