import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import AccountHistory from '@/components/common/AccountHistory';
import { getUserFreeAccount } from '@/services/account';

interface AccountData {
  accountName: string;
  accountNo: string;
  balance: string;
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (
    selectedDate: string,
    selectedType: string,
    sort: string,
    startDate: string,
    endDate: string,
  ) => void;
}

interface Filter {
  date: string; // 필터 조건
  type: string;
  sort: string;
  startDate?: string; // 시작일 (선택 사항)
  endDate?: string; // 종료일 (선택 사항)
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onSave }) => {
  const [selectedDate, setSelectedDate] = useState('전체 기간');
  const [selectedType, setSelectedType] = useState('전체');
  const [sortType, setSortType] = useState('최신순');
  const [customDate, setCustomDate] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!show) return null;

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDateButtonClick = (period: string) => {
    if (period === '직접 설정') {
      setCustomDate(true);
      setSelectedDate('직접 설정');
      setStartDate('');
      setEndDate('');
    } else {
      setCustomDate(false);
      setSelectedDate(period);
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      onClick={handleBackgroundClick}
    >
      <div className='fixed inset-0 z-40 bg-black opacity-50' />
      <div className='z-50 w-[320px] rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-2xl font-bold'>필터 조건 설정</h2>

        {/* 기간 설정 */}
        <div className='mb-4'>
          <label className='mb-2 block'>조회 기간</label>
          <div className='grid grid-cols-2 gap-2'>
            <button
              onClick={() => handleDateButtonClick('1주일')}
              className={`px-4 py-2 ${selectedDate === '1주일' && 'bg-primary text-white'}`}
            >
              1주일
            </button>
            <button
              onClick={() => handleDateButtonClick('1개월')}
              className={`px-4 py-2 ${selectedDate === '1개월' && 'bg-primary text-white'}`}
            >
              1개월
            </button>
            <button
              onClick={() => handleDateButtonClick('전체 기간')}
              className={`px-4 py-2 ${selectedDate === '전체 기간' && 'bg-primary text-white'}`}
              disabled={customDate}
            >
              전체 기간
            </button>
            <button
              onClick={() => handleDateButtonClick('직접 설정')}
              className={`px-4 py-2 ${customDate && 'bg-primary text-white'}`}
            >
              직접 설정
            </button>
          </div>
          {customDate && (
            <div className='mt-4'>
              <label>시작일</label>
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='mb-2 w-full rounded border px-2 py-1'
              />
              <label>종료일</label>
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='w-full rounded border px-2 py-1'
              />
            </div>
          )}
        </div>

        {/* 유형 설정 */}
        <div className='mb-4'>
          <label className='mb-2 block'>유형</label>
          <div className='flex space-x-2'>
            <button
              onClick={() => setSelectedType('전체')}
              className={`px-4 py-2 ${selectedType === '전체' && 'bg-primary text-white'}`}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedType('입금')}
              className={`px-4 py-2 ${selectedType === '입금' && 'bg-primary text-white'}`}
            >
              입금
            </button>
            <button
              onClick={() => setSelectedType('출금')}
              className={`px-4 py-2 ${selectedType === '출금' && 'bg-primary text-white'}`}
            >
              출금
            </button>
          </div>
        </div>

        {/* 정렬 설정 */}
        <div className='mb-4'>
          <label className='mb-4 block'>정렬</label>
          <div className='flex space-x-2'>
            <button
              onClick={() => setSortType('최신순')}
              className={`px-4 py-2 ${sortType === '최신순' && 'bg-primary text-white'}`}
            >
              최신순
            </button>
            <button
              onClick={() => setSortType('오래된순')}
              className={`px-4 py-2 ${sortType === '오래된순' && 'bg-primary text-white'}`}
            >
              오래된순
            </button>
          </div>
        </div>

        {/* 저장 및 취소 버튼 */}
        <div className='flex justify-end space-x-4'>
          <button onClick={onClose} className='rounded bg-gray-300 px-4 py-2'>
            취소
          </button>
          <button
            onClick={() =>
              onSave(selectedDate, selectedType, sortType, startDate, endDate)
            }
            className='rounded bg-primary px-4 py-2 text-white'
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountCheck = () => {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<Filter>({
    date: '전체 기간',
    type: '전체',
    sort: '최신순',
    startDate: undefined,
    endDate: undefined,
  });

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

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const saveFilter = (
    selectedDate: string,
    selectedType: string,
    sort: string,
    startDate: string,
    endDate: string,
  ) => {
    // Check if the custom date option is selected
    if (selectedDate === '직접 설정') {
      // Check if either startDate or endDate is not selected
      if (!startDate || !endDate) {
        alert('시작일과 종료일을 모두 선택해야 합니다.');
        return; // Exit the function if either date is not selected
      }

      // Ensure endDate is not before startDate
      if (new Date(endDate) < new Date(startDate)) {
        alert('종료일은 시작일보다 빠를 수 없습니다.');
        return; // Exit the function if endDate is before startDate
      }

      // Format the date filter for custom selection
      selectedDate = `${startDate} ~ ${endDate}`;
    }

    // Update the filter state
    setFilter({
      date: selectedDate || '전체 기간',
      type: selectedType || '전체',
      sort: sort || '최신순',
      startDate: selectedDate === '직접 설정' ? startDate : undefined,
      endDate: selectedDate === '직접 설정' ? endDate : undefined,
    });

    setShowModal(false);
  };

  const ButtonConfig: ButtonConfigType[] = [
    {
      label: '계좌 입금',
      route: '/account/add-cash',
    },
    {
      label: '이체',
      route: '/account/transfer/account-info',
    },
    {
      label: '자동 납부',
      route: '',
    },
  ];

  return (
    <div className=''>
      {/* 상단바 */}
      <TopBar title='계좌 조회' />
      <div className='mt-[20px] flex justify-center'>
        <div className='h-[200px] w-[320px] rounded-xl bg-[#FFAF2A]'>
          <div className='mb-[5px] ml-[20px] mt-[10px] font-bold'>
            <div className='text-[24px] text-[#5A6A59]'>
              {accountData ? accountData.accountName : '자유입출금 계좌'}
            </div>
            <div className='mb-[20px] text-[16px]'>
              {accountData ? accountData.accountNo : '111-222-333333'}
            </div>
            <div className='text-[28px]'>
              {accountData && accountData.balance
                ? `${accountData.balance.toLocaleString()}원`
                : '11,000,000원'}
            </div>
          </div>
          <div className='flex justify-between space-x-4 p-4'>
            {ButtonConfig.map((button, index) => (
              <Button
                key={index}
                label={button.label}
                size='customMedium'
                color='lightOrange'
                onClick={() => handleButtonClick(button.route)}
                className='flex-grow'
              />
            ))}
          </div>
          <div
            onClick={openModal}
            className='mx-[10px] mt-[5px] flex justify-between text-[24px] font-bold'
          >
            <div
              className={`${
                filter.date.length > 10
                  ? 'whitespace-normal break-words text-[16px] leading-tight'
                  : 'overflow-hidden text-ellipsis whitespace-nowrap text-[24px]'
              } max-w-[120px]`} // Adjust max-width as needed
            >
              {filter.date}
            </div>
            <div className='text-[24px]'>{filter.type}</div>
            <div className='text-[24px]'>{filter.sort}</div>
          </div>
          <div>
            <AccountHistory filter={filter} />
          </div>
        </div>
        <div className='fixed bottom-0 left-0 w-full'>
          <BottomTab />
        </div>
      </div>

      <Modal show={showModal} onClose={closeModal} onSave={saveFilter} />
    </div>
  );
};

export default AccountCheck;
