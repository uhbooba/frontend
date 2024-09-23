import BankButtons from '@/components/common/BankButtons';
import Button from '@/components/common/buttons/Button';
import SubjectButtons from '@/components/common/SubjectButtons';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';
import { useState } from 'react';

const EducationVideo = () => {
  const [vedioClick, setVideoClick] = useState(true);
  const [subjectClick, setSubjectClick] = useState(false);
  const [selectBank, setSelectBank] = useState('모두 보기');
  const [selectSubject, setSelectSubject] = useState('기초금융 상식');

  const OnVideo = () => {
    setVideoClick(true);
    setSubjectClick(false);
  };

  const OnSubject = () => {
    setVideoClick(false);
    setSubjectClick(true);
  };

  const bankClick = (bank: string) => {
    setSelectBank(bank);
  };

  const subClick = (subject: string) => {
    setSelectSubject(subject);
  };

  const banks = [
    '모두 보기',
    '우리은행',
    '신한은행',
    '농협은행',
    '국민은행',
    '하나은행',
  ];
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

      {/* 은행별 & 주제별 버튼 */}
      {/* 이 버튼에 클릭 여부에 따라 아래 목록 버튼이 바뀜 */}
      <div className='mt-16 flex justify-between border-b-2 p-4'>
        <Button
          label='은행별 영상'
          className={`mr-2 ${vedioClick ? 'opacity-100' : 'opacity-50'}`}
          onClick={OnVideo}
        />
        <Button
          label='주제별 영상'
          className={`mr-2 ${subjectClick ? 'opacity-100' : 'opacity-50'}`}
          onClick={OnSubject}
        />
      </div>

      {/* 은행 목록 버튼 */}
      {vedioClick && (
        <div className='border-b-2'>
          <BankButtons
            banks={banks}
            onBankClick={bankClick}
            bankBtnColor={selectBank}
          />
        </div>
      )}

      {/* 주제 목록 버튼 */}
      {subjectClick && (
        <div className='border-b-2'>
          <SubjectButtons
            subjects={subjects}
            onSubjectClick={subClick}
            subjectBtnColor={selectSubject}
          />
        </div>
      )}

      {/* 이제 여기다가 유미누나 api 참고해서 영상 불러오는거 만들기 */}

      {/* 바텀탭 */}
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default EducationVideo;
