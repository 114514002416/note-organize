import { useState, useEffect } from 'react';
import { Plus, Download, Upload } from 'lucide-react';
import { Note } from '../types';
import { StorageService } from '../services/storageService';
import { generateId, autoCategorizNote, extractTags } from '../utils/helpers';
import NoteEditor from '../components/NoteEditor';
import NoteCard from '../components/NoteCard';
import './NoteListPage.css';

function NoteListPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    const allNotes = StorageService.getAllNotes();
    setNotes(allNotes);
    const allCategories = StorageService.getAllCategories();
    setCategories(allCategories);
  };

  const handleSaveNote = (title: string, content: string) => {
    const autoCategory = autoCategorizNote(title);
    const tags = extractTags(content);

    const note: Note = {
      id: editingNote?.id || generateId(),
      title,
      content,
      category: autoCategory,
      tags,
      createdAt: editingNote?.createdAt || Date.now(),
      updatedAt: Date.now(),
      language: 'zh',
    };

    StorageService.saveNote(note);
    loadNotes();
    setShowEditor(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('确定删除这个笔记吗？')) {
      StorageService.deleteNote(id);
      loadNotes();
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleExport = () => {
    const data = StorageService.exportNotes();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonData = event.target?.result as string;
            StorageService.importNotes(jsonData);
            loadNotes();
            alert('笔记导入成功！');
          } catch {
            alert('导入失败，请检查文件格式');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.includes(searchQuery) || note.content.includes(searchQuery);
    const matchesCategory = filterCategory === 'all' || note.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (showEditor) {
    return (
      <NoteEditor
        note={editingNote}
        onSave={handleSaveNote}
        onCancel={() => {
          setShowEditor(false);
          setEditingNote(null);
        }}
      />
    );
  }

  return (
    <div className="note-list-page">
      <div className="page-header">
        <h1>我的笔记</h1>
        <button className="btn-primary" onClick={handleNewNote}>
          <Plus size={20} />
          新建笔记
        </button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="搜索笔记..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="category-filter"
        >
          <option value="all">全部分类</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="action-buttons">
          <button className="btn-icon" onClick={handleExport} title="导出笔记">
            <Download size={20} />
          </button>
          <button className="btn-icon" onClick={handleImport} title="导入笔记">
            <Upload size={20} />
          </button>
        </div>
      </div>

      <div className="notes-info">
        <span>{filteredNotes.length} 条笔记</span>
      </div>

      <div className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>暂无笔记，新建一个开始吧！</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteListPage;
