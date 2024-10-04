import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import NoModal from '@/components/modals/NoModal';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import TopBar from '@/components/layouts/TopBar';
import { accountNoAtom } from '@/atoms/exchangeAtoms';
import AccountSelection from '@/components/common/AccountSelection';
import { getUserFreeAccount } from '@/services/account';
import { AccountDetail } from '@/types/deposit';

const ExchangeAccount = () => {
  const navigate = useNavigate();
  const [selectAccount, setSelectAccount] = useAtom(accountNoAtom);
  const [account, setAccount] = useState<AccountDetail>();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(true);
    } else {
      navigate('/exchange/password');
    }
  };

  const fetchAccountDetails = async () => {
    try {
      const response = await getUserFreeAccount();

      setAccount(response.data?.result);
    } catch (error) {
      console.error('에러났어', error);
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
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='예금 가입' />
      </div>

      <div className='mb-12 mt-20'>
        <LevelBar currentLevel={3} totalLevel={5} />
      </div>

      <div className='pb-4 pl-4 text-2xl font-bold'>
        <span>어떤 계좌에서 출금할까요?</span>
      </div>

      <div className='mt-4 pb-4 pl-4 text-lg font-bold'>
        <span>출금계좌 선택</span>
      </div>
      {account && (
        <AccountSelection
          accountNo={account.accountNo}
          selectedAccount={selectAccount}
          onAccountClick={accountClick}
          accountName={account.accountName}
          balance='100,000,000 원'
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

      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>

      <NoModal
        isOpen={isModalOpen}
        ModalClose={closeModal}
        title='계좌 선택'
        description='출금할 계좌를 선택해주세요.'
        imageSrc='/assets/icons/warning.png'
      />
    </div>
  );
};

export default ExchangeAccount;
