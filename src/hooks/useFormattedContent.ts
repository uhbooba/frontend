import { useMemo } from 'react';
import { formatContent } from '@/utils/formatContent';

export const useFormattedContent = (
  content: string,
  fontSize: string = 'text-2xl',
) => {
  return useMemo(() => formatContent(content, fontSize), [content, fontSize]);
};
