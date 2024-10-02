import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button, { ButtonConfigType } from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import AccountHistory from '@/components/common/AccountHistory';


const Modal = ({ show, onClose, onSave }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [sortType, setSortType] = useState('최신순')

  if (!show) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className='fixed inset-0 flex items-center justify-center z-50'
      onClick={handleBackgroundClick}
    >
      <div className='fixed inset-0 bg-black opacity-50 z-40' />
      <div className='bg-white p-6 rounded-lg shadow-lg w-[320px] z-50'>
        <h2 className='text-2xl font-bold mb-4'>필터 조건 설정</h2>
        <div className='mb-4'>
          <label className='block mb-2'>기간</label>
          <input 
            type='date'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className='w-full border px-2 py-1 rounded'
          />
          <div className='mb-4'>
            <label className='block mb-2'>유형</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className='w-full border px-2 py-1 rounded'
            >
              <option>전체</option>
              <option>입금</option>
              <option>출금</option>
            </select>
          </div>
          <div className='flex justify-end space-x-4'>
            <button onClick={onClose} className='px-4 py-2 bg-gray-300 rounded'>취소</button>
            <button onClick={() => onSave(selectedDate, selectedType)} className='px-4 py-2 bg-blue-500 text-white rounded'>저장</button>
          </div>
        </div>
        <div className='fixed inset-0 bg-black opacity-50 z-30' />
      </div>
    </div>
  )
}

const AccountCheck = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({ date: '전체 기간', type: '전체'});
  
  const handleButtonClick = (route: string) => {
    navigate(route);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const saveFilter = (selectedDate: string, selectedType: string) => {
    setFilter({
      date: selectedDate || '전체 기간',
      type: selectedType || '전체'
    });
    setShowModal(false);
  }

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
                size={button.size}
                color={button.color}
                onClick={() => handleButtonClick(button.route)}
                className={button.className}
              />
            ))}
          </div>
          <div className='mx-[10px] mt-[5px] flex justify-between text-[24px] font-bold'>
            <div>전체 기간</div>
            <div>전체</div>
            {/* 임시로 select문으로 해두고 골자만 짜두고 토클로 바꿀 예정 */}
            <select name='' id=''>
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

        <Modal  show={showModal} onClose={closeModal} onSave={saveFilter}/>
    </div>
  );
};

export default AccountCheck;
