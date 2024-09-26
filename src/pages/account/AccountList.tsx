import TopBar from "@/components/layouts/TopBar";
import { BottomTab } from "@/components/layouts/BottomTab";
import AccountInfo from "@/components/common/AccountInfo";
import { CiCirclePlus } from "react-icons/ci";


const AccountList = () => {
    return(
        <div className="">
            <TopBar 
                title="계좌 목록" 
                showXButton = { false }    
            />
            <div className="flex flex-col justify-center items-center">
                {/* 지금은 하드 코딩으로 계좌 넣어둠. 추후 수정 예정 */}
                <AccountInfo 
                    accountType="자유 입출금 통장"
                    acconutNumber="3521263378183456"
                    amount={ 26305219 }
                    buttonName="계좌 이체"
                    moveTo='/account/transfer/account-info'
                />
                <AccountInfo 
                    accountType="정기 예금"
                    acconutNumber="1234567891011121"
                    amount={ 30000000 }
                    buttonName="중도 해지"
                    moveTo="/main"
                />
                <div className='w-[320px] h-[128px] bg-gray-200 rounded-xl mt-[20px] flex flex-col justify-center items-center text-center'>
                    <div className='text-[24px] text-[#5A6A59]'>
                        <span>계좌 개설</span>
                        
                        <div className="flex justify-center mt-2">
                            <CiCirclePlus size={44} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='fixed bottom-0 left-0 w-full'>
                <BottomTab />
            </div>
        </div> 
    );
};

export default AccountList;