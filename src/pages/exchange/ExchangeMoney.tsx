import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '@/components/common/buttons/Button';
import LevelBar from '@/components/common/LevelBar';
import TopBar from '@/components/layouts/TopBar';
import { Input } from '@/components/common/Input';
import Keypad from '@/components/common/KeyPad';
import ExchangeConfirm from '@/components/exchange/ExchangeConfirm';
import { useAtom, useAtomValue } from 'jotai';
import {
  exchangeAmountAtom,
  exchangeKrwAmountAtom,
  exchangeMissionAtom,
} from '@/atoms/exchangeAtoms';
import { getExchangeRate } from '@/services/exchange';
import ErrorText from '@/components/common/ErrorText';
import TitleText from '@/components/common/TitleText';
import MainWrapper from '@/components/layouts/MainWrapper';

const ExchangeMoney = () => {
  const navigate = useNavigate();
  const [usdAmount, setUsdAmount] = useAtom(exchangeAmountAtom);
  const [krwAmount, setKrwAmount] = useAtom(exchangeKrwAmountAtom);
  const [keyOpen, setKeyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<
    'USD' | 'KRW' | null
  >(null);
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const isMission = useAtomValue(exchangeMissionAtom);

  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [error, setError] = useState('');

  const GoBack = () => {
    navigate(-1);
  };

  const OpenModal = () => {
    // 10달러 미만일 경우
    if (parseFloat(usdAmount) < 100 || usdAmount === '') {
      setError('100달러 이상부터 환전 가능합니다.');
      return;
    }

    if (isMission && parseFloat(usdAmount) !== 150) {
      setError('150달러를 환전해야 합니다.');
      return;
    }
    setIsBottomOpen(true);
  };

  const CloseModal = () => {
    setIsBottomOpen(false);
  };

  useEffect(() => {
    if (selectedCurrency === 'USD') {
      const usd = parseFloat(usdAmount) || 0;
      setKrwAmount((usd * exchangeRate).toFixed(0));
    } else if (selectedCurrency === 'KRW') {
      const krw = parseFloat(krwAmount) || 0;
      setUsdAmount((krw / exchangeRate).toFixed(2));
    }
  }, [usdAmount, setUsdAmount, krwAmount, selectedCurrency]);

  const keyClick = (num: string) => {
    if (selectedCurrency === 'USD') {
      setUsdAmount((prev) => prev + num);
    } else if (selectedCurrency === 'KRW') {
      setKrwAmount((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    if (selectedCurrency === 'USD') {
      setUsdAmount((prev) => prev.slice(0, -1));
    } else if (selectedCurrency === 'KRW') {
      setKrwAmount((prev) => prev.slice(0, -1));
    }
  };

  const handleConfirmExchange = () => {
    // 환전 확인
    setIsBottomOpen(false);
    navigate('/exchange/account', { state: { krwAmount } });
  };

  const fetchUSDRate = async () => {
    try {
      const response = await getExchangeRate('USD');

      const rawExchangeRate = response.data?.result?.exchangeRate;

      setExchangeRate(parseFloat(rawExchangeRate.replace(/,/g, '')));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUSDRate();
  }, []);

  return (
    <div>
      <TopBar title='환전' />
      <MainWrapper>
        <LevelBar currentLevel={2} totalLevel={4} />
        <div>
          <TitleText>얼마를 환전하시나요?</TitleText>
          <Input
            label='미국 USD'
            value={Number(usdAmount).toLocaleString()}
            onClick={() => {
              setKeyOpen(true);
              setSelectedCurrency('USD');
            }}
            inputMode='none'
            isError={error !== ''}
            onChange={(e) => {
              setUsdAmount(e.target.value);
              setError('');
            }}
          />
          {error && <ErrorText>{error}</ErrorText>}
          <div className='my-6 flex justify-center'>
            <div className='w-fit rounded-full border-2 border-primary p-2 text-primary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={3}
                stroke='currentColor'
                className='size-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4.499 8.248h15m-15 7.501h15'
                />
              </svg>
            </div>
          </div>

          <Input
            label='한국 KRW'
            value={Number(krwAmount).toLocaleString()}
            onClick={() => {
              setKeyOpen(true);
              setSelectedCurrency('KRW');
            }}
            isError={error !== ''}
            onChange={(e) => {
              setKrwAmount(e.target.value);
              setError('');
            }}
            className='mb-5'
            inputMode='none'
          />
        </div>

        <div className='mt-6 rounded-lg bg-gray-100 p-4'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>예상 환율</span>
            <span className='font-semibold'>1 달러 = {exchangeRate}원</span>
          </div>
          <div className='mt-2 flex justify-between'>
            <span className='text-gray-600'>원화 예상 금액</span>
            <span className='font-semibold'>
              {Number(krwAmount).toLocaleString()}원
            </span>
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
      </MainWrapper>
      {keyOpen && (
        <Keypad
          onNumberClick={keyClick}
          onDeleteClick={handleDelete}
          onConfirmClick={() => setKeyOpen(false)}
        />
      )}

      {isBottomOpen && (
        <ExchangeConfirm
          usdAmount={usdAmount}
          krwAmount={krwAmount}
          onConfirm={handleConfirmExchange}
          onCancel={CloseModal}
          isOpen={isBottomOpen}
        />
      )}
    </div>
  );
};

export default ExchangeMoney;
