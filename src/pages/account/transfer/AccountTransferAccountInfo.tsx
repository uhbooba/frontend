import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import { useNavigate, useLocation } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import TopBar from '@/components/layouts/TopBar';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  depositAccountNoAtom,
  selectedBankAtom,
  withdrawalTransactionSummaryAtom,
} from '@/atoms/account/accountTransferAtoms';
import { getFreeAcountHolder } from '@/services/account';

const AccountTransferAccountInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useAtom(selectedBankAtom);
  const [depositAccountNo, setDepositAccountNo] = useAtom(depositAccountNoAtom);
  const [, setDepositUsername] = useAtom(withdrawalTransactionSummaryAtom);

  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태

  useEffect(() => {
    if (location.state !== 'back-navigation') {
      setDepositAccountNo('');
      setSelectedBank('');
      setErrorMessage('');
    }
  }, [location.state, setDepositAccountNo, setSelectedBank]);

  const GoBack = () => {
    navigate(-1);
  };

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank);
    setModalOpen(false);
  };

  interface AccountHolderResponse {
    username: string;
    accountNo: string;
    accountName: string;
    accountTypeCode: string;
    accountTypeName: string;
    balance: number;
  }

  const handleSubmit = (accountNo: string) => {
    if (!depositAccountNo || !selectedBank) {
      setErrorMessage('계좌번호와 은행을 선택해 주세요.');
      return;
    }

    const fetchHolderInfo = async (accountNo: string) => {
      try {
        const response = await getFreeAcountHolder(accountNo);

        // API 응답 상태 코드에 따라 처리
        if (response.data.statusCode === 200) {
          const { username } = response.data.result as AccountHolderResponse;
          setDepositUsername(username);
          navigate('/account/transfer/amount'); // 계좌 확인 후 다음 페이지로 이동
        } else {
          // 400 또는 404 등 오류 상태 코드 처리
          setErrorMessage(
            response.data.message || '계좌 정보를 불러오지 못했습니다.',
          );
        }
      } catch (error) {
        console.error('계좌 정보 API 호출 중 오류 발생:', error);

        // 에러 메시지 설정
        setErrorMessage('계좌 정보를 불러오지 못했습니다. 다시 시도해 주세요.');
      }
    };

    fetchHolderInfo(accountNo);
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 16) {
      setDepositAccountNo(value);
      setErrorMessage(''); // 입력이 올바르면 에러 메시지 초기화
    } else if (value.length > 16) {
      setErrorMessage('계좌번호는 최대 16자리까지 입력 가능합니다.'); // 에러 메시지 설정
    }
  };

  return (
    <div className='flex h-screen flex-col'>
      <div className='w-full'>
        <TopBar title='계좌 이체' showXButton={false} />
      </div>

      <div className='mt-4'>
        <LevelBar currentLevel={1} totalLevel={5} />
      </div>

      <div className='ml-4 mr-4 mt-6'>
        <Input
          label='계좌번호'
          variant='full'
          placeholder='계좌번호를 입력해 주세요.'
          value={depositAccountNo}
          onChange={handleAccountNumberChange}
          className={errorMessage ? 'border-red-500' : ''} // 에러 시 테두리 빨간색
        />
        {errorMessage && (
          <div className='mt-1 text-sm text-red-500'>{errorMessage}</div> // 경고 문구
        )}

        <div className='relative mt-4'>
          <Button
            label={selectedBank || '은행 선택'}
            size='medium'
            color='orange'
            onClick={() => setModalOpen(true)}
          />

          {modalOpen && (
            <div className='absolute z-10 w-full rounded border border-gray-300 bg-white shadow-lg'>
              <ul className='max-h4-48 overflow-auto'>
                {['싸피은행'].map((bank) => (
                  <li
                    key={bank}
                    className='cursor-pointer px-4 py-2 hover:bg-gray-100'
                    onClick={() => handleBankSelect(bank)}
                  >
                    {bank}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className='mt-[30vh] w-full'>
          <div className='flex w-full justify-between space-x-4 px-4 pb-4'>
            <Button
              label='이전'
              size='large'
              color='orange'
              className='flex-grow'
              onClick={() => GoBack()}
            />
            <Button
              label='다음'
              size='medium'
              color='orange'
              className='flex-grow'
              onClick={() => handleSubmit(depositAccountNo)}
            />
          </div>

          <div className='fixed bottom-0 left-0 w-full'>
            <BottomTab />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTransferAccountInfo;
