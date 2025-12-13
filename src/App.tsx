import { useState } from 'react';
import './App.css';
import { Home, BookOpen, Globe, BarChart3, Tag, Folder } from 'lucide-react';
import HomePage from './pages/HomePage';
import NoteListPage from './pages/NoteListPage';
import TranslatePage from './pages/TranslatePage';
import StatsPage from './pages/StatsPage';
import TagsPage from './pages/TagsPage';
import CategoryPage from './pages/CategoryPage';

type PageType = 'home' | 'notes' | 'translate' | 'stats' | 'tags' | 'categories';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'notes':
        return <NoteListPage />;
      case 'translate':
        return <TranslatePage />;
      case 'stats':
        return <StatsPage />;
      case 'tags':
        return <TagsPage />;
      case 'categories':
        return <CategoryPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <BookOpen className="brand-icon" />
            <h1>Note Organize</h1>
          </div>
          <div className="nav-menu">
            <button
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
              title="首页"
            >
              <Home size={20} />
              <span>首页</span>
            </button>
            <button
              className={`nav-link ${currentPage === 'notes' ? 'active' : ''}`}
              onClick={() => setCurrentPage('notes')}
              title="笔记管理"
            >
              <BookOpen size={20} />
              <span>笔记</span>
            </button>
            <button
              className={`nav-link ${currentPage === 'categories' ? 'active' : ''}`}
              onClick={() => setCurrentPage('categories')}
              title="分类管理"
            >
              <Folder size={20} />
              <span>分类</span>
            </button>
            <button
              className={`nav-link ${currentPage === 'tags' ? 'active' : ''}`}
              onClick={() => setCurrentPage('tags')}
              title="标签管理"
            >
              <Tag size={20} />
              <span>标签</span>
            </button>
            <button
              className={`nav-link ${currentPage === 'translate' ? 'active' : ''}`}
              onClick={() => setCurrentPage('translate')}
              title="翻译"
            >
              <Globe size={20} />
              <span>翻译</span>
            </button>
            <button
              className={`nav-link ${currentPage === 'stats' ? 'active' : ''}`}
              onClick={() => setCurrentPage('stats')}
              title="统计分析"
            >
              <BarChart3 size={20} />
              <span>统计</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {renderPage()}
      </main>

      <footer className="footer">
        <p>&copy; 2024 Note Organize. Open Source. MIT License.</p>
      </footer>
    </div>
  );
}

export default App;
