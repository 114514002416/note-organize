# 快速启动指南

## ⚡ 30 秒快速开始

### 1️⃣ 克隆项目
```bash
git clone https://github.com/yourusername/note-organize.git
cd note-organize
```

### 2️⃣ 安装依赖
```bash
npm install
```

### 3️⃣ 启动开发服务器
```bash
npm run dev
```

🎉 完成！访问 `http://localhost:3000`

---

## 📱 功能演示

### 创建笔记
1. 点击「新建笔记」
2. 输入标题：`React 学习笔记`
3. 输入内容：`#react #javascript #前端`
4. 点击「保存」

### 翻译笔记
1. 切换到「翻译」页面
2. 粘贴笔记内容
3. 选择目标语言（如英文）
4. 点击「翻译」

### 查看统计
1. 切换到「统计」页面
2. 查看笔记数据
3. 分析学习进度

---

## 🛠️ 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产版本 |
| `npm run lint` | 代码规范检查 |
| `npm run format` | 代码格式化 |

---

## 🌍 部署

### Netlify（推荐）
```bash
npm run build
netlify deploy --prod --dir dist
```

### Vercel
```bash
vercel --prod
```

### Docker
```bash
docker build -t note-organize .
docker run -p 3000:3000 note-organize
```

详见 [INSTALL.md](INSTALL.md)

---

## 📚 更多资源

- 📖 [完整文档](README.md)
- 🚀 [安装指南](INSTALL.md)
- 🤝 [贡献指南](CONTRIBUTING.md)
- 📝 [更新日志](CHANGELOG.md)

---

## 🆘 遇到问题？

- 📌 查看 [常见问题](README.md#常见问题)
- 🐛 报告 [Bug](https://github.com/yourusername/note-organize/issues)
- 💬 加入 [讨论](https://github.com/yourusername/note-organize/discussions)

---

## 💪 贡献代码

我们欢迎你的贡献！

```bash
# 1. Fork 项目
# 2. 创建分支
git checkout -b feature/AmazingFeature

# 3. 提交更改
git commit -m 'Add AmazingFeature'

# 4. 推送分支
git push origin feature/AmazingFeature

# 5. 开启 Pull Request
```

详见 [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 协议

MIT License - 自由使用和修改

---

**现在就开始探索吧！** 🚀
