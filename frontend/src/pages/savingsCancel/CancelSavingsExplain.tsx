import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';
import { getUserSavingsAccounts } from '@/services/saving';
import { useState } from 'react';
import NoModal from '@/components/modals/NoModal';

const CancelSavingsExplain = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const GoNext = () => {
    navigate('/cancel/savings/product');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const cancelSavings = async () => {
    try {
      // 적금 계좌 목록 조회
      const response = await getUserSavingsAccounts();
      if (!response?.data?.result || response.data.result.length === 0) {
        // 예금 계좌가 없으면 모달을 열리기
        setIsModalOpen(true);
      } else {
        // 적금 계좌가 있으면 원래대로 다음 페이지로 이동
        GoNext();
      }
    } catch (error) {
      console.error('getUserSavingsAccounts 에러:', error);
    }
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='적금 중도해지' />
      </div>

      <div className='mt-16 flex-grow overflow-y-auto px-4'>
        <div className='mt-8 text-center'>
          <p className='text-3xl font-bold'>적금 중도해지</p>
        </div>
        <div className='mt-4 text-lg font-bold'>
          <p>적금 중도해지는 정해진 기간이 끝나기 전에</p>
          <p className='mb-4'>적금을 해지하는 것입니다.</p>
          <p>중도해지 하는 경우에는 처음 정한 이자가 아닌</p>
          <p className='mb-4'>중도해지 이자율이 따로 적용됩니다.</p>
          <p>중도해지 이자율은 보통 매우 낮은 편으로</p>
          <span className='text-yellow-400'>이자 손실이 매우 큽니다.</span>
          <p className='mt-4'>갑작스러운 큰 돈이 필요한 경우가 아니라면</p>
          <p>정해진 기간(만기)까지 유지하는 게 유리합니다.</p>
        </div>

        {/* 말풍선 부분 */}
        <div className='relative ml-24 mt-4 w-[230px]'>
          <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-4 font-bold'>
            <p className='text-start text-lg text-black'>
              중도해지를 하면 이자가
            </p>
            <p className='text-start text-lg text-black'>많이 줄어듭니다.</p>
            <p className='text-start text-lg text-black'>
              정말 해지하실건가요?
            </p>

            {/* 말풍선 꼬리 */}
            <div className='absolute bottom-[-22px] left-[15%] -translate-x-1/2 transform'>
              <div className='h-0 w-0 border-l-[2px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300'></div>
              <div className='absolute left-[50%] top-[-1px] h-0 w-0 -translate-x-1/2 transform border-l-[2px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100'></div>
            </div>
          </div>
        </div>

        <div className='mt-4 flex flex-col items-center'>
          {/* 돼지 이미지 */}
          <img
            src='/assets/images/sad_pig.png'
            alt='Pig'
            className='mr-32 h-56 w-56'
          />

          {/* 버튼 */}
          <div className='w-full items-center justify-center p-4'>
            <Button
              label='중도해지 하러가기'
              size='large'
              color='orange'
              onClick={cancelSavings}
              className='w-full'
            />
          </div>
        </div>
      </div>

      {/* 바텀탭 */}
      <div className='fixed bottom-0 w-full'>
        <BottomTab />
      </div>

      <NoModal
        isOpen={isModalOpen}
        ModalClose={closeModal}
        title='중도해지 불가능'
        description='현재 가입하신 적금이 없습니다.'
        imageSrc='/assets/icons/warning.png'
      />
    </div>
  );
};

export default CancelSavingsExplain;
