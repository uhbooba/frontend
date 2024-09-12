import Button from '@/components/common/buttons/Button';
import BackButton from '@/components/common/buttons/BackButton';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import BigModal from '@/components/modals/Big_Modal';

const DepositAgree = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const GoBack = () => {
    navigate(-1);
  };

  const ModalConfirm = () => {
    setIsModalOpen(false);
    navigate('/deposit/money');
  };

  const ModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='bg-gray-400 text-center'>
        <span>여기는 휴대폰 상단 상태바</span>
      </div>

      {/* 상단바 */}
      <div className='flex items-center justify-between border-b-4 bg-white py-4'>
        <BackButton className='ml-4' />
        <span className='absolute left-1/2 -translate-x-1/2 transform text-xl font-bold'>
          예금 가입2 - 정보 동의 수락
        </span>
      </div>

      <div className='bg-gray-400 py-4 text-center'>단계표시바</div>

      <div className='mx-4 mt-8 flex justify-between space-x-4'>
        <Button
          label='이전'
          size='medium'
          color='orange'
          onClick={() => GoBack()}
        />
        <Button
          label='다음'
          size='medium'
          color='orange'
          onClick={() => OpenModal()}
        />
      </div>
      <BigModal
        isOpen={isModalOpen}
        ModalClose={ModalClose}
        GoNext={ModalConfirm}
        imageSrc='/assets/icons/warning.png'
        title='주의해야 합니다!'
        description={
          <>
            동의서를 꼼꼼하게 읽어보셨나요? <br />
            실제 은행 상품의 경우 더 많고 <br />
            복잡한 내용의 동의서들이 있습니다. <br />
            어렵고 길더라도 모두 꼼꼼하게 읽고 <br />
            확인한 다음에 동의하셔야합니다.
          </>
        }
      />
    </div>
  );
};

export default DepositAgree;
