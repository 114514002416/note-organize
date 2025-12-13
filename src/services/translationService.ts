import { TranslationRequest, TranslationResponse } from '../types';

/**
 * AI翻译服务
 * 使用 MyMemory 免费翻译API（无需密钥）
 */
export class TranslationService {
  private static readonly API_ENDPOINT = 'https://api.mymemory.translated.net/get';

  /**
   * 翻译文本
   */
  static async translate(request: TranslationRequest): Promise<TranslationResponse> {
    try {
      const params = new URLSearchParams({
        q: request.text,
        langpair: `${request.sourceLanguage}|${request.targetLanguage}`,
      });

      const response = await fetch(`${this.API_ENDPOINT}?${params}`);
      const data = await response.json();

      if (data.responseStatus === 200) {
        return {
          translatedText: data.responseData.translatedText,
          sourceLanguage: request.sourceLanguage,
          targetLanguage: request.targetLanguage,
        };
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  /**
   * 检测文本语言
   */
  static async detectLanguage(text: string): Promise<string> {
    try {
      // 简单的语言检测（可以扩展）
      if (/[\u4e00-\u9fa5]/.test(text)) {
        return 'zh';
      } else if (/[ぁ-ん]|[ァ-ヴー]/.test(text)) {
        return 'ja';
      } else if (/[가-힣]/.test(text)) {
        return 'ko';
      } else {
        return 'en';
      }
    } catch (error) {
      console.error('Language detection error:', error);
      return 'en';
    }
  }

  /**
   * 支持的语言列表 (18+ 种语言)
   */
  static getSupportedLanguages(): Record<string, string> {
    return {
      'auto': '自动检测',
      'en': 'English',
      'zh': '中文 (简体)',
      'zh-TW': '中文 (繁體)',
      'ja': '日本語',
      'ko': '한국어',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch',
      'it': 'Italiano',
      'pt': 'Português',
      'pt-BR': 'Português (Brasil)',
      'ru': 'Русский',
      'ar': 'العربية',
      'th': 'ไทย',
      'vi': 'Tiếng Việt',
      'id': 'Bahasa Indonesia',
      'hi': 'हिन्दी',
      'tr': 'Türkçe',
      'pl': 'Polski',
      'nl': 'Nederlands',
      'sv': 'Svenska',
    };
  }

  /**
   * 批量翻译多个文本
   */
  static async translateBatch(
    texts: string[],
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<TranslationResponse[]> {
    try {
      const promises = texts.map(text =>
        this.translate({
          text,
          sourceLanguage,
          targetLanguage,
        })
      );
      return await Promise.all(promises);
    } catch (error) {
      console.error('Batch translation error:', error);
      throw error;
    }
  }

  /**
   * 获取语言代码的本地化名称
   */
  static getLanguageName(code: string): string {
    return this.getSupportedLanguages()[code] || code;
  }

  /**
   * 验证语言代码是否支持
   */
  static isLanguageSupported(code: string): boolean {
    return code in this.getSupportedLanguages();
  }
}
