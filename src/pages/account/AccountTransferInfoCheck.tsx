import TopBar from "@/components/layouts/TopBar";
import LevelBar from "@/components/common/LevelBar";
import { BottomTab } from "@/components/layouts/BottomTab";
import { useAtom } from "jotai";
import { accountNumberAtom, amountAtom, myAccountRecordAtom, selectedBankAtom, yourAccountRecordAtom } from "@/atoms/account/accountTransferAtoms";
import InfoRow from "@/components/common/InfoRow";
import Button from "@/components/common/buttons/Button";
import { useNavigate } from "react-router";


const AccountTransferInfoCheck = () => {
  const [ selectedBank ] = useAtom(selectedBankAtom);
  const [ accountNumber ] = useAtom(accountNumberAtom);
  const [ amount ] = useAtom(amountAtom);
  const [ myAccountRecord ] = useAtom(myAccountRecordAtom);
  const [ yourAccountRecord ] = useAtom(yourAccountRecordAtom);
  const navigate = useNavigate();


  const time = new Date()
  const formattedTime = time.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 24시간 형식
  }).replace(/\./g, '. ').trim(); // 날짜 사이 공백 추가

  const infoRows = [
    { title: '받는 계좌', content: `${selectedBank} ${accountNumber}` },
    { title: '보낸 금액', content: `${amount}원` },
    { title: '받는 분 통장 기록', content: yourAccountRecord },
    { title: '보낸 분 통장 기록', content: myAccountRecord },
    { title: '거래 일시', content: formattedTime },
  ];

    return (
        <div className='flex flex-col h-screen'>
            <div className='w-full'>
                <TopBar title='계좌 이체' />
            </div>

            <div className='mt-4'>
                <LevelBar currentLevel={4} totalLevel={5} />
            </div>

            <div className="mt-8 ml-4">

                <div className="text-2xl font-bold mb-8">이체 내역</div>

                {infoRows.map((row, index) => (
                    <InfoRow key={index} title={row.title} content={row.content} />
                ))}
            
            </div>

            <div className='w-full mt-[10vh]'>
                <div className='flex w-full justify-between space-x-4 px-4 pb-4'>
                    <Button
                    label='확인했어요.'
                    size='large'
                    color='orange'
                    className='flex-grow'
                    onClick={() => navigate('/account/transfer/password')}
                    />
                </div>
                <div className='fixed bottom-0 left-0 w-full'>
                    <BottomTab />
                </div>
            </div>
        </div>
        );
    };
  
  export default AccountTransferInfoCheck;