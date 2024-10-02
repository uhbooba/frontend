import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  accountHolderNameAtomn,
  accountNumberAtom,
  amountAtom,
  myAccountRecordAtom,
  selectedBankAtom,
  yourAccountRecordAtom,
} from '@/atoms/account/accountTransferAtoms';
import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import TopBar from '@/components/layouts/TopBar';
// import { useState } from 'react';

const AccountTransferDepositName = () => {
  const navigate = useNavigate();
  const [amount] = useAtom(amountAtom);
  // const [keyOpen, setKeyOpen] = useState(false)
  const [selectedBank] = useAtom(selectedBankAtom);
  const [accountNumber] = useAtom(accountNumberAtom);
  const [accountHolderName] = useAtom(accountHolderNameAtomn);
  const [myAccountRecord, setMyAcoountRecord] = useAtom(myAccountRecordAtom);
  const [yourAccountRecord, setYourAcoountRecord] = useAtom(
    yourAccountRecordAtom,
  );

  useEffect(() => {
    // 추후 사용자의 실제 이름을 변수로 받아서 이용
    setMyAcoountRecord('예금주명');
    setYourAcoountRecord('예금주명');
  }, []);

  return (
    <div className='flex h-screen flex-col'>
      <div className='w-full'>
        <TopBar title='계좌 이체' showXButton={false} />
      </div>

      <div className='mt-4'>
        <LevelBar currentLevel={3} totalLevel={5} />
      </div>

      <div className='ml-4 mt-4'>
        <div>
          {selectedBank} {accountNumber}
        </div>
        {accountHolderName}님께
      </div>

      <div className='ml-4 mr-4 mt-6'>
        <div className='mb-8'>{amount}원</div>

        <Input
          label='내 통장 기록'
          placeholder={myAccountRecord}
          value={myAccountRecord}
          onChange={(e) => setMyAcoountRecord(e.target.value)}
        />
        <Input
          label='받는 분 통장 기록'
          placeholder={yourAccountRecord}
          value={yourAccountRecord}
          onChange={(e) => setYourAcoountRecord(e.target.value)}
        />

        <div className='mt-[30vh] w-full'>
          <div className='flex w-full justify-between space-x-4 px-4 pb-4'>
            <Button
              label='이체하기'
              size='large'
              color='orange'
              className='flex-grow'
              onClick={() => navigate('/account/transfer/info-check')}
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
