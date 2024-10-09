import Button from '@/components/common/buttons/Button';
import TextBubble from '@/components/common/TextBubble';
import MainWrapper from '@/components/layouts/MainWrapper';
import TopBar from '@/components/layouts/TopBar';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { getMissionsClearStatus } from '@/services/mission';
import NoModal from '@/components/modals/NoModal';
import TitleText from '@/components/common/TitleText';

interface Mission {
  isCleared: boolean;
}

const EducationCertificate = () => {
  const navigate = useNavigate();
  const [clearedMissions, setClearedMissions] = useState(0);
  const [remainingMissions, setRemainingMissions] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 모든 미션 클리어 확인하는 api 부르기
    const fetchMissionsStatus = async () => {
      try {
        const response = await getMissionsClearStatus();
        const completedMissions = response.result.filter(
          (mission: Mission) => mission.isCleared,
        ).length;
        const incompleteMissions = response.result.filter(
          (mission: Mission) => !mission.isCleared,
        ).length;

        setClearedMissions(completedMissions); // true 미션 개수
        setRemainingMissions(incompleteMissions); // false 미션 개수
      } catch (error) {
        console.error('getMissionsClearStatus 에러', error);
      }
    };

    fetchMissionsStatus();
  }, []);

  const GoNext = () => {
    if (clearedMissions === 7) {
      // 개발테스트 할 때는 이거 7 대신 자기 미션 완료 개수로 바꾸면 다음 페이지 볼 수 있음
      navigate('/education/writing');
    } else {
      setIsModalOpen(true);
    }
  };

  const GoEdu = () => {
    navigate('/education');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <TopBar title='교육 이수증' onXButtonClick={GoEdu} />
      <MainWrapper>
        <TitleText>
          스탬프를 다 모았다면 <br /> 이수증을 발급해봐요!{' '}
        </TitleText>
        <div className='ml-4'>
          <TextBubble
            content={[
              '스탬프 7개를 모두 모으면',
              '이수증을 발급할 수 있습니다.',
              `현재 모은 스탬프는 ${clearedMissions}개입니다.`,
              `스탬프 ${remainingMissions}개를 더 모아야합니다.`,
            ]}
            tailPosition='right'
            textPosition='left'
            bubbleSize='w-[340px]'
          />
        </div>

        <div className=''>
          <img
            src='/assets/images/certi_pig.png'
            alt='Cer_Pig'
            className='ml-20 mt-8 h-60 w-60'
          />
        </div>

        <div className='mt-4 p-4'>
          <Button
            label='이수증 발급하기'
            className='mb-4 py-4'
            onClick={() => GoNext()}
          />
        </div>

        <NoModal
          isOpen={isModalOpen}
          ModalClose={closeModal}
          imageSrc='/assets/icons/warning.png'
          title='스탬프가 부족해요!'
          description='스탬프 7개를 모두 모아야합니다.'
        />
      </MainWrapper>
    </div>
  );
};

export default EducationCertificate;
