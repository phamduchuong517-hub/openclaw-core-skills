---
name: skill-lifecycle-manager
description: 技能生命周期管理器 (v2.0 专家版) - 整合技能创建 + 自主选择 + 自主生成 + 技能补全 + 技能工厂 + 测试打包，提供完整的技能生命周期管理能力
version: 2.0.0
source: selector-agent + skill-completer + skill-generator-pro + skill-factory-master + autonomous-skill-generation 合并增强
---

# 🛠️ Skill Lifecycle Manager v2.0 - 技能生命周期管理器 (专家版)

**整合自 5 个 Agent 技能**:
- selector-agent (技能选择专家)
- skill-completer (技能补全 Agent)
- skill-generator-pro (技能生成器)
- skill-factory-master (技能工厂主控)
- autonomous-skill-generation (自主技能生成) ⭐ 新增

**依赖技能**:
- skill-creator (测试框架 + 打包发布)

---

## 核心能力

### 1. 技能发现与选择 (独有)
### 2. 技能创建与生成 (增强)
### 3. 自主技能生成 (新增 ⭐)
### 4. 技能补全 (独有)
### 5. 技能评估 (增强)
### 6. 技能工厂 - GitHub 学习 (独有)
### 7. 测试与打包 (依赖 skill-creator)

---

## 工作流程

### 模式 A: 标准创建流程
```
1. 需求分析 → 2. 技能设计 → 3. 代码生成 → 4. 文档编写 → 5. 测试验证 → 6. 技能评估 → 7. 入库
```

### 模式 B: 自主生成流程 (新增 ⭐)
```
1. 接收需求 → 2. 需求分析 → 3. 检查是否已有 → 4. 生成技能代码 → 5. 质量检查 → 6. 用户确认 → 7. 技能注入
```

### 模式 C: 技能选择流程
```
1. 理解任务 → 2. 扫描技能库 → 3. 匹配技能 → 4. 选择最佳 → 5. 准备备选
```

### 模式 D: GitHub 学习流程
```
1. 获取项目 → 2. 分析功能 → 3. 提取模块 → 4. 抽象能力 → 5. 生成技能 → 6. 评分入库
```

---

## 输入 Schema

```json
{
  "type": "object",
  "required": ["action"],
  "properties": {
    "action": {
      "type": "string",
      "enum": [
        "select", "create", "autonomous_create", "complete", 
        "evaluate", "analyze_github", "batch_generate"
      ],
      "description": "操作类型"
    },
    "task": { "type": "string", "description": "任务描述" },
    "skill_requirement": { "type": "string", "description": "技能需求" },
    "github_url": { "type": "string", "description": "GitHub 项目链接" },
    "auto_mode": { "type": "boolean", "default": false, "description": "自主模式 (跳过确认)" },
    "options": { "type": "object" }
  }
}
```

---

## 自主生成模式 (新增 ⭐)

### 配置选项
```yaml
autonomous_mode:
  enabled: true
  auto_generate_code: true
  auto_generate_docs: true
  auto_generate_tests: false
  quality_check:
    enabled: true
    min_score: 0.7
  confirmation:
    required: true
    show_preview: true
  injection:
    auto_inject: false
    update_index: true
    save_to_memory: true
```

### 生成模板
- SKILL.md 模板
- schema.json 模板
- examples.json 模板
- Python/JS 代码模板

### 效率提升
- 传统方式：8 小时
- 自主生成：30 分钟
- 提升：**16 倍**

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 2.0.0 | 2026-03-25 | 专家版融合 (合并 autonomous-skill-generation) |
| 1.0.0 | 2026-03-24 | 初始版本 (合并 4 个 Agent) |

---

*Skill Lifecycle Manager v2.0 - 专家版完整技能生命周期管理*
*Last updated: 2026-03-25*
