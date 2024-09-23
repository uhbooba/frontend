import SubjectButtons from '@/components/common/SubjectButtons';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';
import { useState } from 'react';

const EducationVideo = () => {
  const [selectSubject, setSelectSubject] = useState('기초금융 상식');

  const subClick = (subject: string) => {
    setSelectSubject(subject);
  };

  const subjects = [
    '기초금융 상식',
    '생활금융',
    '모바일뱅킹',
    '금융사기',
    '연금지식',
    '상속지식',
  ];

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='교육영상' />
      </div>

      <div className='mt-20 border-b-2'>
        <SubjectButtons
          subjects={subjects}
          onSubjectClick={subClick}
          subjectBtnColor={selectSubject}
        />
      </div>

      {/* 이제 여기다가 유미누나 api 참고해서 영상 불러오는거 만들기 */}

      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default EducationVideo;
