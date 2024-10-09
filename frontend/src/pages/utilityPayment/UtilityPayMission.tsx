import { useNavigate } from 'react-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { utilityMissionAtom } from '@/atoms/utilityAtoms';
import Button from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import TextBubble from '@/components/common/TextBubble';
import MainWrapper from '@/components/layouts/MainWrapper';

const UtilityPayMission = () => {
  const navigate = useNavigate();
  const setIsMission = useSetAtom(utilityMissionAtom);

  useEffect(() => {
    // 페이지에 들어오면 미션 상태 true
    setIsMission(true);
  }, []);

  const GoExplain = () => {
    navigate('/utility/explain');
  };

  return (
    <div className='bg-yellow-100'>
      <TopBar title='공과금 납부' />
      <MainWrapper>
        <div className='flex flex-col items-center justify-center'>
          <TextBubble
            bubbleSize='w-11/12'
            content={
              <>
                <p className='text-4xl font-bold'>6단계 미션</p> <br />
                <p className='text-2xl'>
                  이수자 할아버지는 <br />
                  이번 달 전기 요금을 <br />
                  은행에 갈 필요 없이 <br />
                  모바일로 요금을 <br />
                  납부하려고 합니다.
                </p>
                <br />
                <p className='text-4xl font-bold'>
                  전기 요금을 <br />
                  납부하세요!
                </p>
                <div className='ml-8 mr-8'>
                  <Button
                    label='납부하러가기'
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
            />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default UtilityPayMission;
