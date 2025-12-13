/**
 * 生成唯一ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 格式化日期
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 自动检测和分类笔记
 */
export function autoCategorizNote(title: string): string {
  const keywords: Record<string, string[]> = {
    '学习': ['学', '教程', '课程', '笔记', '复习'],
    '工作': ['任务', '项目', '报告', '会议', '工作'],
    '生活': ['日记', '生活', '计划', '目标', '想法'],
    '技术': ['代码', '编程', '开发', '算法', '技术'],
    '其他': [],
  };

  const lowerTitle = title.toLowerCase();

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => lowerTitle.includes(word))) {
      return category;
    }
  }

  return '其他';
}

/**
 * 提取标签
 */
export function extractTags(content: string): string[] {
  const tagRegex = /#([^\s#]+)/g;
  const tags: string[] = [];
  let match;

  while ((match = tagRegex.exec(content)) !== null) {
    tags.push(match[1]);
  }

  return [...new Set(tags)];
}

/**
 * 获取内容摘要
 */
export function getContentSummary(content: string, length: number = 100): string {
  return content.substring(0, length) + (content.length > length ? '...' : '');
}

/**
 * 计算阅读时间
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
