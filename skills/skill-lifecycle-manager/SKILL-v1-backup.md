---
name: skill-lifecycle-manager
description: 技能生命周期管理器 - 整合技能创建 + 技能选择 + 技能补全 + 技能工厂，提供完整的技能创建、选择、评估、优化能力
version: 1.0.0
source: selector-agent + skill-completer + skill-generator-pro + skill-factory-master 合并
---

# 🛠️ Skill Lifecycle Manager - 技能生命周期管理器

**整合自 4 个 Agent 技能**:
- selector-agent (技能选择专家)
- skill-completer (技能补全 Agent)
- skill-generator-pro (技能生成器)
- skill-factory-master (技能工厂主控)

---

## 核心能力

### 1. 技能发现与选择
```
核心能力:
- 理解任务需求
- 扫描技能库
- 匹配技能能力
- 选择最佳技能
- 多技能排序

选择策略:
- 精确匹配优先
- 能力覆盖度
- 历史成功率
- 执行效率
```

### 2. 技能创建与生成
```
核心能力:
- 需求分析
- 技能设计
- 代码生成
- 文档编写
- 测试用例

生成流程:
1. 分析需求 → 提取功能点
2. 设计架构 → 确定输入输出
3. 生成代码 → 实现核心逻辑
4. 编写文档 → SKILL.md
5. 生成测试 → 测试用例
```

### 3. 技能补全
```
触发条件:
- 任务无匹配技能
- 技能能力不足
- 需要新功能

补全策略:
- 扩展现有技能
- 创建新技能
- 组合多技能
```

### 4. 技能评估
```
评估维度:
- 功能完整性 (30%)
- 代码质量 (25%)
- 测试覆盖 (20%)
- 文档完整 (15%)
- 用户体验 (10%)

评分等级:
- S 级：90-100 分 (优秀)
- A 级：80-89 分 (良好)
- B 级：70-79 分 (合格)
- C 级：60-69 分 (需改进)
- D 级：<60 分 (不合格)
```

### 5. 技能工厂
```
从 GitHub 学习:
1. 获取目标项目
2. 分析项目功能
3. 提取可复用模块
4. 抽象为通用能力
5. 生成 OpenClaw 技能
6. 评分入库
```

---

## 工作流程

### 技能选择流程
```
┌─────────────────────────────────────────────────────────┐
│  1. 理解任务需求                                        │
│     - 分析任务类型                                      │
│     - 识别所需能力                                      │
│     - 确定约束条件                                      │
└─────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│  2. 扫描技能库                                          │
│     - 读取技能索引                                      │
│     - 获取技能描述                                      │
│     - 加载技能元数据                                    │
└─────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│  3. 匹配技能                                            │
│     - 关键词匹配                                        │
│     - 语义匹配                                          │
│     - 能力匹配                                          │
└─────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│  4. 选择最佳技能                                        │
│     - 排序候选技能                                      │
│     - 选择最佳匹配                                      │
│     - 准备备选方案                                      │
└─────────────────────────────────────────────────────────┘
```

### 技能创建流程
```
┌─────────────────────────────────────────────────────────┐
│  1. 需求分析                                            │
│     - 理解用户需求                                      │
│     - 提取功能点                                        │
│     - 确定输入输出                                      │
└─────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│  2. 技能设计                                            │
│     - 设计技能架构                                      │
│     - 定义输入输出 schema                               │
│     - 设计工作流程                                      │
└─────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│  3. 代码生成                                            │
│     - 生成核心逻辑                                      │
│     - 添加错误处理                                      │
│     - 编写工具函数                                      │
└─────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│  4. 文档编写                                            │
│     - 编写 SKILL.md                                     │
│     - 生成使用示例                                      │
│     - 编写 API 文档                                       │
└─────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│  5. 测试验证                                            │
│     - 生成测试用例                                      │
│     - 执行测试                                          │
│     - 修复问题                                          │
└─────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│  6. 技能评估                                            │
│     - 调用 skill-vetter 评分                             │
│     - 决定是否入库                                      │
│     - 选择分类                                          │
└─────────────────────────────────────────────────────────┘
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
        "select", "create", "complete", "evaluate",
        "generate", "analyze_github"
      ],
      "description": "操作类型"
    },
    "task": {
      "type": "string",
      "description": "任务描述 (select/complete)"
    },
    "skill_requirement": {
      "type": "string",
      "description": "技能需求 (create/generate)"
    },
    "github_url": {
      "type": "string",
      "description": "GitHub 项目链接 (analyze_github)"
    },
    "options": {
      "type": "object",
      "properties": {
        "min_score": { "type": "number", "default": 6 },
        "max_results": { "type": "number", "default": 5 },
        "category": { "type": "string" },
        "target_category": { "type": "string" }
      }
    }
  }
}
```

---

## 输出 Schema

```json
{
  "type": "object",
  "properties": {
    "success": { "type": "boolean" },
    "action": { "type": "string" },
    "data": {
      "type": "object",
      "properties": {
        "selected_skill": { "type": "object" },
        "created_skill": { "type": "object" },
        "evaluation": { "type": "object" },
        "skills": { "type": "array" }
      }
    },
    "error": { "type": "string" },
    "execution_time": { "type": "number" }
  }
}
```

---

## 使用示例

