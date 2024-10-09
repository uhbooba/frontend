import { useMemo } from 'react';
import { formatContent } from '@/utils/formatContent';

export const useFormattedContent = (
  content: string,
  fontSize: string = 'text-2xl',
  onLinkClick?: () => void,
) => {
  return useMemo(
    () => formatContent(content, fontSize, onLinkClick),
    [content, fontSize, onLinkClick],
  );
};
