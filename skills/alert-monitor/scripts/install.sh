#!/bin/bash
# OpenClaw 告警监控 - 安装脚本

echo "🦞 OpenClaw 告警监控系统安装"
echo "================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误：未找到 Node.js，请先安装 Node.js${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js 已安装：$(node -v)${NC}"

# 创建配置目录
mkdir -p ~/.openclaw/config
mkdir -p ~/.openclaw/skills/alert-monitor/logs

# 复制配置文件
if [ ! -f ~/.openclaw/config/alerts.yaml ]; then
    cp ~/.openclaw/skills/alert-monitor/config/alerts.yaml ~/.openclaw/config/alerts.yaml
    echo -e "${GREEN}✓ 配置文件已创建：~/.openclaw/config/alerts.yaml${NC}"
else
    echo -e "${YELLOW}⚠ 配置文件已存在，跳过${NC}"
fi

# 设置脚本权限
chmod +x ~/.openclaw/skills/alert-monitor/scripts/*.sh
chmod +x ~/.openclaw/skills/alert-monitor/scripts/*.js
echo -e "${GREEN}✓ 脚本权限已设置${NC}"

# 添加 cron 任务
CRON_ENTRY="*/5 * * * * $HOME/.openclaw/skills/alert-monitor/scripts/alert-check.sh"
if ! crontab -l 2>/dev/null | grep -q "alert-check.sh"; then
    (crontab -l 2>/dev/null | grep -v "alert-check.sh"; echo "$CRON_ENTRY") | crontab -
    echo -e "${GREEN}✓ Cron 任务已添加（每 5 分钟检查一次）${NC}"
else
    echo -e "${YELLOW}⚠ Cron 任务已存在，跳过${NC}"
fi

# 测试运行
echo ""
echo "正在运行测试..."
node ~/.openclaw/skills/alert-monitor/scripts/alert_monitor.js --test

echo ""
echo "================================"
echo -e "${GREEN}✓ 安装完成！${NC}"
echo ""
echo "下一步："
echo "1. 编辑配置文件：~/.openclaw/config/alerts.yaml"
echo "2. 查看日志：tail -f ~/.openclaw/skills/alert-monitor/logs/alert.log"
echo "3. 手动测试：node ~/.openclaw/skills/alert-monitor/scripts/alert_monitor.js --test"
echo "4. 查看 cron 任务：crontab -l"
echo ""
