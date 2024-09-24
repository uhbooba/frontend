import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import TopBar from '@/components/layouts/TopBar';
import { useState } from 'react';
import MoneyInput from '@/components/common/MoneyInput';
import Keypad from '@/components/common/KeyPad';
import { useAtom } from 'jotai';
import { accountHolderNameAtomn, accountNumberAtom, amountAtom, selectedBankAtom } from '@/atoms/account/accountTransferAtoms';

const AccountTransferAmount = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useAtom(amountAtom);
    const [keyOpen, setKeyOpen] = useState(false)
    const [selectedBank] = useAtom(selectedBankAtom)
    const [accountNumber] = useAtom(accountNumberAtom)
    const [accountHolderName] = useAtom(accountHolderNameAtomn)

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
        Infinity,
        0,
    ]

    const GoBack = () => {
        navigate(-1);
    };

    const handleAmountSelect = (index: number) => {
        const selectedAmount = amountValues[index]
        if (selectedAmount > 0) {
            setAmount((prevAmount) => prevAmount + selectedAmount);
            setKeyOpen(false);
        } else if (selectedAmount == 0) {
            setAmount(0);
            setKeyOpen(true);
        } else {
            console.log('전액 처리나 직접 입력 로직을 찾아보자')
        }
        // setModalOpen(false);
    }

    // 키패드 숫자 클릭할 때 함수
    const keyClick = (num: string) => {
        setAmount((prev) => Number(String(prev) + num));
    };

    // 키패트 지우기 버튼 클릭할 때 함수
    const handleDelete = () => {
        setAmount((prev) => Math.floor(prev/10));
    };

    const handleSubmit = () => {
        if (!amount) {
            alert("입금할 금액을 선택해주세요.");
            return;
        }
        navigate('/account/transfer/deposit-name', {
            state: { accountNumber, selectedBank}
        })
    }

    return (
    <div className='flex flex-col h-screen'>
        <div className='w-full'>
            <TopBar title='계좌 이체' />
        </div>

        <div className='mt-4'>
            <LevelBar currentLevel={2} totalLevel={4} />
        </div>

        <div className='mt-4 ml-4'>
            <div>
                {selectedBank} {accountNumber}
            </div>
            {accountHolderName}님께
        </div>

        <div className='ml-4 mr-4 mt-6'>
            <Input
                label='얼마를 보낼까요?'
                variant='full'
                placeholder='금액을 입력해 주세요.'
                value={`${amount}원`}
                onChange={(e) => setAmount(Number(e.target.value))}
            />

            <div className='flex relative mt-4'>
                <MoneyInput 
                    amounts={amountLabels}
                    onAmountClick={(index) => handleAmountSelect(index)}
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
                    onClick={handleSubmit}
                    />
                </div>

                {/* 키패드 */}
                {keyOpen && (
                    <Keypad
                    onNumberClick={keyClick}
                    onDeleteClick={handleDelete}
                    onConfirmClick={() => setKeyOpen(false)}
                    />
                )}

                <div className='fixed bottom-0 left-0 w-full'>
                    <BottomTab />
                </div>
            </div>
        </div>
    </div>
  );
};

export default AccountTransferAmount;
