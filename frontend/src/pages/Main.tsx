import { useLocation, useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '../components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import { getUserFreeAccount } from '@/services/account';
import { useEffect, useState } from 'react';
import {
  getMissionsClearStatus,
  setMissionClearStatus,
} from '@/services/mission';
import MissionSuccessModal from '@/components/modals/MissionSuccessModal';
import MainWrapper from '@/components/layouts/MainWrapper';

interface AccountData {
  accountName: string;
  accountNo: string;
  balance: string;
}

interface missionItem {
  missionNumber: number;
  isCleared: boolean;
}

const getButtonConfig = (missionStatus: missionItem[]): ButtonConfigType[] => [
  {
    label: '전체계좌 조회',
    route: '/account/list',
    size: 'small',
    className: 'flex-grow h-32 bg-white shadow rounded-3xl',
    img: '/assets/images/search.png',
  },
  {
    label: '계좌개설',
    route: '/account/products',
    size: 'small',
    className: 'flex-grow h-32 bg-white shadow rounded-3xl',
    img: '/assets/images/account.png',
  },
  {
    label: '예적금',
    route: '/account/deposit/list',
    size: 'small',
    className: 'flex-grow h-32 bg-white shadow rounded-3xl',
    img: '/assets/images/deposave.png',
  },
  {
    label: '환전',
    route: missionStatus[6]?.isCleared
      ? 'exchange/explain'
      : 'exchange/mission',
    size: 'small',
    className: 'flex-grow h-32 bg-white shadow rounded-3xl',
    img: '/assets/images/exchange.png',
  },
  {
    label: '공과금',
    route: missionStatus[5]?.isCleared ? 'utility/explain' : 'utility/mission',
    size: 'small',
    className: 'flex-grow h-32 bg-white rounded-3xl shadow',
    img: '/assets/images/tax.png',
  },
  {
    label: '계좌입금',
    route: '/account/add-cash',
    size: 'small',
    className: 'flex-grow h-32 bg-white shadow rounded-3xl',
    img: '/assets/images/money_pig.png',
  },
];

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [buttonConfig, setButtonConfig] = useState<ButtonConfigType[]>([]);

  useEffect(() => {
    const fetchMissionStatus = async () => {
      try {
        const response = await getMissionsClearStatus();

        if (response?.statusCode === 200) {
          setButtonConfig(getButtonConfig(response?.result));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMissionStatus();
  }, []);

  // 로그인 미션 확인
  useEffect(() => {
    const fetchLoginMission = async () => {
      try {
        const response = await setMissionClearStatus(0);

        if (response?.statusCode === 200) {
          const timer = setTimeout(() => {
            setIsSuccessModalOpen(true);
          }, 1000);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (location?.state !== undefined) {
      if (location?.state?.isFirstLogin) {
        fetchLoginMission();
      }
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await getUserFreeAccount();
        if (response?.data?.result) {
          const account = response.data.result;
          setAccountData({
            accountName: account.accountName,
            accountNo: account.accountNo,
            balance: account.balance,
          });
        }
      } catch (error) {
        console.error('계좌 정보 API 호출 중 오류 발생:', error);
        console.log();
      }
    };

    fetchAccountDetails();
  }, []);

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
    <div className='min-h-screen bg-orange-100/40'>
      <TopBar
        title=''
        showBackButton={false}
        showXButton={false}
        showMainButton={true}
      />
      <MainWrapper>
        {/* 메인계좌 디브 */}
        <div className='my-4 rounded-md bg-white p-4 shadow'>
          <div className='flex items-center pt-2'>
            <div className='flex'>
              <img
                src='/assets/images/small_logo.png'
                alt='로고'
                className='h-16 w-16 pt-1'
              ></img>
            </div>
            <div className='pb-0 pl-3 pr-4 text-xl font-bold'>
              <p className='pb-1'>
                {accountData ? accountData.accountName : '자유입출금 계좌'}
              </p>
              <p>{accountData ? accountData.accountNo : '111-222-333333'}</p>
            </div>
          </div>
          <div className='py-5 pr-4 text-3xl font-bold'>
            {accountData && accountData.balance
              ? `${accountData.balance.toLocaleString()}원`
              : '11,000,000원'}
          </div>
          <div className='flex justify-around'>
            <Button
              label='돈 보내기'
              size='small'
              className='mr-2 flex h-10 w-40 items-center justify-center bg-primary/75'
              onClick={() => GoAccountTransfer()}
            />
            <Button
              label='계좌내역 조회'
              size='small'
              className='ml-2 flex h-10 w-40 items-center justify-center bg-primary/75'
              onClick={() => GoAccountCheck()}
            />
          </div>
        </div>

        {/* 하단 그리드 버튼들 */}
        <div className='my-3 grid grid-cols-2 gap-4'>
          {buttonConfig.map((button, index) => (
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
        {isSuccessModalOpen && (
          <MissionSuccessModal
            name='로그인'
            onConfirm={() => setIsSuccessModalOpen(false)}
          />
        )}
      </MainWrapper>
    </div>
  );
};

export default Main;
