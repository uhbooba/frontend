import { useState } from 'react';
import Button, { ButtonConfigType } from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';

const AddCash = () => {
  const navigate = useNavigate();

  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    setSelectedButton(index);
  };

  const handleNextStep = () => {
    if (selectedButton !== null) {
      const route = '/account/check';
      navigate(route);
    }
  };

  const ButtonConfig: ButtonConfigType[] = [
    {
      label: '100,000원',
      route: '',
      size: 'large',
      color: 'orange',
      className: 'my-[2vh] flex-grow',
    },
    {
      label: '300,000원',
      route: '',
      size: 'large',
      color: 'orange',
      className: 'my-[2vh] flex-grow',
    },
    {
      label: '500,000원',
      route: '',
      size: 'large',
      color: 'orange',
      className: 'my-[2vh] flex-grow',
    },
    {
      label: '1,000,000원',
      route: '',
      size: 'large',
      color: 'orange',
      className: 'my-[2vh] flex-grow',
    },
  ];

  return (
    <div className=''>
      {/* 상단바 */}
      <TopBar title='계좌 입금' />
      {/* space-x-4 p-4 */}
      <div className='mx-16 mt-[1vh]'>
        {ButtonConfig.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            size={button.size}
            color={selectedButton === index ? 'blue' : button.color}
            onClick={() => handleButtonClick(index)}
            className={button.className}
          />
        ))}
      </div>
      <div className='mt-[6vh] flex justify-center p-4'>
        <Button
          label='입금 하기'
          onClick={handleNextStep}
          className='w-full max-w-[calc(100%-60px)]'
          disabled={selectedButton === null}
        />
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default AddCash;
