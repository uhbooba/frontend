import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '../components/common/buttons/Button';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';

const ButtonConfig: ButtonConfigType[] = [
  {
    label: '교육 영상',
    route: '/education/video',
    size: 'large',
    color: 'orange',
    className: 'w-full',
  },
  {
    label: '교육 이수증',
    route: '/education/certificate',
    size: 'large',
    color: 'orange',
    className: 'w-full',
  },
  {
    label: '퀴즈',
    route: '/quiz',
    size: 'large',
    color: 'orange',
    className: 'w-full',
  },
];

const Education = () => {
  const navigate = useNavigate();

  const handleButtonClick = (route: string) => {
    navigate(route);
  };

  return (
    <div>
      <TopBar title='교육페이지' showBackButton={false} showXButton={false} />

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

export default Education;
