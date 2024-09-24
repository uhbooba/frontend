import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '../components/common/buttons/Button';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';

const ButtonConfig: ButtonConfigType[] = [
  {
    label: '예금 가입 (계좌목록)',
    route: '/deposit',
    size: 'small',
    color: 'orange',
    className: 'flex-grow h-20',
  },
  {
    label: '적금 가입 (계좌개설)',
    route: '/savings',
    size: 'small',
    color: 'orange',
    className: 'flex-grow h-20',
  },
  {
    label: '예금 중도 해지 (예적금)',
    route: '/cancel/deposit/explain',
    size: 'small',
    color: 'orange',
    className: 'flex-grow h-20',
  },
  {
    label: '적금 중도 해지 (환전)',
    route: '/cancel/savings/explain',
    size: 'small',
    color: 'orange',
    className: 'flex-grow h-20',
  },
  {
    label: '공과금',
    route: '/cancel/savings/explain',
    size: 'small',
    color: 'orange',
    className: 'flex-grow h-20',
  },
  {
    label: '금융사기',
    route: '/cancel/savings/explain',
    size: 'small',
    color: 'orange',
    className: 'flex-grow h-20',
  },
  {
    label: '계좌입금(시드머니충전)',
    route: '/cancel/savings/explain',
    size: 'small',
    color: 'orange',
    className: 'flex-grow h-20',
  },
  {
    label: '스탬프',
    route: '/cancel/savings/explain',
    size: 'small',
    color: 'orange',
    className: 'flex-grow h-20',
  },
];

const Main = () => {
  const navigate = useNavigate();

  const handleButtonClick = (route: string) => {
    navigate(route);
  };

  return (
    <div>
      <TopBar
        title=''
        showBackButton={false}
        showXButton={false}
        showMainButton={true}
      />

      <div className='m-4 mt-8 h-40 rounded-lg bg-primary'>
        <div className='p-4 pb-0 text-xl font-bold'>
          자유입출금 계좌 111-222-3333
        </div>
        <div className='p-4 text-lg font-bold'>10,000,000원</div>
        <div className='flex justify-around'>
          <Button
            label='돈 보내기'
            size='small'
            className='flex h-10 w-40 items-center justify-center bg-white'
          />
          <Button
            label='계좌 조회(내역)'
            size='small'
            className='flex h-10 w-40 items-center justify-center bg-white'
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 p-4'>
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
