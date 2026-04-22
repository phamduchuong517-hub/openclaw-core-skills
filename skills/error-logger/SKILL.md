---
name: error-logger
description: 错误日志技能 v3.0 - 记录和分析错误，避免重复错误，集成自进化反思机制
version: 3.0.0
type: 系统核心技能
source: error-logger v1.0 + error-logger-evolution-plugin v3.0
upgrade: 添加自进化反思机制 (错误捕获/原因分析/解决方案/修改执行/预防机制)
---

# 📝 Error Logger - 错误日志技能

**记录和分析错误，避免重复错误**

---

## 功能

1. **错误记录**
   - 记录错误详情
   - 记录错误上下文
   - 记录解决方案

2. **错误分析**
   - 分析错误模式
   - 识别重复错误
   - 统计错误频率

3. **错误预防**
   - 执行前检查错误日志
   - 提供避免建议
   - 推荐替代方案

---

## 错误格式

```json
{
  "timestamp": "2026-03-20 21:39:00",
  "error_type": "cookie_invalid",
  "error_message": "Cookie 缺少创作者凭证",
  "context": {
    "skill": "xiaohongshu-mcp",
    "action": "search_notes"
  },
  "solution": "使用昨天的 Cookie (/tmp/yesterday_cookie.txt)",
  "repeated": false,
  "repeat_count": 0
}
```

---

## 使用方法

```bash
# 记录错误
python3 error_logger.py log "Cookie 无效" --type cookie_invalid

# 查看错误日志
python3 error_logger.py show

# 分析错误模式
python3 error_logger.py analyze

# 检查是否重复错误
python3 error_logger.py check "Cookie 无效"
```

---

## 错误分类

| 类型 | 说明 | 解决方案 |
|------|------|----------|
| cookie_invalid | Cookie 无效 | 验证 Cookie 完整性 |
| tool_not_found | 工具不存在 | 检查可用工具列表 |
| screenshot_failed | 截图失败 | 安装截图工具 |
| search_failed | 搜索失败 | 使用备用搜索方案 |
| vnc_failed | VNC 失败 | 检查 VNC 配置 |

---

**创建时间**: 2026-03-20 21:39

