import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import TopBar from '@/components/layouts/TopBar';
import TextBubble from '@/components/common/TextBubble';
import MainWrapper from '@/components/layouts/MainWrapper';
import { isTransferMissionProgressingAtom } from '@/atoms/account/accountTransferAtoms';

const AccountOpenMission = () => {
  const navigate = useNavigate();
  const [, setIsMissionProgressing] = useAtom(isTransferMissionProgressingAtom)

  const GoExplain = () => {
    setIsMissionProgressing(true)
    navigate('/account/transfer/account-info');
  };

  return (
    <div className='flex min-h-screen flex-col bg-yellow-100'>
      <TopBar title='계좌 이체' />
      <MainWrapper className='flex flex-col items-center justify-center'>
        <TextBubble
          bubbleSize='w-11/12'
          content={
            <>
              <p className='text-4xl font-bold'>3단계 미션</p> <br />
              <p className='text-2xl'>
                이수자 할아버지는 <br /> 손주에게 용돈을 <br />
                보내 주려고 합니다. <br />
                <br />
                이번 달 용돈 <br />
                <span className='text-bold text-primary'>50,000원</span> 을
                <br />
                손주의 계좌로 <br />
                보내야 합니다.
              </p>
              <br />
              <p className='text-4xl font-bold'>
                계좌 이체를 <br />
                해봅시다.
              </p>
              <div className='mx-6'>
                <Button
                  label='계좌 이체하러 가기'
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
