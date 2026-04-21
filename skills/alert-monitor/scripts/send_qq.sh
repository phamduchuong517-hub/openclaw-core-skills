#!/bin/bash
# OpenClaw QQ 告警发送脚本
# 使用 OpenClaw message tool 发送告警到 QQ

MESSAGE="$1"
LEVEL="${2:-info}"

if [ -z "$MESSAGE" ]; then
    echo "用法：$0 <消息内容> [级别]"
    echo "级别：info, warning, critical"
    exit 1
fi

# 设置表情符号
case "$LEVEL" in
    critical) EMOJI="🔴" ;;
    warning)  EMOJI="⚠️" ;;
    info)     EMOJI="ℹ️" ;;
    *)        EMOJI="🔔" ;;
esac

# 添加时间戳
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
FULL_MESSAGE="${EMOJI} ${MESSAGE}

⏰ ${TIMESTAMP}"

# 使用 OpenClaw message tool 发送
# 注意：这需要在 OpenClaw 环境中运行
echo "发送 QQ 消息..."
echo "目标：qqbot:c2c:685F044879F8CB43AC139D11FBE79CDE"
echo "内容：${FULL_MESSAGE}"

# 实际发送（使用 OpenClaw message tool）
openclaw message send --channel qqbot --target "685F044879F8CB43AC139D11FBE79CDE" --message "${FULL_MESSAGE}" --account loop2

echo "✓ 消息已发送"
