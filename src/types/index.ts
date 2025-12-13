/**
 * 笔记类型定义
 */
export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  language: string;
  translation?: {
    targetLanguage: string;
    translatedContent: string;
  };
}

export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface NoteStats {
  totalNotes: number;
  totalCategories: number;
  totalTags: number;
  notesByCategory: Record<string, number>;
}
