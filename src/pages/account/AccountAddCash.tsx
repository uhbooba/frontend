import { useEffect, useState } from 'react';
import Button, { ButtonConfigType } from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { postUserFreeAccountAddCash } from '@/services/account';
import { getUserFreeAccount } from '@/services/account';
import MainWrapper from '@/components/layouts/MainWrapper';

const AddCash = () => {
  const navigate = useNavigate();

  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [accountNo, setAccountNo] = useState('');

  const handleButtonClick = (index: number, amount: number) => {
    setSelectedButton(index);
    setSelectedAmount(amount);
  };

  const handleNextStep = (
    accountNo: string,
    transactionBalance: number,
    transactionSummary: string,
  ) => {
    if (selectedButton !== null) {
      const addCash = () => {
        try {
          postUserFreeAccountAddCash(
            accountNo,
            transactionBalance,
            transactionSummary,
          );
        } catch (error) {
          console.error('Error fetching answer:', error);
        }
      };
      addCash();
      const route = '/account/check';
      setTimeout(() => {
        navigate(route);
      }, 100);
    }
  };

  useEffect(() => {
    const fetchAccountNumber = async () => {
      try {
        const response = await getUserFreeAccount();
        if (response?.data?.result) {
          const account = response.data.result;
          setAccountNo(account.accountNo);
        }
      } catch (error) {
        console.error('계좌 정보 API 호출 중 오류 발생:', error);
      }
    };

    fetchAccountNumber();
  });

  const ButtonConfig: ButtonConfigType[] = [
    {
      label: '100,000원',
      amount: 100000,
      route: '',
      size: 'large',
      color: 'lightOrange',
      className: 'my-[2vh] flex-grow',
    },
    {
      label: '300,000원',
      amount: 300000,
      route: '',
      size: 'large',
      color: 'lightOrange',
      className: 'my-[2vh] flex-grow',
    },
    {
      label: '500,000원',
      amount: 500000,
      route: '',
      size: 'large',
      color: 'lightOrange',
      className: 'my-[2vh] flex-grow',
    },
    {
      label: '1,000,000원',
      amount: 1000000,
      route: '',
      size: 'large',
      color: 'lightOrange',
      className: 'my-[2vh] flex-grow',
    },
  ];

  return (
    <div className=''>
      {/* 상단바 */}
      <TopBar title='계좌 입금' />
      {/* space-x-4 p-4 */}
      <MainWrapper>
        <div className='mx-16 mt-[1vh]'>
          {ButtonConfig.map((button, index) => (
            <Button
              key={index}
              label={button.label}
              size={button.size}
              color={selectedButton === index ? 'red' : button.color}
              onClick={() => handleButtonClick(index, button.amount!)}
              className={button.className}
            />
          ))}
        </div>
        <div className='mt-[6vh] flex justify-center p-4'>
          <Button
            label='입금 하기'
            onClick={() =>
              handleNextStep(accountNo, selectedAmount!, '싸피 은행')
            }
            className='w-full max-w-[calc(100%-60px)]'
            disabled={selectedButton === null}
          />
        </div>
      </MainWrapper>
    </div>
  );
};

export default AddCash;
