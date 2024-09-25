import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import TopBar from '@/components/layouts/TopBar';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { accountNumberAtom, selectedBankAtom } from '@/atoms/account/accountTransferAtoms';

const AccountTransferAccountInfo = () => {
  
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBank, setSelectedBank] = useAtom(selectedBankAtom);
    const [accountNumber, setAccountNumber] = useAtom(accountNumberAtom);

    const GoBack = () => {
        navigate(-1);
    };

    const handleBankSelect = (bank: string) => {
        setSelectedBank(bank);
        setModalOpen(false);
    }

    const handleSubmit = () => {
        if (!accountNumber || !selectedBank) {
            alert("계좌번호와 은행을 선택해 주세요.");
            return;
        }
        navigate('/account/transfer/amount', {
            state: { accountNumber, selectedBank}
        })
    }

    return (
    <div className='flex flex-col h-screen'>
        <div className='w-full'>
            <TopBar title='계좌 이체' />
        </div>

        <div className='mt-4'>
            <LevelBar currentLevel={1} totalLevel={5} />
        </div>

        <div className='ml-4 mr-4 mt-6'>
            <Input
                label='계좌번호'
                variant='full'
                placeholder='계좌번호를 입력해 주세요.'
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
            />

            <div className='relative mt-4'>
                <Button 
                    label={selectedBank || '은행 선택'}
                    size='medium'
                    color='orange'
                    onClick={() => setModalOpen(true)}
                />

                {modalOpen && (
                    <div className='absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg'>
                        <ul className='max-h4-48 overflow-auto'>
                            {['국민은행', '신한은행', '하나은행', '우리은행', '농협은행'].map((bank) => (
                                <li
                                    key={bank}
                                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                    onClick={() => handleBankSelect(bank)}
                                >
                                    {bank}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
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

                <div className='fixed bottom-0 left-0 w-full'>
                    <BottomTab />
                </div>
            </div>
        </div>
    </div>
  );
};

export default AccountTransferAccountInfo;
