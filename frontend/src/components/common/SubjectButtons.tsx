import React from 'react';
import Button from './buttons/Button';
import clsx from 'clsx';

type SubjectButtonsProps = {
  subjects: string[];
  onSubjectClick: (amount: string) => void;
  subjectBtnColor: string;
};

const SubjectButtons: React.FC<SubjectButtonsProps> = ({
  subjects,
  onSubjectClick,
  subjectBtnColor,
}) => {
  return (
    <div>
      <div className='flex justify-between space-x-4 px-4'>
        {subjects.slice(0, 3).map((subject, index) => (
          <Button
            key={index}
            label={subject}
            color='orange'
            size='small'
            onClick={() => onSubjectClick(subject)}
            className={clsx(
              'mt-2 border-2',
              subjectBtnColor === subject
                ? 'font-bold opacity-100'
                : 'opacity-50',
            )}
          />
        ))}
      </div>

      <div className='flex justify-between space-x-4 px-4 py-4'>
        {subjects.slice(3, 6).map((subject, index) => (
          <Button
            key={index}
            label={subject}
            color='orange'
            size='small'
            onClick={() => onSubjectClick(subject)}
            className={clsx(
              'border-2',
              subjectBtnColor === subject
                ? 'font-bold opacity-100'
                : 'opacity-50',
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectButtons;
