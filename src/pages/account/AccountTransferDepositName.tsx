import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import TopBar from '@/components/layouts/TopBar';
// import { useState } from 'react';
import { useAtom } from 'jotai';
import { accountHolderNameAtomn, accountNumberAtom, amountAtom, selectedBankAtom } from '@/atoms/account/accountTransferAtoms';

const AccountTransferDepositName = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useAtom(amountAtom);
    // const [keyOpen, setKeyOpen] = useState(false)
    const [selectedBank] = useAtom(selectedBankAtom)
    const [accountNumber] = useAtom(accountNumberAtom)
    const [accountHolderName] = useAtom(accountHolderNameAtomn)
    
    const GoBack = () => {
        navigate(-1);
    };


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
            ></Input>

            
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

export default AccountTransferDepositName;
