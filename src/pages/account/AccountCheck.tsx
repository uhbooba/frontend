import Button, { ButtonConfigType } from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import AccountHistory from '@/components/common/AccountHistory';


const AccountCheck = () => {
  const navigate = useNavigate();
  const handleButtonClick = (route: string) => {
    navigate(route);
  };

  const ButtonConfig: ButtonConfigType[] = [
    {
      label: '계좌 입금',
      route: '/account/addcash',
      size: 'small',
      color: 'red',
      className: 'flex-grow',
    },
    {
      label: '이체',
      route: '/account/transfer/account-info',
      size: 'small',
      color: 'green',
      className: 'flex-grow',
    },
    {
      label: '자동 납부',
      route: '',
      size: 'small',
      color: 'blue',
      className: 'flex-grow',
    },
  ];


  return (
    <div className=''>
        {/* 상단바 */}
        <TopBar title='계좌 조회' />
        <div className='flex justify-center mt-[20px]'>
            <div className='w-[320px] h-[200px] bg-[#FFAF2A] rounded-xl'>
                <div className='mt-[10px] mb-[5px] ml-[20px] font-bold'>
                    <div className='text-[24px] text-[#5A6A59]'>자유 입출금 통장</div>
                    <div className='mb-[20px]  text-[16px]'>352-1263-3781-83</div>
                    <div className='text-[28px]'>잔액 26,305,219원</div>
                </div>
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
                <div className='mt-[5px] mx-[10px] flex justify-between font-bold text-[24px]'>
                    <div>전체 기간</div>
                    <div>전체</div>
                    {/* 임시로 select문으로 해두고 골자만 짜두고 토클로 바꿀 예정 */}
                    <select name="" id="">
                        <option>최신순▼</option>
                        <option>오래된순▲</option>
                    </select>
                    {/* <input type='checkbox' id='filter' hidden/>
                    <label htmlFor="filter" className=''>
                        <span className=''>최신순▼</span>
                        <span className=''>오래된순▲</span>
                    </label> */}
                </div>
                <div>
                    <AccountHistory />
                </div>
            </div>
            <div className='fixed bottom-0 left-0 w-full'>
                <BottomTab />
            </div>
        </div>
    </div>
  );
};

export default AccountCheck;
