import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import NoModal from '@/components/modals/NoModal';
import { useEffect, useState } from 'react';
import TopBar from '@/components/layouts/TopBar';
import AccountSelection from '@/components/common/AccountSelection';
import { getUserFreeAccount } from '@/services/account';
import { DepositAccountDetail } from '@/types/deposit';
import TitleText from '@/components/common/TitleText';
import MainWrapper from '@/components/layouts/MainWrapper';
import { useAtomValue } from 'jotai';
import { utilityDataAtom } from '@/atoms/utilityAtoms';

const UtilityPayAccount = () => {
  const navigate = useNavigate();
  const [selectAccount, setSelectAccount] = useState('');
  const [account, setAccount] = useState<DepositAccountDetail>();
  const utilityData = useAtomValue(utilityDataAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    setSelectAccount('');
    setIsModalOpen(false);

    fetchAccountDetails();
  }, [setSelectAccount, setIsModalOpen]);

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    if (selectAccount === '') {
      setModalContent({
        title: '계좌 선택',
        description: '출금할 계좌를 선택해주세요.',
      });
      setIsModalOpen(true);
    } else if (account?.balance && utilityData.amount > account?.balance) {
      setModalContent({
        title: '잔액 부족',
        description: '계좌에 잔액이 부족합니다.',
      });
      setIsModalOpen(true);
    } else {
      navigate('/utility/password');
    }
  };

  const fetchAccountDetails = async () => {
    try {
      const response = await getUserFreeAccount();

      setAccount(response.data?.result);
    } catch (error) {
      console.error(error);
    }
  };

  const accountClick = (accountNo: string) => {
    setSelectAccount(accountNo);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <TopBar title='공과금 납부' />
      <MainWrapper>
        <LevelBar currentLevel={3} totalLevel={4} />
        <TitleText>어떤 계좌에서 출금할까요?</TitleText>

        <div className='mb-4 text-lg font-bold'>
          <span>출금계좌 선택</span>
        </div>
        {account && (
          <AccountSelection
            accountNo={account.accountNo}
            selectedAccount={selectAccount}
            onAccountClick={accountClick}
            accountName={account.accountName}
            balance={`${account.balance.toLocaleString()}원`}
          />
        )}
        <div className='mb-2 flex w-full items-center justify-center p-4'>
          <Button
            label='이전'
            size='medium'
            color='orange'
            onClick={GoBack}
            className='mr-2'
          />
          <Button
            label='다음'
            size='medium'
            color='orange'
            onClick={GoNext}
            className='ml-2'
          />
        </div>
        <NoModal
          isOpen={isModalOpen}
          ModalClose={closeModal}
          title={modalContent.title}
          description={modalContent.description}
          imageSrc='/assets/icons/warning.png'
        />
      </MainWrapper>
    </div>
  );
};

export default UtilityPayAccount;
