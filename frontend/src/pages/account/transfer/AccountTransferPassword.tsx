import { useState } from 'react';
import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import NoModal from '@/components/modals/NoModal';
import { postUserFreeAccountTransfer } from '@/services/account';
import { useAtom } from 'jotai';
import {
  transactionBalanceAtom,
  depositAccountNoAtom,
  depositTransactionSummaryAtom,
  withdrawalAccountNoAtom,
  withdrawalTransactionSummaryAtom,
} from '@/atoms/account/accountTransferAtoms';

const AccountTransferPassword = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputKey, setInputKey] = useState(0);

  const [depositAccountNo] = useAtom(depositAccountNoAtom);
  const [depositTransactionSummary] = useAtom(depositTransactionSummaryAtom);
  const [transactionBalance] = useAtom(transactionBalanceAtom);
  const [withdrawalAccountNo] = useAtom(withdrawalAccountNoAtom);
  const [withdrawalTransactionSummary] = useAtom(
    withdrawalTransactionSummaryAtom,
  );

  const passwordComplete = async (password: string) => {
    try {
      // 이체 API 호출과 비밀번호 유효성 검사
      const response = await postUserFreeAccountTransfer(
        // 이체받을 계좌번호
        depositAccountNo,
        // 이체받을 계좌기록
        depositTransactionSummary,
        // 이체 금액
        transactionBalance,
        // 출금할 계좌 번호
        withdrawalAccountNo,
        // 출금할 계좌 기록
        withdrawalTransactionSummary,
        // 비밀번호
        password,
      );

      if (response?.data?.statusCode === 200) {
        navigate('/account/transfer/success');
      } else if (response?.data?.statusCode === 401) {
        // 비밀번호 오류 처리
        setIsModalOpen(true);
      } else {
        console.error('이체 오류 발생', response?.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('이체 요청 중 오류:', error);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputKey((prevKey) => prevKey + 1); // PasswordInput 컴포넌트 리렌더링
  };

  return (
    <div>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='계좌 이체' showXButton={false} />
      </div>

      <div className='mb-2 mt-20'>
        <LevelBar currentLevel={5} totalLevel={5} />
      </div>

      <PasswordInput key={inputKey} onComplete={passwordComplete} />

      <NoModal
        isOpen={isModalOpen}
        ModalClose={closeModal}
        imageSrc='/assets/icons/warning.png'
        title='비밀번호 오류'
        description='비밀번호가 틀립니다.'
      />
    </div>
  );
};

export default AccountTransferPassword;
