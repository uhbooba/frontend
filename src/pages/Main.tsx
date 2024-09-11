import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '../components/common/Button';
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
    className: 'absolute top-10 left-10',
  },
  {
    label: '적금 가입',
    route: '/savings',
    size: 'small',
    color: 'orange',
    className: 'absolute top-10 right-10',
  },
];

const Main = () => {
  const navigate = useNavigate();

  const handleButtonClick = (route: string) => {
    navigate(route);
  };

  return (
    <div>
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
  );
};

export default Main;