### 示例 1: 技能选择
```python
manager = SkillLifecycleManager()

result = manager.select_skill(
    task="分析这个 Excel 文件并生成图表",
    options={
        'max_results': 3
    }
)

# 返回:
# {
#   "best_match": "data-processing-core",
#   "confidence": 0.95,
#   "alternatives": ["visual-core", "research-core"]
# }
```

### 示例 2: 技能创建
```python
manager = SkillLifecycleManager()

result = manager.create_skill(
    skill_requirement="""
    创建一个技能，能够:
    1. 读取天气 API 数据
    2. 生成天气预报
    3. 发送提醒
    """,
    options={
        'category': 'automation',
        'min_score': 7
    }
)

# 生成技能包
# - SKILL.md
# - schema.json
# - examples.json
# - weather_skill.py
```

### 示例 3: GitHub 项目分析
```python
manager = SkillLifecycleManager()

result = manager.analyze_github(
    github_url="https://github.com/axios/axios",
    options={
        'analysis_depth': 'standard',
        'target_category': 'auto'
    }
)

# 分析结果:
# - 项目名称：axios
# - 核心功能：HTTP 请求库
# - 可提取能力：网络请求
# - 建议技能：http-request-client
# - 评分：8.8/10 → 核心技能
```

### 示例 4: 技能补全
```python
manager = SkillLifecycleManager()

result = manager.complete_skill(
    task="需要一个技能来批量处理图片",
    existing_skills=["creative-core"],
    options={
        'prefer_extend': True  # 优先扩展现有技能
    }
)

# 决策:
# - 扩展 creative-core，添加 batch_process 功能
# - 或创建新技能 image-batch-processor
```

### 示例 5: 技能评估
```python
manager = SkillLifecycleManager()

result = manager.evaluate_skill(
    skill_name="my-new-skill",
    skill_path="~/.openclaw/skills/automation/my-new-skill/"
)

# 评估结果:
# {
#   "overall_score": 8.5,
#   "breakdown": {
#     "functionality": 9.0,
#     "code_quality": 8.5,
#     "test_coverage": 8.0,
#     "documentation": 8.5,
#     "user_experience": 8.5
#   },
#   "level": "CORE",
#   "suggestion": "建议加入核心技能库"
# }
```

### 示例 6: 技能工厂 - 从 GitHub 学习
```python
manager = SkillLifecycleManager()

result = manager.run_factory(
    github_url="https://github.com/example/web-scraper",
    options={
        'analysis_depth': 'deep',
        'min_reusability': 5
    }
)

# 生产结果:
# - 分析项目：web-scraper
# - 生成技能：smart-web-scraper
# - 评分：8.5/10
# - 分类：browser
# - 状态：已保存到核心技能库
```

---

## 技能选择策略

### 1. 关键词匹配
```python
def keyword_match(task, skill):
    task_keywords = extract_keywords(task)
    skill_keywords = extract_keywords(skill.description)
    
    overlap = len(set(task_keywords) & set(skill_keywords))
    return overlap / len(task_keywords)
```

### 2. 语义匹配
```python
def semantic_match(task, skill):
    task_embedding = embed(task)
    skill_embedding = embed(skill.description)
    
    similarity = cosine_similarity(task_embedding, skill_embedding)
    return similarity
```

### 3. 能力匹配
```python
def capability_match(task, skill):
    required_capabilities = extract_capabilities(task)
    skill_capabilities = skill.capabilities
    
    covered = len(required_capabilities & skill_capabilities)
    return covered / len(required_capabilities)
```

### 4. 综合评分
```python
def final_score(task, skill):
    keyword_score = keyword_match(task, skill) * 0.3
    semantic_score = semantic_match(task, skill) * 0.4
    capability_score = capability_match(task, skill) * 0.3
    
    return keyword_score + semantic_score + capability_score
```

---

## 技能评估标准

### 功能完整性 (30%)
- [ ] 实现所有需求功能
- [ ] 边界情况处理
- [ ] 错误处理完善

### 代码质量 (25%)
- [ ] 代码规范 (PEP8/ESLint)
- [ ] 注释清晰
- [ ] 异常处理
- [ ] 无重复代码

### 测试覆盖 (20%)
- [ ] 单元测试覆盖率>80%
- [ ] 集成测试
- [ ] 边界测试

### 文档完整 (15%)
- [ ] SKILL.md 完整
- [ ] 使用示例
- [ ] API 文档
- [ ] CHANGELOG

### 用户体验 (10%)
- [ ] 易用性
- [ ] 错误提示清晰
- [ ] 性能优化

---

## 保存路径

```
~/.openclaw/skills/system/skill-lifecycle-manager/
├── SKILL.md                        # 本文档
├── schema.json                     # 输入输出定义
├── examples.json                   # 使用示例
├── skill_selector.py               # 技能选择器
├── skill_generator.py              # 技能生成器
├── skill_evaluator.py              # 技能评估器
└── github_analyzer.py              # GitHub 分析器
```

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-03-24 | 初始版本 (合并 4 个技能) |

---

## 相关技能

- [[skill-coordinator]] - 技能协调器
- [[task-orchestrator]] - 任务编排器
- [[self-improvement-core]] - 自我进化核心
- [[skill-vetter]] - 技能评分 (外部依赖)

---

*Skill Lifecycle Manager v1.0 - 完整的技能生命周期管理*
*Last updated: 2026-03-24*
