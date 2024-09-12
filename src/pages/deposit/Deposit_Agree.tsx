import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import BigModal from '@/components/modals/Big_Modal';
import TopBar from '@/components/layouts/TopBar';
import CheckButton from '@/components/common/buttons/CheckButton';
import NoModal from '@/components/modals/No_Modal';

const DepositAgree = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [agree1, setAgree1] = useState<string>('');
  const [agree2, setAgree2] = useState<string>('');
  const [agree3, setAgree3] = useState<string>('');

  const navigate = useNavigate();

  const OpenModal = () => {
    if (agree1 === 'yes' && agree2 === 'yes' && agree3 === 'yes') {
      setModalOpen(true);
    } else {
      setWarningModal(true);
    }
  };

  const GoBack = () => {
    navigate(-1);
  };

  const ModalConfirm = () => {
    setModalOpen(false);
    navigate('/deposit/signup');
  };

  const ModalClose = () => {
    setModalOpen(false);
    setWarningModal(false);
  };

  return (
    <div>
      {/* 상단바 */}
      <TopBar title='예금 가입1 - 정보 동의 수락' />

      <div className='mb-8 mt-4 bg-gray-400 py-4 text-center'>단계표시바</div>

      <div className='m-4 mt-6'>
        <p className='mb-2 text-2xl font-bold'>개인정보 수집 및 이용 동의서</p>
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

      <div className='m-4 mt-6'>
        <p className='mb-2 text-2xl font-bold'>개인정보 제3자 제공 동의서</p>
        <div className='mb-2 border-2 border-black'>
          <p className='mb-1 mt-1'>개인정보 제3자 제공 동의하세요?</p>
          <p className='mb-1'>개인정보 제3자 제공 동의하세요?</p>
          <p className='mb-1'>개인정보 제3자 제공 동의하세요?</p>
          <p className='mb-1'>개인정보 제3자 제공 동의하세요?</p>
        </div>
        <div className='flex justify-end'>
          <CheckButton
            name='agree2'
            selected={agree2}
            setSelected={setAgree2}
          />
        </div>
      </div>

      <div className='m-4 mt-6'>
        <p className='mb-2 text-2xl font-bold'>싸피은행 약관 동의서</p>
        <div className='mb-2 border-2 border-black'>
          <p className='mb-1 mt-1'>싸피은행 약관에 동의하세요?</p>
          <p className='mb-1'>싸피은행 약관에 동의하세요?</p>
          <p className='mb-1'>싸피은행 약관에 동의하세요?</p>
          <p className='mb-1'>싸피은행 약관에 동의하세요?</p>
        </div>
        <div className='flex justify-end'>
          <CheckButton
            name='agree3'
            selected={agree3}
            setSelected={setAgree3}
          />
        </div>
      </div>

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
        isOpen={modalOpen}
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

export default DepositAgree;
