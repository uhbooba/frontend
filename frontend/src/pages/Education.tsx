import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '../components/common/buttons/Button';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';

const ButtonConfig: ButtonConfigType[] = [
  {
    label: '',
    edu_label: '교육 영상',
    route: '/education/video',
    size: 'small',
    className: 'flex h-32 bg-white rounded-3xl shadow',
    edu_img: '/assets/images/video.png',
  },
  {
    label: '',
    edu_label: '퀴즈',
    route: '/quiz',
    size: 'small',
    className: 'flex h-32 bg-white rounded-3xl shadow',
    edu_img: '/assets/images/quiz.png',
  },
  {
    label: '',
    edu_label: '금융사기',
    route: '/cancel/savings/explain',
    size: 'small',
    className: 'flex h-32 bg-white rounded-3xl shadow',
    edu_img: '/assets/images/fraud.png',
  },
  {
    label: '',
    edu_label: '미션 스탬프',
    route: '/cancel/savings/explain',
    size: 'small',
    className: 'flex h-32 bg-white shadow rounded-3xl',
    edu_img: '/assets/images/mission_stamp.png',
  },
  {
    label: '',
    edu_label: '교육 이수증',
    route: '/education/certificate',
    size: 'small',
    className: 'flex h-32 bg-white rounded-3xl shadow',
    edu_img: '/assets/images/cer_icon.png',
  },
];

const Education = () => {
  const navigate = useNavigate();

  const handleButtonClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className='h-[840px] bg-orange-100/40'>
      <TopBar
        title=''
        showBackButton={false}
        showXButton={false}
        showMainButton={true}
      />

      <div className='grid gap-4 p-4'>
        {ButtonConfig.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            size={button.size}
            color={button.color}
            onClick={() => handleButtonClick(button.route)}
            className={button.className}
            edu_img={button.edu_img}
            edu_label={button.edu_label}
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
