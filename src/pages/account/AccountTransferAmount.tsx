import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import XTopBar from '@/components/layouts/XTopbar';
import { useState } from 'react';
import MoneyInput from '@/components/common/MoneyInput';

const AccountTransferAmount = () => {
  
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    // const [modalOpen, setModalOpen] = useState(false);
    // const [accountNumber, setAccountNumber] = useState('');

    const amountLabels = [
        '+1만원',
        '+5만원',
        '+10만원',
        '+100만원',
        '전액',
        '직접 입력',
    ]

    const amountValues = [
        10000,
        50000,
        100000,
        1000000,
        0,
        0,
    ]

    const GoBack = () => {
        navigate(-1);
    };

    const handleAmmountSelect = (index: number) => {
        const selectedAmount = amountValues[index]
        if (selectedAmount > 0) {
            setAmount((prevAmount) => prevAmount + selectedAmount)
        } else {
            console.log('전액 처리나 직접 입력 로직을 찾아보자')
        }
        // setModalOpen(false);
    }

    // const handleSubmit = () => {
    //     if (!accountNumber || !selectedBank) {
    //         alert("계좌번호와 은행을 선택해 주세요.");
    //         return;
    //     }
    //     navigate('/account/check', {
    //         state: { accountNumber, selectedBank}
    //     })
    // }

    return (
    <div className='flex flex-col h-screen'>
        <div className='w-full'>
            <XTopBar title='계좌 이체' />
        </div>

        <div className='mt-4'>
            <LevelBar currentLevel={1} totalLevel={4} />
        </div>

        <div className='ml-4 mr-4 mt-6'>
            <Input
                label='얼마를 보낼까요?'
                variant='full'
                placeholder={`${amount}원`}
                numberValue={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            ></Input>

            <div className='flex relative mt-4'>
                <MoneyInput 
                    amounts={amountLabels}
                    onAmountClick={(index) => handleAmmountSelect(index)}
                    amountBtnColor='None'
                />
            </div>
            
            <div className='w-full mt-[30vh]'>
                <div className='flex w-full justify-between space-x-4 px-4 pb-4'>
                    <Button
                    label='이전'
                    size='large'
                    color='orange'
                    className='flex-grow'
                    onClick={() => GoBack()}
                    />
                    <Button
                    label='다음'
                    size='medium'
                    color='orange'
                    className='flex-grow'
                    onClick={GoBack}
                    />
                </div>

                <div className='fixed bottom-0 left-0 w-full'>
                    <BottomTab />
                </div>
            </div>
        </div>
    </div>
  );
};

export default AccountTransferAmount;
