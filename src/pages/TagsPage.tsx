/* filepath: /workspaces/note-organize/src/pages/TagsPage.tsx */
import { useState, useEffect } from 'react';
import { Tag, Book } from 'lucide-react';
import { StorageService } from '../services/storageService';
import './TagsPage.css';

interface TagInfo {
  name: string;
  count: number;
  percentage: number;
}

function TagsPage() {
  const [tags, setTags] = useState<TagInfo[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [relatedNotesCount, setRelatedNotesCount] = useState<Record<string, number>>({});

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = () => {
    const allNotes = StorageService.getAllNotes();
    const tagCounts: Record<string, number> = {};

    allNotes.forEach(note => {
      note.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const totalNotes = allNotes.length || 1;
    const tagInfos = Object.entries(tagCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalNotes) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    setTags(tagInfos);
    setRelatedNotesCount(tagCounts);
  };

  const getTotalNotesWithTags = () => {
    const notes = StorageService.getAllNotes();
    return notes.filter(note => note.tags.length > 0).length;
  };

  const getMostUsedTag = () => {
    return tags[0]?.name || 'N/A';
  };

  const getAverageTagsPerNote = () => {
    const notes = StorageService.getAllNotes();
    if (notes.length === 0) return 0;
    const totalTags = notes.reduce((sum, note) => sum + note.tags.length, 0);
    return (totalTags / notes.length).toFixed(2);
  };

  return (
    <div className="tags-page">
      <div className="tags-header">
        <Tag className="header-icon" />
        <h1>标签管理</h1>
        <p>查看和管理笔记中的所有标签</p>
      </div>

      {tags.length === 0 ? (
        <div className="empty-tags">
          <p>暂无标签，在笔记中使用 #tag 语法创建标签</p>
        </div>
      ) : (
        <>
          <div className="tag-stats">
            <h2>标签统计</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">总标签数</span>
                <span className="stat-number">{tags.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">有标签的笔记</span>
                <span className="stat-number">{getTotalNotesWithTags()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">最常用标签</span>
                <span className="stat-number">{getMostUsedTag()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">平均标签数</span>
                <span className="stat-number">{getAverageTagsPerNote()}</span>
              </div>
            </div>
          </div>

          <div className="tags-container">
            {tags.map(tag => (
              <div key={tag.name} className="tag-group">
                <div className="tag-group-header">
                  <span className="tag-name">#{tag.name}</span>
                  <span className="tag-count">{tag.count}</span>
                </div>
                <div className="tag-info">
                  <div>
                    <strong>使用频率：</strong> {tag.percentage}%
                  </div>
                  <div>
                    <strong>关联笔记：</strong> {tag.count} 条
                  </div>
                </div>
                <div className="tag-actions">
                  <button className="btn-view-tag" onClick={() => setSelectedTag(tag.name)}>
                    <Book size={16} style={{ marginRight: '0.5rem' }} />
                    查看笔记
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedTag && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f5f7fa', borderRadius: '12px' }}>
              <h3>使用标签 "#{selectedTag}" 的笔记</h3>
              <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#666' }}>
                共有 {relatedNotesCount[selectedTag]} 条笔记使用此标签
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TagsPage;
