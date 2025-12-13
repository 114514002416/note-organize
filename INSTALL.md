# 安装和部署指南

本文档提供了多种部署 Note Organize 的方式。

## 目录

- [本地开发](#本地开发)
- [Docker 部署](#docker-部署)
- [Netlify 部署](#netlify-部署)
- [Vercel 部署](#vercel-部署)
- [GitHub Pages 部署](#github-pages-部署)
- [故障排除](#故障排除)

---

## 本地开发

### 前置要求

- Node.js >= 16
- npm >= 8 或 yarn >= 3
- Git

### 步骤

1. **克隆仓库**

```bash
git clone https://github.com/yourusername/note-organize.git
cd note-organize
```

2. **安装依赖**

```bash
npm install
```

或使用 yarn：

```bash
yarn install
```

3. **启动开发服务器**

```bash
npm run dev
```

服务器将启动在 `http://localhost:3000`，自动打开浏览器。

4. **开发命令**

```bash
# 代码规范检查
npm run lint

# 代码格式化
npm run format

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

---

## Docker 部署

### 使用现有的 Docker 镜像

```bash
# 构建镜像
docker build -t note-organize:latest .

# 运行容器
docker run -d -p 3000:3000 --name note-organize note-organize:latest

# 访问应用
open http://localhost:3000
```

### 使用 Docker Compose

创建 `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./dist:/app/dist
```

运行：

```bash
docker-compose up -d
```

---

## Netlify 部署

### 方法一：使用 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 构建项目
npm run build

# 部署
netlify deploy --prod --dir dist
```

### 方法二：连接 GitHub 仓库

1. 访问 [Netlify](https://netlify.com)
2. 点击 "New site from Git"
3. 选择你的 GitHub 仓库
4. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 点击 Deploy

---

## Vercel 部署

### 方法一：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel --prod
```

### 方法二：连接 GitHub 仓库

1. 访问 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. Vercel 会自动检测设置
5. 点击 Deploy

---

## GitHub Pages 部署

### 步骤

1. **更新 `vite.config.ts`**

```typescript
export default defineConfig({
  base: '/note-organize/', // 替换为你的仓库名
  // ... 其他配置
})
```

2. **构建项目**

```bash
npm run build
```

3. **部署到 GitHub Pages**

使用 GitHub Actions (推荐):

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

4. **启用 GitHub Pages**

在仓库设置中，将 GitHub Pages 源设置为 `gh-pages` 分支。

---

## 故障排除

### 端口被占用

如果 3000 端口被占用，使用不同的端口：

```bash
npm run dev -- --port 3001
```

### 构建失败

检查以下问题：

1. **Node.js 版本**

```bash
node --version  # 应该是 v16 或更高
```

2. **清除缓存**

```bash
rm -rf node_modules package-lock.json
npm install
```

3. **检查错误信息**

```bash
npm run build --verbose
```

### 依赖问题

安装特定版本的依赖：

```bash
npm install react@18.2.0 react-dom@18.2.0
```

### TypeScript 错误

运行类型检查：

```bash
npx tsc --noEmit
```

---

## 性能优化

### 1. 启用 Gzip 压缩

在 Netlify 中，自动启用。

在 Vercel 中，自动启用。

在自托管中，配置服务器（nginx）：

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### 2. 启用缓存

```html
<!-- 在 index.html 中添加 -->
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

### 3. 优化包大小

```bash
npm run build
# 查看构建大小
npm run build -- --report
```

---

## 环境变量

创建 `.env.local`:

```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Note Organize
```

在代码中使用：

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 更新应用

### 从源码更新

```bash
git pull origin main
npm install
npm run build
```

### 部署更新

```bash
# Netlify
netlify deploy --prod

# Vercel
vercel --prod

# GitHub Pages
# 自动部署，提交到 main 分支即可
```

---

## 需要帮助？

- 📖 查看 [文档](README.md)
- 🐛 报告 [问题](https://github.com/yourusername/note-organize/issues)
- 💬 参与 [讨论](https://github.com/yourusername/note-organize/discussions)
- 📧 发送邮件：your.email@example.com
