import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Note } from '../types';
import { formatDate } from '../utils/helpers';
import './NoteEditor.css';

interface NoteEditorProps {
  note?: Note | null;
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
}

function NoteEditor({ note, onSave, onCancel }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('请输入标题和内容');
      return;
    }
    onSave(title, content);
  };

  return (
    <div className="note-editor-overlay">
      <div className="note-editor">
        <div className="editor-header">
          <h2>{note ? '编辑笔记' : '新建笔记'}</h2>
          <button className="btn-close" onClick={onCancel}>
            <X size={24} />
          </button>
        </div>

        <div className="editor-content">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入笔记标题..."
            className="editor-title"
            autoFocus
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="输入笔记内容... (使用 #tag 添加标签)"
            className="editor-textarea"
            rows={12}
          />

          {note && (
            <div className="editor-info">
              <span>创建于: {formatDate(note.createdAt)}</span>
              <span>最后修改: {formatDate(note.updatedAt)}</span>
            </div>
          )}
        </div>

        <div className="editor-footer">
          <button className="btn-cancel" onClick={onCancel}>
            取消
          </button>
          <button className="btn-save" onClick={handleSave}>
            <Save size={18} />
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteEditor;
