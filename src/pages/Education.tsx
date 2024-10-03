import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '../components/common/buttons/Button';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';

const ButtonConfig: ButtonConfigType[] = [
  {
    label: '',
    eduLabel: '교육 영상',
    route: '/education/video',
    size: 'small',
    className: 'flex h-32 bg-white rounded-3xl shadow',
    eduImg: '/assets/images/video.png',
  },
  {
    label: '',
    eduLabel: '퀴즈',
    route: '/quiz',
    size: 'small',
    className: 'flex h-32 bg-white rounded-3xl shadow',
    eduImg: '/assets/images/quiz.png',
  },
  {
    label: '',
    eduLabel: '금융 사기',
    route: '/prevention/agree',
    size: 'small',
    className: 'flex h-32 bg-white rounded-3xl shadow',
    eduImg: '/assets/images/fraud.png',
  },
  {
    label: '',
    eduLabel: '미션 스탬프',
    route: '/stamp',
    size: 'small',
    className: 'flex h-32 bg-white shadow rounded-3xl',
    eduImg: '/assets/images/mission_stamp.png',
  },
  {
    label: '',
    eduLabel: '교육 이수증',
    route: '/education/certificate',
    size: 'small',
    className: 'flex h-32 bg-white rounded-3xl shadow',
    eduImg: '/assets/images/cer_icon.png',
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
            eduImg={button.eduImg}
            eduLabel={button.eduLabel}
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
