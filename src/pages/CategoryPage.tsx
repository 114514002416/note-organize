/* filepath: /workspaces/note-organize/src/pages/CategoryPage.tsx */
import { useState, useEffect } from 'react';
import { Folder, BookOpen } from 'lucide-react';
import { StorageService } from '../services/storageService';
import './CategoryPage.css';

interface CategoryInfo {
  name: string;
  count: number;
  percentage: number;
}

function CategoryPage() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const notes = StorageService.getAllNotes();
    const categoryCounts: Record<string, number> = {};

    notes.forEach(note => {
      categoryCounts[note.category] = (categoryCounts[note.category] || 0) + 1;
    });

    const totalNotes = notes.length || 1;
    const categoryInfos = Object.entries(categoryCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalNotes) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    setCategories(categoryInfos);
  };

  const getTotalCategories = () => categories.length;
  const getTotalNotes = () => StorageService.getAllNotes().length;
  const getMostPopularCategory = () => categories[0]?.name || '无';

  return (
    <div className="category-page">
      <div className="category-header">
        <Folder className="header-icon" />
        <h1>分类管理</h1>
        <p>查看和组织笔记分类</p>
      </div>

      {categories.length === 0 ? (
        <div className="empty-category">
          <p>暂无分类，创建笔记后自动生成分类</p>
        </div>
      ) : (
        <>
          <div className="category-summary">
            <h2>分类概览</h2>
            <div className="summary-content">
              <div className="summary-item">
                <span className="summary-label">总分类数</span>
                <span className="summary-value">{getTotalCategories()}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">总笔记数</span>
                <span className="summary-value">{getTotalNotes()}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">最常用分类</span>
                <span className="summary-value">{getMostPopularCategory()}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">平均笔记数</span>
                <span className="summary-value">
                  {(getTotalNotes() / getTotalCategories()).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="categories-grid">
            {categories.map(category => (
              <div key={category.name} className="category-card">
                <h3 className="category-title">{category.name}</h3>
                <div className="category-stats">
                  <div className="stat-row">
                    <span className="stat-label">笔记数量</span>
                    <span className="stat-value">{category.count}</span>
                  </div>
                  <div>
                    <div className="stat-row">
                      <span className="stat-label">占比</span>
                      <span className="stat-value">{category.percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="category-actions">
                  <button className="btn-category btn-view">
                    <BookOpen size={16} style={{ marginRight: '0.3rem' }} />
                    查看笔记
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryPage;
