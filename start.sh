#!/bin/bash

# Note Organize 启动脚本
# Usage: ./start.sh [dev|build|preview]

set -e

command="${1:-dev}"

case "$command" in
  dev)
    echo "🚀 启动开发服务器..."
    npm run dev
    ;;
  build)
    echo "🔨 构建生产版本..."
    npm run build
    ;;
  preview)
    echo "👀 预览生产版本..."
    npm run build
    npm run preview
    ;;
  lint)
    echo "📋 运行 ESLint..."
    npm run lint
    ;;
  format)
    echo "✨ 格式化代码..."
    npm run format
    ;;
  *)
    echo "未知命令: $command"
    echo ""
    echo "可用命令："
    echo "  dev      - 启动开发服务器"
    echo "  build    - 构建生产版本"
    echo "  preview  - 预览生产版本"
    echo "  lint     - 代码规范检查"
    echo "  format   - 格式化代码"
    exit 1
    ;;
esac
