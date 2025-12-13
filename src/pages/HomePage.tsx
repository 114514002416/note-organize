import { ArrowRight, BookOpen, Globe, BarChart3, Tag, Folder, Download, Github } from 'lucide-react';
import './HomePage.css';

interface HomePageProps {
  onNavigate: (page: 'home' | 'notes' | 'translate' | 'stats' | 'tags' | 'categories') => void;
}

function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>智能笔记管理平台</h1>
        <p>自动分类、AI翻译、数据统计，让笔记整理更简单</p>
        <button
          className="cta-button"
          onClick={() => onNavigate('notes')}
        >
          开始使用 <ArrowRight size={20} />
        </button>
      </section>

      <section className="features">
        <h2>核心功能</h2>
        <div className="features-grid">
          <div className="feature-card">
            <BookOpen className="feature-icon" />
            <h3>智能笔记管理</h3>
            <p>创建、编辑、删除笔记，自动分类和标签化</p>
            <button onClick={() => onNavigate('notes')} className="feature-btn">
              立即体验
            </button>
          </div>

          <div className="feature-card">
            <Folder className="feature-icon" />
            <h3>分类管理</h3>
            <p>AI自动分类笔记，可视化查看分类分布</p>
            <button onClick={() => onNavigate('categories')} className="feature-btn">
              查看分类
            </button>
          </div>

          <div className="feature-card">
            <Tag className="feature-icon" />
            <h3>标签管理</h3>
            <p>使用 #tag 快速添加标签，一键分组查询</p>
            <button onClick={() => onNavigate('tags')} className="feature-btn">
              管理标签
            </button>
          </div>

          <div className="feature-card">
            <Globe className="feature-icon" />
            <h3>AI多语言翻译</h3>
            <p>支持18+ 语言，一键翻译笔记内容</p>
            <button onClick={() => onNavigate('translate')} className="feature-btn">
              翻译笔记
            </button>
          </div>

          <div className="feature-card">
            <BarChart3 className="feature-icon" />
            <h3>数据统计分析</h3>
            <p>可视化笔记数据，分析学习进度</p>
            <button onClick={() => onNavigate('stats')} className="feature-btn">
              查看统计
            </button>
          </div>

          <div className="feature-card">
            <Download className="feature-icon" />
            <h3>导入导出</h3>
            <p>支持 JSON 格式导入导出，灵活迁移数据</p>
            <button onClick={() => onNavigate('notes')} className="feature-btn">
              导入导出
            </button>
          </div>
        </div>
      </section>

      <section className="highlights">
        <h2>产品亮点</h2>
        <ul className="highlights-list">
          <li>✨ 本地存储，数据私密安全</li>
          <li>🚀 快速响应，流畅体验</li>
          <li>🔤 自动分类，智能标签提取</li>
          <li>🌍 多语言支持，全球通用 (18+ 种)</li>
          <li>📊 数据可视化，清晰易读</li>
          <li>💾 导入导出，灵活迁移</li>
          <li>📱 响应式设计，跨设备适配</li>
          <li>🎨 现代化UI，视觉体验优秀</li>
        </ul>
      </section>

      <section className="tech-stack">
        <h2>技术栈</h2>
        <div className="tech-items">
          <div className="tech-item">
            <span className="tech-name">React 18</span>
            <span className="tech-desc">现代化 UI 框架</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">TypeScript</span>
            <span className="tech-desc">类型安全保障</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">Vite</span>
            <span className="tech-desc">极速构建工具</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">LocalStorage</span>
            <span className="tech-desc">本地数据存储</span>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>开源项目</h2>
        <p>Note Organize 是一个开源项目，欢迎贡献代码、报告问题、提出功能建议</p>
        <div className="cta-buttons">
          <button className="btn-github" onClick={() => window.open('https://github.com/yourusername/note-organize')}>
            <Github size={20} />
            GitHub 仓库
          </button>
          <button className="btn-start" onClick={() => onNavigate('notes')}>
            <BookOpen size={20} />
            开始使用
          </button>
        </div>
      </section>

      <section className="faq">
        <h2>常见问题</h2>
        <div className="faq-items">
          <div className="faq-item">
            <h4>数据存储在哪里？</h4>
            <p>所有笔记数据存储在浏览器的 LocalStorage 中，确保数据隐私和安全。</p>
          </div>
          <div className="faq-item">
            <h4>翻译功能需要付费吗？</h4>
            <p>不需要！我们使用免费的 MyMemory 翻译 API，无需配置密钥。</p>
          </div>
          <div className="faq-item">
            <h4>支持离线使用吗？</h4>
            <p>笔记管理完全离线使用，翻译功能需要网络连接。</p>
          </div>
          <div className="faq-item">
            <h4>可以在多设备间同步吗？</h4>
            <p>目前不支持云同步，但支持 JSON 导入导出在设备间转移。</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
