import TopBar from "@/components/layouts/TopBar";
import { BottomTab } from "@/components/layouts/BottomTab";


const AccountList = () => {
    return(
        <div>
            <TopBar title="계좌 목록" />
            <div className='fixed bottom-0 left-0 w-full'>
                <BottomTab />
            </div>
        </div>
    );
};

export default AccountList;