import { useState, useEffect } from 'react';
import { BarChart3, Tag, Folder, BookOpen } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { calculateReadingTime } from '../utils/helpers';
import './StatsPage.css';

interface Stats {
  totalNotes: number;
  totalCharacters: number;
  totalWords: number;
  totalReadingTime: number;
  averageNoteLength: number;
  categories: Record<string, number>;
  tags: Record<string, number>;
  mostActiveCategory: string;
  mostUsedTag: string;
}

function StatsPage() {
  const [stats, setStats] = useState<Stats>({
    totalNotes: 0,
    totalCharacters: 0,
    totalWords: 0,
    totalReadingTime: 0,
    averageNoteLength: 0,
    categories: {},
    tags: {},
    mostActiveCategory: '',
    mostUsedTag: '',
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    const notes = StorageService.getAllNotes();

    if (notes.length === 0) {
      setStats({
        totalNotes: 0,
        totalCharacters: 0,
        totalWords: 0,
        totalReadingTime: 0,
        averageNoteLength: 0,
        categories: {},
        tags: {},
        mostActiveCategory: '',
        mostUsedTag: '',
      });
      return;
    }

    const categories: Record<string, number> = {};
    const tags: Record<string, number> = {};
    let totalCharacters = 0;
    let totalWords = 0;
    let totalReadingTime = 0;

    notes.forEach(note => {
      // 字符和单词统计
      totalCharacters += note.content.length;
      totalWords += note.content.split(/\s+/).length;
      totalReadingTime += calculateReadingTime(note.content);

      // 分类统计
      categories[note.category] = (categories[note.category] || 0) + 1;

      // 标签统计
      note.tags.forEach(tag => {
        tags[tag] = (tags[tag] || 0) + 1;
      });
    });

    // 找出最活跃的分类和标签
    const mostActiveCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
    const mostUsedTag = Object.entries(tags).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

    setStats({
      totalNotes: notes.length,
      totalCharacters,
      totalWords,
      totalReadingTime,
      averageNoteLength: Math.round(totalCharacters / notes.length),
      categories,
      tags,
      mostActiveCategory,
      mostUsedTag,
    });
  };

  return (
    <div className="stats-page">
      <div className="stats-header">
        <BarChart3 className="header-icon" />
        <h1>笔记统计分析</h1>
        <p>实时查看你的笔记数据</p>
      </div>

      {stats.totalNotes === 0 ? (
        <div className="empty-stats">
          <p>暂无数据，新建笔记后查看统计信息</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <BookOpen className="stat-icon" />
              <div className="stat-content">
                <h3>总笔记数</h3>
                <p className="stat-value">{stats.totalNotes}</p>
              </div>
            </div>

            <div className="stat-card">
              <Tag className="stat-icon" />
              <div className="stat-content">
                <h3>总字符数</h3>
                <p className="stat-value">{stats.totalCharacters.toLocaleString()}</p>
              </div>
            </div>

            <div className="stat-card">
              <Folder className="stat-icon" />
              <div className="stat-content">
                <h3>总单词数</h3>
                <p className="stat-value">{stats.totalWords.toLocaleString()}</p>
              </div>
            </div>

            <div className="stat-card">
              <BarChart3 className="stat-icon" />
              <div className="stat-content">
                <h3>阅读时间</h3>
                <p className="stat-value">{stats.totalReadingTime} 分钟</p>
              </div>
            </div>

            <div className="stat-card">
              <BookOpen className="stat-icon" />
              <div className="stat-content">
                <h3>平均笔记长度</h3>
                <p className="stat-value">{stats.averageNoteLength} 字</p>
              </div>
            </div>

            <div className="stat-card">
              <BarChart3 className="stat-icon" />
              <div className="stat-content">
                <h3>最活跃分类</h3>
                <p className="stat-value">{stats.mostActiveCategory}</p>
              </div>
            </div>
          </div>

          <div className="charts-container">
            <div className="chart-section">
              <h2>笔记分类分布</h2>
              <div className="chart">
                {Object.entries(stats.categories).map(([category, count]) => (
                  <div key={category} className="chart-item">
                    <div className="chart-label">{category}</div>
                    <div className="chart-bar-container">
                      <div
                        className="chart-bar"
                        style={{
                          width: `${(count / stats.totalNotes) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="chart-value">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {Object.keys(stats.tags).length > 0 && (
              <div className="chart-section">
                <h2>高频标签</h2>
                <div className="tags-cloud">
                  {Object.entries(stats.tags)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 12)
                    .map(([tag, count]) => (
                      <span
                        key={tag}
                        className="tag"
                        style={{
                          fontSize: `${0.8 + (count / stats.totalNotes) * 1.2}rem`,
                          opacity: 0.6 + (count / stats.totalNotes) * 0.4,
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="stats-summary">
            <h2>学习进度总结</h2>
            <div className="summary-content">
              <p>
                你已创建 <strong>{stats.totalNotes}</strong> 条笔记，
                累计 <strong>{stats.totalCharacters.toLocaleString()}</strong> 个字符。
              </p>
              <p>
                平均每条笔记 <strong>{stats.averageNoteLength}</strong> 字，
                总计阅读时间约 <strong>{stats.totalReadingTime}</strong> 分钟。
              </p>
              {stats.mostActiveCategory && (
                <p>
                  你最活跃的分类是 <strong>{stats.mostActiveCategory}</strong>，
                  保持这个学习势头！
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StatsPage;
