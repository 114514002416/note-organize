import { useState } from 'react';
import { Globe, Copy, RotateCcw } from 'lucide-react';
import { TranslationService } from '../services/translationService';
import './TranslatePage.css';

function TranslatePage() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const languages = TranslationService.getSupportedLanguages();

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('请输入要翻译的文本');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const detectedLang = sourceLanguage === 'auto'
        ? await TranslationService.detectLanguage(sourceText)
        : sourceLanguage;

      if (detectedLang === targetLanguage) {
        setError('源语言和目标语言相同');
        setIsLoading(false);
        return;
      }

      const response = await TranslationService.translate({
        text: sourceText,
        sourceLanguage: detectedLang,
        targetLanguage,
      });

      setTranslatedText(response.translatedText);
    } catch (err) {
      setError('翻译失败，请重试');
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板！');
  };

  const handleSwap = () => {
    setSourceText(translatedText);
    setTranslatedText(sourceText);
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  const handleReset = () => {
    setSourceText('');
    setTranslatedText('');
    setError('');
  };

  return (
    <div className="translate-page">
      <div className="translate-container">
        <div className="translate-header">
          <Globe className="header-icon" />
          <h1>AI 多语言翻译</h1>
          <p>快速翻译笔记和文本内容</p>
        </div>

        <div className="translate-box">
          <div className="translate-input-group">
            <div className="input-section">
              <label>源文本</label>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="language-select"
              >
                <option value="auto">自动检测</option>
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="输入要翻译的文本..."
                className="translate-textarea"
                rows={6}
              />
              {sourceText && (
                <button
                  className="btn-copy"
                  onClick={() => handleCopy(sourceText)}
                  title="复制"
                >
                  <Copy size={16} />
                </button>
              )}
            </div>

            <div className="swap-button-container">
              <button className="btn-swap" onClick={handleSwap} title="交换语言">
                ⇄
              </button>
            </div>

            <div className="input-section">
              <label>译文</label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="language-select"
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
              <textarea
                value={translatedText}
                readOnly
                placeholder="翻译结果将显示在这里..."
                className="translate-textarea"
                rows={6}
              />
              {translatedText && (
                <button
                  className="btn-copy"
                  onClick={() => handleCopy(translatedText)}
                  title="复制"
                >
                  <Copy size={16} />
                </button>
              )}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button
              className="btn-translate"
              onClick={handleTranslate}
              disabled={isLoading || !sourceText}
            >
              {isLoading ? '翻译中...' : '翻译'}
            </button>
            <button className="btn-reset" onClick={handleReset}>
              <RotateCcw size={18} />
              重置
            </button>
          </div>
        </div>

        <div className="translate-features">
          <h2>翻译特性</h2>
          <ul>
            <li>✓ 支持 10+ 种语言</li>
            <li>✓ 自动语言检测</li>
            <li>✓ 快速精准翻译</li>
            <li>✓ 一键复制</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TranslatePage;
