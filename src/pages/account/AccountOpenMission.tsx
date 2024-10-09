import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import TextBubble from '@/components/common/TextBubble';
import MainWrapper from '@/components/layouts/MainWrapper';
import { exchangeMissionAtom } from '@/atoms/exchangeAtoms';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

const AccountOpenMission = () => {
  const navigate = useNavigate();
  const setIsMission = useSetAtom(exchangeMissionAtom);

  useEffect(() => {
    // 페이지에 들어오면 미션 상태 true
    setIsMission(true);
  }, []);

  const GoExplain = () => {
    navigate('/account/products');
  };

  return (
    <div className='flex min-h-screen flex-col bg-yellow-100'>
      <TopBar title='계좌 개설' />
      <MainWrapper className='flex flex-col items-center justify-center'>
        <TextBubble
          bubbleSize='w-11/12'
          content={
            <>
              <p className='text-4xl font-bold'>2단계 미션</p> <br />
              <p className='text-2xl'>
                이수자 할아버지는 <br /> 경로당에서 사용할 <br />
                새 계좌를 만들려고 합니다. <br />
                <br />
                경로당 모임비를 따로 <br />
                관리하기 위한 <br />
                <span className='text-bold text-primary'>수시 입출금</span>{' '}
                계좌가 <br />
                필요합니다.
              </p>
              <br />
              <p className='text-4xl font-bold'>
                수시 입출금 계좌를 <br />
                만드세요!
              </p>
              <div className='ml-8 mr-8'>
                <Button
                  label='계좌 만들러 가기'
                  size='small'
                  color='orange'
                  onClick={() => GoExplain()}
                  className='mt-4'
                />
              </div>
            </>
          }
        />
        <div className='flex items-center justify-center'>
          <img
            src='/assets/images/pig.png'
            alt='Pig'
            className='mt-4 h-56 w-56'
            loading='lazy'
          />
        </div>
      </MainWrapper>
    </div>
  );
};

export default AccountOpenMission;
