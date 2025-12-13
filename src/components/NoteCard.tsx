import { Trash2, Edit, Tag, Calendar } from 'lucide-react';
import { Note } from '../types';
import { formatDate, getContentSummary } from '../utils/helpers';
import './NoteCard.css';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <span className="note-category">{note.category}</span>
      </div>

      <p className="note-preview">
        {getContentSummary(note.content, 100)}
      </p>

      {note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      )}

      <div className="note-meta">
        <span className="meta-item">
          <Calendar size={14} />
          {formatDate(note.updatedAt)}
        </span>
        <span className="meta-item">
          <Tag size={14} />
          {note.content.length} 字
        </span>
      </div>

      <div className="note-actions">
        <button
          className="btn-edit"
          onClick={() => onEdit(note)}
          title="编辑"
        >
          <Edit size={18} />
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(note.id)}
          title="删除"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
