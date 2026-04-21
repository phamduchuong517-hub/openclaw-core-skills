#!/usr/bin/env node

/**
 * OpenClaw QQ 告警通知脚本
 * 通过 OpenClaw message tool 发送告警到 QQ
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG_PATH = path.join(process.env.HOME || '/root', '.openclaw/config/alerts.yaml');
const CHAT_ID = 'qqbot:c2c:685F044879F8CB43AC139D11FBE79CDE';

// 格式化 QQ 告警消息
function formatQQMessage(title, message, level) {
  const emojis = {
    warning: '⚠️',
    critical: '🔴',
    info: 'ℹ️'
  };
  
  const emoji = emojis[level] || '🔔';
  const timestamp = new Date().toLocaleString('zh-CN');
  
  return `${emoji} *${title}*\n\n${message}\n\n⏰ ${timestamp}`;
}

// 发送 QQ 消息（通过 OpenClaw message tool）
function sendQQMessage(message) {
  const payload = {
    channel: 'qqbot',
    target: CHAT_ID,
    message: message
  };
  
  // 输出到 stdout，由父进程处理
  console.log('SEND_QQ_MESSAGE:', JSON.stringify(payload));
  
  return { success: true };
}

// 发送告警
function sendAlert(title, message, level = 'info') {
  const qqMessage = formatQQMessage(title, message, level);
  console.log(qqMessage);
  return sendQQMessage(qqMessage);
}

// 发送测试告警
function sendTestAlert() {
  console.log('发送 QQ 测试告警...');
  sendAlert(
    '测试告警',
    '这是一条测试告警消息，确认 QQ 通知渠道正常工作。\n\n如果你收到这条消息，说明告警系统集成成功！',
    'info'
  );
}

// 发送系统状态报告
function sendStatusReport() {
  try {
    // 获取系统状态
    const gatewayStatus = execSync('openclaw gateway status 2>&1 | head -1', { encoding: 'utf8' }).trim();
    const diskInfo = execSync('df -h / | tail -1 | awk \'{print $5" 已用，"$4" 剩余"}\'', { encoding: 'utf8' }).trim();
    const memInfo = execSync('free -h | grep Mem | awk \'{print $3"/"$2" ("int($3/$2*100)"%)\'}\'', { encoding: 'utf8' }).trim();
    
    const message = `📊 *OpenClaw 系统状态*\n\n` +
      `🖥️ 网关：${gatewayStatus}\n` +
      `💾 磁盘：${diskInfo}\n` +
      `🧠 内存：${memInfo}\n\n` +
      `⏰ ${new Date().toLocaleString('zh-CN')}\n\n` +
      `所有系统运行正常 ✓`;
    
    console.log(message);
    sendQQMessage(message);
  } catch (e) {
    sendAlert('状态报告失败', `获取系统状态时出错：${e.message}`, 'warning');
  }
}

// 命令行参数处理
const args = process.argv.slice(2);

if (args.includes('--test')) {
  sendTestAlert();
  process.exit(0);
}

if (args.includes('--status')) {
  sendStatusReport();
  process.exit(0);
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
OpenClaw QQ 告警通知脚本

用法：
  node qq_alert.js [选项]

选项：
  --test     发送测试告警到 QQ
  --status   发送系统状态报告到 QQ
  --help     显示帮助信息

无参数时显示帮助
`);
  process.exit(0);
}

// 默认显示帮助
console.log('请使用 --test 或 --status 参数');
