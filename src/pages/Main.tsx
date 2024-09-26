import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '../components/common/buttons/Button';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';

const ButtonConfig: ButtonConfigType[] = [
  // 괄호 있는 label은 괄호 안 내용이 나중에 해당 페이지 완성되면 바꿀 진짜 이름입니다.
  {
    label: '예금 가입 (전체계좌 조회)',
    route: '/deposit',
    size: 'small',
    className: 'flex-grow h-32 bg-white shadow rounded-3xl',
    img: '/assets/images/search.png',
  },
  {
    label: '적금 가입 (계좌개설)',
    route: '/savings',
    size: 'small',
    className: 'flex-grow h-32 bg-white shadow rounded-3xl',
    img: '/assets/images/account.png',
  },
  {
    label: '예금 중도 해지 (예적금)',
    route: '/cancel/deposit/explain',
    size: 'small',
    className: 'flex-grow h-32 bg-white shadow rounded-3xl',
    img: '/assets/images/deposave.png',
  },
  {
    label: '환전',
    route: 'exchange/explain',
    size: 'small',
    className: 'flex-grow h-32 bg-white shadow rounded-3xl',
    img: '/assets/images/exchange.png',
  },
  {
    label: '공과금',
    route: 'utility/mission',
    size: 'small',
    className: 'flex-grow h-32 bg-white rounded-3xl shadow',
    img: '/assets/images/tax.png',
  },
  {
    label: '적금 중도해지(계좌입금)',
    route: '/cancel/savings/explain',
    size: 'small',
    className: 'flex-grow h-32 bg-white shadow rounded-3xl',
    img: '/assets/images/money_pig.png',
  },
];

const Main = () => {
  const navigate = useNavigate();

  const handleButtonClick = (route: string) => {
    navigate(route);
  };

  const GoAccountCheck = () => {
    navigate('account/check');
  };

  const GoAccountTransfer = () => {
    navigate('account/transfer/account-info');
  };

  return (
    <div className='h-[840px] bg-orange-100/40'>
      <TopBar
        title=''
        showBackButton={false}
        showXButton={false}
        showMainButton={true}
      />

      {/* 메인계좌 디브 */}
      <div className='m-4 mt-8 h-56 rounded-2xl bg-white shadow'>
        <div className='flex pt-2'>
          <div className='flex items-center pl-2'>
            <img
              src='/assets/images/small_logo.png'
              alt='로고'
              className='h-16 w-16 pt-1'
            ></img>
          </div>
          <div className='pb-0 pl-3 pr-4 pt-4 text-xl font-bold'>
            <p className='pb-1'>자유입출금 계좌</p>
            <p>111-222-333333</p>
            {/* 계좌번호 나중에 데이터 받아와서 그거 쓰는거로 바꾸기 */}
          </div>
        </div>

        <div className='pb-2 pl-4 pr-4 pt-4 text-3xl font-bold'>
          10,000,000원
        </div>
        {/* 계좌잔액 나중에 데이터 받아와서 그거 쓰는거로 바꾸기 */}

        <div className='flex justify-around pt-4'>
          <Button
            label='돈 보내기'
            size='small'
            className='ml-4 mr-4 flex h-10 w-40 items-center justify-center bg-primary/75'
            onClick={() => GoAccountTransfer()}
          />
          <Button
            label='계좌내역 조회'
            size='small'
            className='ml-4 mr-4 flex h-10 w-40 items-center justify-center bg-primary/75'
            onClick={() => GoAccountCheck()}
          />
        </div>
      </div>

      {/* 하단 그리드 버튼들 */}
      <div className='grid grid-cols-2 gap-4 p-4'>
        {ButtonConfig.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            size={button.size}
            color={button.color}
            onClick={() => handleButtonClick(button.route)}
            className={button.className}
            img={button.img}
          />
        ))}
      </div>

      {/* 바텀탭 */}
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default Main;
