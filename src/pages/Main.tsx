import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '../components/common/buttons/Button';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';

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
  {
    label: '예금 중도 해지',
    route: '/cancel/deposit/explain',
    size: 'small',
    color: 'orange',
    className: 'flex-grow',
  },
  {
    label: '적금 중도 해지',
    route: '/cancel/savings/explain',
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
    <div>
      <TopBar title='메인페이지' showBackButton={false} showXButton={false} />

      <div className='space-y-4 p-4'>
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
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default Main;
