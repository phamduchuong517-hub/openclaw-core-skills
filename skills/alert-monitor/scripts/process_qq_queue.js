#!/usr/bin/env node

/**
 * QQ 告警队列处理器
 * 读取告警队列并通过 OpenClaw message tool 发送到 QQ
 * 由 OpenClaw 技能系统调用执行
 */

const fs = require('fs');
const path = require('path');

const QUEUE_FILE = path.join(process.env.HOME || '/root', '.openclaw/skills/alert-monitor/qq_queue.json');

// 读取并处理队列
function processQueue() {
  if (!fs.existsSync(QUEUE_FILE)) {
    console.log('队列为空');
    return;
  }
  
  try {
    const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
    
    if (queue.length === 0) {
      console.log('队列为空');
      fs.unlinkSync(QUEUE_FILE);
      return;
    }
    
    console.log(`处理 ${queue.length} 条待发送消息...`);
    
    for (const item of queue) {
      // 输出到 stdout，由 OpenClaw 捕获并调用 message tool
      console.log('=== QQ_MESSAGE_START ===');
      console.log(`CHANNEL: ${item.channel}`);
      console.log(`TARGET: ${item.target}`);
      console.log(`MESSAGE: ${item.message}`);
      console.log('=== QQ_MESSAGE_END ===');
    }
    
    // 清空队列
    fs.unlinkSync(QUEUE_FILE);
    console.log('队列处理完成');
  } catch (e) {
    console.error('处理队列失败:', e.message);
  }
}

// 命令行参数
const args = process.argv.slice(2);

if (args.includes('--process')) {
  processQueue();
  process.exit(0);
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
QQ 告警队列处理器

用法:
  node process_qq_queue.js [选项]

选项:
  --process    处理队列中的消息并发送到 QQ
  --help       显示帮助信息
`);
  process.exit(0);
}

// 默认处理队列
processQueue();
