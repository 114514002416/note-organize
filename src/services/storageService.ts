import { Note } from '../types';

const STORAGE_KEY = 'notes_data';

/**
 * 本地存储服务
 */
export class StorageService {
  /**
   * 获取所有笔记
   */
  static getAllNotes(): Note[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load notes:', error);
      return [];
    }
  }

  /**
   * 根据ID获取笔记
   */
  static getNoteById(id: string): Note | null {
    const notes = this.getAllNotes();
    return notes.find(note => note.id === id) || null;
  }

  /**
   * 保存或更新笔记
   */
  static saveNote(note: Note): void {
    const notes = this.getAllNotes();
    const existingIndex = notes.findIndex(n => n.id === note.id);

    if (existingIndex >= 0) {
      notes[existingIndex] = note;
    } else {
      notes.push(note);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }

  /**
   * 删除笔记
   */
  static deleteNote(id: string): void {
    const notes = this.getAllNotes();
    const filtered = notes.filter(note => note.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  /**
   * 按分类获取笔记
   */
  static getNotesByCategory(category: string): Note[] {
    const notes = this.getAllNotes();
    return notes.filter(note => note.category === category);
  }

  /**
   * 按标签搜索笔记
   */
  static getNotesByTag(tag: string): Note[] {
    const notes = this.getAllNotes();
    return notes.filter(note => note.tags.includes(tag));
  }

  /**
   * 搜索笔记
   */
  static searchNotes(query: string): Note[] {
    const notes = this.getAllNotes();
    const lowerQuery = query.toLowerCase();
    return notes.filter(
      note =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.content.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * 获取所有分类
   */
  static getAllCategories(): string[] {
    const notes = this.getAllNotes();
    const categories = new Set(notes.map(note => note.category));
    return Array.from(categories);
  }

  /**
   * 获取所有标签
   */
  static getAllTags(): string[] {
    const notes = this.getAllNotes();
    const tags = new Set<string>();
    notes.forEach(note => {
      note.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }

  /**
   * 清空所有笔记
   */
  static clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * 导出笔记为JSON
   */
  static exportNotes(): string {
    const notes = this.getAllNotes();
    return JSON.stringify(notes, null, 2);
  }

  /**
   * 从JSON导入笔记
   */
  static importNotes(jsonData: string): void {
    try {
      const notes = JSON.parse(jsonData);
      if (Array.isArray(notes)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } else {
        throw new Error('Invalid notes format');
      }
    } catch (error) {
      console.error('Failed to import notes:', error);
      throw error;
    }
  }
}
