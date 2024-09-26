import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import BigModal from '@/components/modals/Big_Modal';
import CheckButton from '@/components/common/buttons/CheckButton';
import NoModal from '@/components/modals/No_Modal';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import { useEffect, useState } from 'react';
import TopBar from '@/components/layouts/TopBar';

const SavingsAgree = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [agree1, setAgree1] = useState<string>('');
  const [agree2, setAgree2] = useState<string>('');
  const [agree3, setAgree3] = useState<string>('');
  const [agree4, setAgree4] = useState<string>('');

  useEffect(() => {
    setIsModalOpen(false);
    setWarningModal(false);
    setAgree1('');
    setAgree2('');
    setAgree3('');
  }, [setIsModalOpen, setWarningModal, setAgree1, setAgree2, setAgree3]);

  const navigate = useNavigate();

  const OpenModal = () => {
    if (
      agree1 === 'yes' &&
      agree2 === 'yes' &&
      agree3 === 'yes' &&
      agree4 === 'yes'
    ) {
      setIsModalOpen(true);
    } else {
      setWarningModal(true);
    }
  };

  const GoBack = () => {
    navigate(-1);
  };

  const ModalConfirm = () => {
    setIsModalOpen(false);
    navigate('/savings/signup');
  };

  const ModalClose = () => {
    setIsModalOpen(false);
    setWarningModal(false);
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='적금 가입' />
      </div>

      <div className='mb-6 mt-20'>
        <LevelBar currentLevel={1} totalLevel={5} />
      </div>

      <div className='m-4'>
        <p className='mb-2 text-2xl font-bold'>개인정보 수집 및 이용 동의서</p>
        <div className='mb-2 border-2 border-black'>
          <p className='mb-1 ml-1 mt-1'>
            본인은 본 서비스 이용과 관련하여 개인정보(이름, 연락처, 주민번호)가
            수집 및 이용됨을 확인하였으며, 금융 서비스 제공을 위해 해당 정보가
            필요한 범위 내에서 사용되는 것에 동의합니다. 또한, 개인정보의 처리와
            관련된 세부 사항은 개인정보 처리방침을 통해 확인하였습니다.
          </p>
        </div>
        <div className='flex justify-end'>
          <CheckButton
            name='agree1'
            selected={agree1}
            setSelected={setAgree1}
          />
        </div>
      </div>

      <div className='m-4 mt-4'>
        <p className='mb-2 text-2xl font-bold'>전자금융거래 이용 약관 동의서</p>
        <div className='mb-2 border-2 border-black'>
          <p className='mb-1 ml-1 mt-1'>
            본인은 인터넷뱅킹, 모바일뱅킹 등 전자금융거래 서비스의 이용 약관을
            충분히 이해하였으며, 관련된 이용 조건과 책임 사항에 동의합니다. 본
            서비스 이용 중 발생할 수 있는 모든 전자 금융 거래는 본 약관에 따라
            처리됩니다.
          </p>
        </div>
        <div className='flex justify-end'>
          <CheckButton
            name='agree2'
            selected={agree2}
            setSelected={setAgree2}
          />
        </div>
      </div>

      <div className='m-4 mt-4'>
        <p className='mb-2 text-2xl font-bold'>금융거래 정보 제공 동의서</p>
        <div className='mb-2 border-2 border-black'>
          <p className='mb-1 ml-1 mt-1'>
            본인은 금융 거래와 관련된 정보(계좌번호, 거래 내역 등)가
            신용정보기관 및 관련 기관에 제공될 수 있음을 확인하였으며, 이에
            동의합니다. 제공된 정보는 본인의 신용 상태를 평가하거나 금융
            서비스를 개선하는 데 사용될 수 있습니다.
          </p>
        </div>
        <div className='flex justify-end'>
          <CheckButton
            name='agree3'
            selected={agree3}
            setSelected={setAgree3}
          />
        </div>
      </div>
      <div className='m-4 mt-4'>
        <p className='mb-2 text-2xl font-bold'>자동이체 신청 및 동의서</p>
        <div className='mb-2 border-2 border-black'>
          <p className='mb-1 ml-1 mt-1'>
            본인은 예금 납입을 위한 자동이체 서비스 신청에 동의하며, 지정된
            날짜에 자동으로 계좌에서 해당 금액이 출금되는 것에 동의합니다.
            자동이체와 관련된 변경 사항은 사전에 통지되며, 언제든지 변경 및
            해지가 가능합니다.
          </p>
        </div>
        <div className='flex justify-end'>
          <CheckButton
            name='agree3'
            selected={agree4}
            setSelected={setAgree4}
          />
        </div>
      </div>

      <div className='mb-2 flex w-full items-center justify-center p-4'>
        <Button
          label='이전'
          size='medium'
          color='orange'
          onClick={() => GoBack()}
          className='mr-2'
        />
        <Button
          label='다음'
          size='medium'
          color='orange'
          onClick={() => OpenModal()}
          className='ml-2'
        />
      </div>

      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
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

export default SavingsAgree;
