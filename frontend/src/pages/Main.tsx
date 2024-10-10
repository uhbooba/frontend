import { useLocation, useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '../components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import { getUserFreeAccount } from '@/services/account';
import { useEffect, useState } from 'react';
import {
  getMissionClearStatus,
  getMissionsClearStatus,
  setMissionClearStatus,
} from '@/services/mission';
import MissionSuccessModal from '@/components/modals/MissionSuccessModal';
import MainWrapper from '@/components/layouts/MainWrapper';

interface AccountData {
  accountName: string;
  accountNo: string;
  balance: string;
  username: string;
}

interface Mission {
  isCleared: boolean;
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
  const [, setClearedMissions] = useState(0);

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
        const response = await setMissionClearStatus(1);

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
            username: account.username,
          });
        }
      } catch (error) {
        console.error('계좌 정보 API 호출 중 오류 발생:', error);
        console.log();
      }
    };

    fetchAccountDetails();
  }, []);

  // 버튼 클릭 시 미션 상태를 확인하는 함수 추가
  const handleButtonClick = async (route: string, label: string) => {
    if (label === '계좌개설') {
      try {
        const response = await getMissionsClearStatus();
        const missionStatus = response?.result?.find(
          (mission: missionItem) => mission.missionNumber === 2,
        );
        if (!missionStatus?.isCleared) {
          navigate('/account/products/mission'); // 미션이 완료되지 않았을 경우 mission 페이지로 이동
          return;
        }
      } catch (error) {
        console.error('미션 상태 확인 중 오류 발생:', error);
      }
    }
    navigate(route); // 미션 완료되었거나 다른 버튼일 경우 해당 route로 이동
  };

  const GoAccountCheck = () => {
    navigate('account/check');
  };

  const GoAccountTransfer = async () => {
    try {
      const missionStatus = await getMissionClearStatus(3);
      if (!missionStatus?.result) {
        navigate('/account/transfer/mission');
        return;
      }
    } catch (error) {
      console.error('미션 상태 확인 중 오류 발생:', error);
    }
    navigate('account/transfer/account-info');
  };

  useEffect(() => {
    // 모든 미션 클리어 확인하는 api 부르기
    const fetchMissionsStatus = async () => {
      try {
        const response = await getMissionsClearStatus();
        const completedMissions = response.result.filter(
          (mission: Mission) => mission.isCleared,
        ).length;

        setClearedMissions(completedMissions); // true 미션 개수
      } catch (error) {
        console.error('getMissionsClearStatus 에러', error);
      }
    };

    fetchMissionsStatus();
  }, []);

  return (
    <div className='min-h-screen bg-orange-100/40'>
      <TopBar
        title=''
        showBackButton={false}
        showXButton={false}
        showUserName={true}
      />
      <MainWrapper isBottomTab={true}>
        {/* 메인계좌 디브 */}
        <div className='mt-2 rounded-md bg-white p-4 shadow'>
          <div className='flex items-center'>
            <div className='flex'>
              <img
                src='/assets/images/small_logo.png'
                alt='로고'
                className='h-14 w-16 pt-1'
              ></img>
            </div>
            <div className='pl-3 pr-4 text-xl font-bold'>
              <p className='pb-1'>
                {accountData
                  ? accountData.accountName
                  : '계좌정보 불러오는 중...'}
              </p>

              <p>
                {accountData
                  ? accountData.accountNo
                  : '계좌번호 불러오는 중...'}
              </p>
            </div>
          </div>
          <div className='py-5 pr-4 text-3xl font-bold'>
            {accountData && accountData.balance !== undefined
              ? accountData.balance === '0'
                ? '잔액이 없습니다.'
                : `${accountData.balance.toLocaleString()}원`
              : '계좌잔액 불러오는 중...'}
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
              onClick={() => handleButtonClick(button.route, button.label)} // 버튼 클릭 시 handleButtonClick 호출
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
