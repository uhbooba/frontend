import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '@/components/common/buttons/Button';
import LevelBar from '@/components/common/LevelBar';
import TopBar from '@/components/layouts/TopBar';
import { Input } from '@/components/common/Input';
import Keypad from '@/components/common/KeyPad';

const UtilityPayInfoInput = () => {
  const navigate = useNavigate();
  const [paymentNumber, setPaymentNumber] = useState('');
  const [keyOpen, setKeyOpen] = useState(false);

  const keyClick = (num: string) => {
    setPaymentNumber((prev) => prev + num);
  };

  const handleDelete = () => {
    setPaymentNumber((prev) => prev.slice(0, -1));
  };

  const goBack = () => {
    navigate(-1);
  };

  const openQRScan = () => {
    navigate('/utility/scan');
  };

  const goNext = () => {
    navigate('/utility/money');
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='공과금 납부' />
      </div>

      <div className='mb-6 mt-20'>
        <LevelBar currentLevel={1} totalLevel={3} />
      </div>

      <div className='m-4'>
        <div className='pb-4 pl-4 text-3xl font-bold'>
          <p>
            종이 고지서 속 <br /> 지로 번호를 <br /> 입력하시거나 <br />
            고지서의 QR 코드를 <br /> 촬영해주세요
          </p>
        </div>
        <Input
          label='전자 납부 번호'
          placeholder='전자 납부 번호 입력'
          value={paymentNumber}
          onClick={() => {
            setKeyOpen(true);
          }}
          onChange={(e) => setPaymentNumber(e.target.value)}
          className='mb-5'
          inputMode='none'
        />
        <div className='my-1 flex items-center justify-center'>
          <div
            className='m-4 flex w-48 flex-col items-center justify-center rounded-full border-2 border-primary px-2 py-4 text-center text-primary'
            onClick={openQRScan}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6 text-black'
            >
              <path d='M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z' />
              <path
                fillRule='evenodd'
                d='M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
                clipRule='evenodd'
              />
            </svg>
            <p className='text-black'>QR 코드 촬영</p>
          </div>
        </div>
      </div>

      {keyOpen && (
        <Keypad
          onNumberClick={keyClick}
          onDeleteClick={handleDelete}
          onConfirmClick={() => setKeyOpen(false)}
        />
      )}

      <div className='mb-2 flex w-full items-center justify-center p-4'>
        <Button
          label='이전'
          size='medium'
          color='orange'
          onClick={goBack}
          className='mr-2'
        />
        <Button
          label='다음'
          size='medium'
          color='orange'
          onClick={goNext}
          className='ml-2'
        />
      </div>
    </div>
  );
};

export default UtilityPayInfoInput;
