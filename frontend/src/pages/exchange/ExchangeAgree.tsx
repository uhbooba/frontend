import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '@/components/common/buttons/Button';
import BigModal from '@/components/modals/BigModal';
import CheckButton from '@/components/common/buttons/CheckButton';
import NoModal from '@/components/modals/NoModal';
import LevelBar from '@/components/common/LevelBar';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';

const ExchangeAgree = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [agree1, setAgree1] = useState('');

  useEffect(() => {
    setIsModalOpen(false);
    setWarningModal(false);
    setAgree1('');
  }, []);

  const navigate = useNavigate();

  const OpenModal = () => {
    if (agree1 === 'yes') {
      setIsModalOpen(true);
    } else {
      setWarningModal(true);
    }
  };

  const ModalConfirm = () => {
    setIsModalOpen(false);
    navigate('/exchange/money');
  };

  const ModalClose = () => {
    setIsModalOpen(false);
    setWarningModal(false);
  };

  return (
    <div>
      <TopBar title='환전' />
      <MainWrapper>
        <LevelBar currentLevel={1} totalLevel={4} />
        <div className='m-4'>
          <p className='mb-2 text-2xl font-bold'>약관 동의서</p>
          <div className='mb-2 border-2 border-black'>
            <p className='mb-1 mt-1'>개인정보 수집 및 이용 동의하세요?</p>
            <p className='mb-1'>개인정보 수집 및 이용 동의하세요?</p>
            <p className='mb-1'>개인정보 수집 및 이용 동의하세요?</p>
            <p className='mb-1'>개인정보 수집 및 이용 동의하세요?</p>
          </div>
          <div className='flex justify-end'>
            <CheckButton
              name='agree1'
              selected={agree1}
              setSelected={setAgree1}
            />
          </div>
        </div>

        <div className='mb-2 flex w-full items-center justify-center p-4'>
          <Button
            label='다음'
            size='medium'
            color='orange'
            onClick={() => OpenModal()}
            className='ml-2'
          />
        </div>
      </MainWrapper>
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

      <NoModal
        isOpen={warningModal}
        ModalClose={ModalClose}
        imageSrc='/assets/icons/warning.png'
        title={
          <>
            모든 항목에 <br /> 동의해야 합니다.
          </>
        }
        description={
          <>
            모든 동의하셔야지 다음 단계로 <br /> 넘어갈 수 있습니다.
          </>
        }
      />
    </div>
  );
};

export default ExchangeAgree;
