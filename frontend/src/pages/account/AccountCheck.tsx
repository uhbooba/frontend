import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import AccountHistory from '@/components/common/AccountHistory';

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
  const [selectedDate, setSelectedDate] = useState('');
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
    setCustomDate(false);
    setSelectedDate(period);
    if (period === '직접 설정') {
      setCustomDate(true);
      setSelectedDate('');
      setStartDate('');
      setEndDate('');
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
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<Filter>({
    date: '전체 기간',
    type: '전체',
    sort: '최신순',
    startDate: undefined,
    endDate: undefined,
  });

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
    if (
      selectedDate === '직접 설정' &&
      new Date(endDate) < new Date(startDate)
    ) {
      alert('종료일은 시작일보다 빠를 수 없습니다.');
      return; // 종료일이 시작일보다 빠르면 종료
    }

    let dateFilter = selectedDate;
    if (selectedDate === '직접 설정') {
      dateFilter = `${startDate} ~ ${endDate}`;
    }

    setFilter({
      date: dateFilter || '전체 기간',
      type: selectedType || '전체',
      sort: sort || '최신순',
      startDate: selectedDate === '직접 설정' ? startDate : undefined, // 조건에 따라 설정
      endDate: selectedDate === '직접 설정' ? endDate : undefined, // 조건에 따라 설정
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
            <div className='text-[24px] text-[#5A6A59]'>자유 입출금 통장</div>
            <div className='mb-[20px] text-[16px]'>352-1263-3781-83</div>
            <div className='text-[28px]'>잔액 26,305,219원</div>
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
            <div>{filter.date}</div>
            <div>{filter.type}</div>
            <div>{filter.sort}</div>
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
