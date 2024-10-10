import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';

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
    route: '/education/quiz',
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
    route: '/education/stamp',
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
    <div className='bg-orange-100/40'>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar
          title=''
          showBackButton={false}
          showXButton={false}
          showUserName={true}
        />
      </div>
      <MainWrapper isBottomTab={true}>
        <div className='grid gap-4'>
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
      </MainWrapper>
    </div>
  );
};

export default Education;
