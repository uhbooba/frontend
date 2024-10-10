import React from 'react';
import Button from './buttons/Button';
import clsx from 'clsx';

type KeywordButtonsProps = {
  keywords: string[];
  onKeywordClick: (keyword: string) => void;
  keywordBtnColor: string;
};

const KeywordButtons: React.FC<KeywordButtonsProps> = ({
  keywords,
  onKeywordClick,
  keywordBtnColor,
}) => {
  return (
    <div>
      <div className='flex justify-between space-x-2'>
        {keywords.slice(0, 3).map((keyword, index) => (
          <Button
            key={index}
            label={keyword}
            color='orange'
            size='small'
            onClick={() => onKeywordClick(keyword)}
            className={clsx(
              'mt-2 border-2',
              keywordBtnColor === keyword
                ? 'font-bold opacity-100'
                : 'opacity-50',
            )}
          />
        ))}
      </div>

      <div className='flex justify-between space-x-2 py-2'>
        {keywords.slice(3, 6).map((keyword, index) => (
          <Button
            key={index + 3}
            label={keyword}
            color='orange'
            size='small'
            onClick={() => onKeywordClick(keyword)}
            className={clsx(
              'border-2',
              keywordBtnColor === keyword
                ? 'font-bold opacity-100'
                : 'opacity-50',
            )}
          />
        ))}
      </div>

      <div className='mb-2 flex justify-between space-x-2'>
        {keywords.slice(6, 9).map((keyword, index) => (
          <Button
            key={index + 6}
            label={keyword}
            color='orange'
            size='small'
            onClick={() => onKeywordClick(keyword)}
            className={clsx(
              'border-2',
              keywordBtnColor === keyword
                ? 'font-bold opacity-100'
                : 'opacity-50',
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default KeywordButtons;
