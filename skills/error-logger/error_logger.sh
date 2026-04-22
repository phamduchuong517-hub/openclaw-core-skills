#!/bin/bash
# ~/.openclaw/skills/system/error-logger/error_logger.sh

# 错误日志记录脚本

ERROR_TYPE=$1
ERROR_MSG=$2
CONTEXT=${3:-"无"}
SOLUTION=${4:-"待解决"}
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M)
FILE="$HOME/.openclaw/workspace/memory/errors/$DATE-错误日志.md"

# 确保目录存在
mkdir -p "$HOME/.openclaw/workspace/memory/errors"

# 检查是否重复错误
if grep -q "$ERROR_MSG" $FILE 2>/dev/null; then
  echo "⚠️  重复错误：$ERROR_MSG"
  # 更新重复计数
  sed -i "s/\*\*重复次数\*\*: \([0-9]*\)/\*\*重复次数\*\*: $(( $(grep "\*\*重复次数\*\*" $FILE | grep -o "[0-9]*") + 1 ))/" $FILE 2>/dev/null
else
  # 创建或追加错误记录
  if [ ! -f $FILE ]; then
    cat > $FILE << EOF
# $DATE 错误日志

EOF
  fi
  
  cat >> $FILE << EOF

## $TIME - $ERROR_TYPE
- **错误**: $ERROR_MSG
- **上下文**: $CONTEXT
- **解决方案**: $SOLUTION
- **是否重复**: 否
- **重复次数**: 0

EOF
  echo "✅ 错误已记录：$FILE"
fi

# 显示今日错误统计
echo ""
echo "📊 今日错误统计："
grep -c "## " $FILE 2>/dev/null || echo "0"
