import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '../components/common/buttons/Button';
// import XButton from '@/components/common/XButton';
// import BackButton from '@/components/common/BackButton';
// import CheckButton from '@/components/common/CheckButton';
// import Layout from '@/components/common/layouts/Layout';

const ButtonConfig: ButtonConfigType[] = [
  {
    label: '예금 가입',
    route: '/deposit',
    size: 'small',
    color: 'orange',
    className: 'flex-grow',
  },
  {
    label: '적금 가입',
    route: '/savings',
    size: 'small',
    color: 'orange',
    className: 'flex-grow',
  },
];

const Main = () => {
  const navigate = useNavigate();

  const handleButtonClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className='flex min-h-screen flex-col justify-end'>
      <div className='flex justify-between space-x-4 p-4'>
        {ButtonConfig.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            size={button.size}
            color={button.color}
            onClick={() => handleButtonClick(button.route)}
            className={button.className}
          />
        ))}
      </div>
      <div className='bg-gray-400 py-8 text-center'>
        <span>여기는 휴대폰 하단바</span>
      </div>
    </div>
  );
};

export default Main;
