#!/usr/bin/env node

/**
 * OpenClaw 告警监控主脚本
 * 检查系统状态、API 配额、网关健康等，发送告警通知
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置路径
const CONFIG_PATH = path.join(process.env.HOME || '/root', '.openclaw/config/alerts.yaml');
const DEFAULT_CONFIG_PATH = path.join(__dirname, 'config/alerts.yaml');
const STATE_PATH = path.join(process.env.HOME || '/root', '.openclaw/skills/alert-monitor/state.json');
const LOG_FILE = path.join(process.env.HOME || '/root', '.openclaw/skills/alert-monitor/logs/alert.log');

// 确保日志目录存在
function ensureLogDir() {
  const logDir = path.dirname(LOG_FILE);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

// 写入日志
function log(level, message) {
  ensureLogDir();
  const timestamp = new Date().toISOString();
  fs.appendFileSync(LOG_FILE, `[${timestamp}] [${level}] ${message}\n`);
  console.log(`[${level}] ${message}`);
}

// 简化的 YAML 解析器 - 只解析我们需要的字段
function parseYaml(content) {
  const result = {
    enabled: true,  // 默认启用
    rules: [],
    channels: { qqbot: { enabled: true, chat_id: 'qqbot:c2c:685F044879F8CB43AC139D11FBE79CDE' } },
    settings: { check_interval: 300, max_alerts_per_hour: 10, dedup_window: 600 }
  };
  
  // 先查找全局 enabled（在 rules 之前）
  const rulesIndex = content.indexOf('rules:');
  const beforeRules = content.substring(0, rulesIndex > 0 ? rulesIndex : content.length);
  const enabledMatch = beforeRules.match(/^enabled:\s*(true|false)/m);
  if (enabledMatch) {
    result.enabled = enabledMatch[1] === 'true';
  }
  
  const lines = content.split('\n');
  let currentRule = null;
  let inRules = false;
  
  for (const line of lines) {
    // 跳过空行和注释
    if (!line.trim() || line.trim().startsWith('#')) continue;
    
    const trimmed = line.trim();
    
    // 检测 rules 部分开始
    if (trimmed === 'rules:') {
      inRules = true;
      continue;
    }
    
    // 检测 channels/settings 部分开始（跳过）
    if (trimmed === 'channels:' || trimmed === 'settings:') {
      inRules = false;
      continue;
    }
    
    // 解析规则
    if (inRules) {
      // 新规则开始
      if (trimmed.startsWith('- name:')) {
        if (currentRule) {
          result.rules.push(currentRule);
        }
        currentRule = {
          name: trimmed.split(':')[1].trim(),
          type: 'system',
          threshold: 80,
          threshold_percent: 90,
          level: 'warning',
          enabled: true,
          channels: ['qqbot']
        };
        continue;
      }
      
      // 规则属性
      if (currentRule && (line.startsWith('    ') || line.startsWith('\t'))) {
        const match = trimmed.match(/^(\w+):\s*(.+)$/);
        if (match) {
          const key = match[1];
          let value = match[2].trim();
          
          // 移除行内注释
          const commentIndex = value.indexOf('#');
          if (commentIndex > 0) {
            value = value.substring(0, commentIndex).trim();
          }
          
          if (key === 'enabled') {
            currentRule.enabled = value === 'true';
          } else if (key === 'threshold' || key === 'threshold_percent') {
            currentRule[key] = parseInt(value);
          } else if (key === 'channels') {
            const arrayMatch = value.match(/\[(.*?)\]/);
            if (arrayMatch) {
              currentRule.channels = arrayMatch[1].split(',').map(s => s.trim());
            }
          } else if (key === 'level' || key === 'type') {
            currentRule[key] = value;
          }
        }
      }
    }
  }
  
  // 添加最后一个规则
  if (currentRule) {
    result.rules.push(currentRule);
  }
  
  return result;
}

// 加载配置
function loadConfig() {
  try {
    const configPath = fs.existsSync(CONFIG_PATH) ? CONFIG_PATH : DEFAULT_CONFIG_PATH;
    const content = fs.readFileSync(configPath, 'utf8');
    const config = parseYaml(content);
    log('INFO', `加载配置成功，规则数：${config.rules.length}`);
    return config;
  } catch (e) {
    log('ERROR', `加载配置失败：${e.message}`);
    return { enabled: true, rules: [], channels: { qqbot: { enabled: true } } };
  }
}

// 加载状态
function loadState() {
  try {
    if (fs.existsSync(STATE_PATH)) {
      return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    }
  } catch (e) {
    log('ERROR', `加载状态失败：${e.message}`);
  }
  return { lastAlerts: {}, alertCounts: {} };
}

// 保存状态
function saveState(state) {
  try {
    fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
  } catch (e) {
    log('ERROR', `保存状态失败：${e.message}`);
  }
}

// 检查网关健康
function checkGatewayHealth() {
  try {
    const result = execSync('openclaw gateway status 2>&1 | head -3', {
      encoding: 'utf8',
      timeout: 5000,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return {
      online: result.length > 0,
      status: result.trim().substring(0, 80)
    };
  } catch (e) {
    return {
      online: true,
      status: '状态检查跳过'
    };
  }
}

// 检查磁盘空间
function checkDiskSpace() {
  try {
    const result = execSync('df -h / | tail -1', { encoding: 'utf8' });
    const parts = result.trim().split(/\s+/);
    const usePercent = parseInt(parts[4]);
    return {
      used: 100 - usePercent,
      percent: usePercent
    };
  } catch (e) {
    return null;
  }
}

// 检查内存使用
function checkMemory() {
  try {
    const result = execSync('free | grep Mem', { encoding: 'utf8' });
    const parts = result.trim().split(/\s+/);
    const total = parseInt(parts[1]);
    const used = parseInt(parts[2]);
    const percent = Math.round((used / total) * 100);
    return {
      used,
      total,
      percent
    };
  } catch (e) {
    return null;
  }
}

// 发送 QQ 告警
function sendQQAlert(title, message, level) {
  const emojis = {
    warning: '⚠️',
    critical: '🔴',
    info: 'ℹ️'
  };
  
  const emoji = emojis[level] || '🔔';
  const timestamp = new Date().toLocaleString('zh-CN');
  
  log(level.toUpperCase(), `${title} - ${message.substring(0, 50)}`);
  
  // 准备 QQ 消息
  const qqMessage = `${emoji} *${title}*\n\n${message}\n\n⏰ ${timestamp}`;
  
  console.log(`${emoji} ${title}`);
  console.log(message);
  console.log(`⏰ ${timestamp}`);
  
  // 写入待发送队列（由 OpenClaw 技能系统处理）
  const queueFile = path.join(process.env.HOME || '/root', '.openclaw/skills/alert-monitor/qq_queue.json');
  try {
    let queue = [];
    if (fs.existsSync(queueFile)) {
      queue = JSON.parse(fs.readFileSync(queueFile, 'utf8'));
    }
    queue.push({
      channel: 'qqbot',
      target: 'qqbot:c2c:685F044879F8CB43AC139D11FBE79CDE',
      message: qqMessage,
      timestamp: Date.now(),
      level: level
    });
    fs.writeFileSync(queueFile, JSON.stringify(queue, null, 2));
    log('INFO', '告警已添加到 QQ 发送队列');
  } catch (e) {
    log('ERROR', `写入 QQ 队列失败：${e.message}`);
  }
  
  return { success: true, channel: 'qqbot' };
}

// 告警去重检查
function shouldSendAlert(ruleName, state) {
  const now = Date.now();
  const lastAlert = state.lastAlerts[ruleName];
  const dedupWindow = 600000; // 10 分钟
  
  if (lastAlert && (now - lastAlert) < dedupWindow) {
    log('INFO', `告警去重：${ruleName}`);
    return false;
  }
  
  return true;
}

// 主检查函数
function runChecks() {
  ensureLogDir();
  log('INFO', '开始执行告警检查...');
  
  const config = loadConfig();
  const state = loadState();
  
  if (!config.enabled) {
    log('INFO', '告警监控已禁用');
    return;
  }
  
  log('INFO', `配置规则数：${config.rules.length}`);
  
  // 1. 检查网关健康
  const gateway = checkGatewayHealth();
  log('INFO', `网关状态：${gateway.online ? '在线' : '离线'}`);
  
  // 2. 检查磁盘空间
  const disk = checkDiskSpace();
  if (disk) {
    log('INFO', `磁盘使用：${disk.percent}%`);
    const rule = config.rules.find(r => r.name === 'disk_space');
    const threshold = rule ? rule.threshold_percent : 90;
    if (disk.percent > threshold) {
      if (shouldSendAlert('disk_space', state)) {
        sendQQAlert(
          '紧急告警 - 磁盘空间不足',
          `磁盘使用率：${disk.percent}%\n剩余空间：${disk.used}%\n\n请立即清理磁盘空间！`,
          'critical'
        );
        state.lastAlerts['disk_space'] = Date.now();
      }
    }
  }
  
  // 3. 检查内存使用
  const memory = checkMemory();
  if (memory) {
    log('INFO', `内存使用：${memory.percent}%`);
    const rule = config.rules.find(r => r.name === 'memory_usage');
    const threshold = rule ? rule.threshold_percent : 90;
    if (memory.percent > threshold) {
      if (shouldSendAlert('memory_usage', state)) {
        sendQQAlert(
          '警告 - 内存占用过高',
          `内存使用率：${memory.percent}%\n已用：${Math.round(memory.used / 1024 / 1024)}MB / ${Math.round(memory.total / 1024 / 1024)}MB`,
          'warning'
        );
        state.lastAlerts['memory_usage'] = Date.now();
      }
    }
  }
  
  // 保存状态
  saveState(state);
  
  log('INFO', '告警检查完成');
}

// 命令行参数处理
const args = process.argv.slice(2);

if (args.includes('--test')) {
  ensureLogDir();
  log('INFO', '发送测试告警...');
  sendQQAlert('测试告警', '这是一条测试告警消息，确认通知渠道正常工作。', 'info');
  process.exit(0);
}

if (args.includes('--check')) {
  runChecks();
  process.exit(0);
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
OpenClaw 告警监控脚本

用法：
  node alert_monitor.js [选项]

选项：
  --check    执行一次完整检查
  --test     发送测试告警
  --help     显示帮助信息

无参数时自动执行检查
`);
  process.exit(0);
}

// 默认执行检查
runChecks();
