import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import AccountHistory from '@/components/common/AccountHistory';

const Modal = ({ show, onClose, onSave }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [sortType, setSortType] = useState('최신순');

  if (!show) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
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
        <div className='mb-4'>
          <label className='mb-2 block'>기간</label>
          <input
            type='date'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className='w-full rounded border px-2 py-1'
          />
          <div className='mb-4'>
            <label className='mb-2 block'>유형</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className='w-full rounded border px-2 py-1'
            >
              <option>전체</option>
              <option>입금</option>
              <option>출금</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='mb-4 block'>정렬</label>
            <select 
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className='w-full rounded border px-2 py-1'
            >
              <option>최신순</option>
              <option>오래된순</option>
            </select>
          </div>
          <div className='flex justify-end space-x-4'>
            <button onClick={onClose} className='rounded bg-gray-300 px-4 py-2'>
              취소
            </button>
            <button
              onClick={() => onSave(selectedDate, selectedType, sortType)}
              className='rounded bg-blue-500 px-4 py-2 text-white'
            >
              저장
            </button>
          </div>
        </div>
        <div className='fixed inset-0 z-30 bg-black opacity-50' />
      </div>
    </div>
  );
};

const AccountCheck = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({ date: '전체 기간', type: '전체', sort: '최신순' });

  const handleButtonClick = (route: string) => {
    navigate(route);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const saveFilter = (selectedDate: string, selectedType: string, sort: string) => {
    setFilter({
      date: selectedDate || '전체 기간',
      type: selectedType || '전체',
      sort: sort || '최신순',
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
          <div className='mx-[10px] mt-[5px] flex justify-between text-[24px] font-bold'>
            <div>{filter.date}</div>
            <div>{filter.type}</div>
            <div>{filter.sort}</div>
            <button onClick={openModal} className='text-blue-500'>
              필터 ▼
            </button>
            {/* <select name="" id="">
                        <option>최신순▼</option>
                        <option>오래된순▲</option>
                    </select> */}
            {/* <input type='checkbox' id='filter' hidden/> */}
          </div>
          <div>
            <AccountHistory />
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
