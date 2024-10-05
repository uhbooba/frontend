import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import NoModal from '@/components/modals/NoModal';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import {
  selectAccountAtom,
  withdrawalAccountAtom,
} from '@/atoms/deposit/depositDataAtoms';
import { useEffect, useState } from 'react';
import TopBar from '@/components/layouts/TopBar';
import { getUserFreeAccount } from '@/services/account';
import { DepositAccountDetail } from '@/types/deposit';

const DepositAccount = () => {
  const navigate = useNavigate();
  const [selectAccount, setSelectAccount] = useAtom(selectAccountAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountDetails, setAccountDetails] =
    useState<DepositAccountDetail | null>(null);
  const [, setWithdrawalAccount] = useAtom(withdrawalAccountAtom);

  useEffect(() => {
    setSelectAccount(null);
    setIsModalOpen(false);

    const fetchAccountDetails = async () => {
      try {
        const response = await getUserFreeAccount();
        // console.log('리스폰 확인', response);
        // console.log(response.data.result);
        const account = response.data.result;
        if (account) {
          setAccountDetails(account);
          // console.log('저장한 계좌번호 확인', account);
          // console.log(accountDetails?.balance);
        } else {
          console.error('계좌가 없으요');
        }
      } catch (error) {
        console.error('에러났어', error);
      }
    };

    fetchAccountDetails();
  }, [setSelectAccount, setIsModalOpen]);

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    if (selectAccount === null) {
      setIsModalOpen(true);
    } else {
      navigate('/deposit/product');
    }
  };

  const accountClick = () => {
    if (accountDetails) {
      setSelectAccount(0);
      setWithdrawalAccount(accountDetails);
      // console.log('저장한 계좌번호 확인2', accountDetails.accountNo);
    }
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

      {accountDetails ? (
        <div
          onClick={accountClick}
          className={clsx(
            'm-4 cursor-pointer rounded-lg border-2 p-4',
            selectAccount === 0
              ? 'border-blue-400 text-blue-400'
              : 'border-gray-200',
          )}
        >
          <div className='text-base font-bold'>
            {accountDetails.accountName}
          </div>
          <div className='text-sm text-gray-500'>
            {accountDetails.accountNo}
          </div>
          <div className='mt-2 text-right'>
            <span className='mr-6 text-gray-400'>출금가능금액</span>
            <span className='font-bold text-black'>
              {accountDetails.balance
                ? `${accountDetails.balance.toLocaleString()} 원`
                : '정보없음'}
            </span>
          </div>
        </div>
      ) : (
        // 일단 api 못받아오면 하드코딩 뜨게 했음 아랫부분
        <div
          onClick={accountClick}
          className={clsx(
            'm-4 cursor-pointer rounded-lg border-2 p-4',
            selectAccount === 0
              ? 'border-blue-400 text-blue-400'
              : 'border-gray-200',
          )}
        >
          <div className='text-base font-bold'>자유입출금 계좌 1</div>
          <div className='text-sm text-gray-500'>183-217-673215</div>
          <div className='mt-2 text-right'>
            <span className='mr-6 text-gray-400'>출금가능금액</span>
            <span className='font-bold text-black'>100,000,000 원</span>
          </div>
        </div>
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

export default DepositAccount;
