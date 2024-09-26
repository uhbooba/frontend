import TopBar from "@/components/layouts/TopBar";
import { BottomTab } from "@/components/layouts/BottomTab";

const AccountProducts = () => {
    return(
    <div>
        <TopBar 
            title='계좌 개설' 
            showXButton={false}
        />
        <div className='fixed bottom-0 left-0 w-full'>
            <BottomTab />
        </div>
    </div>
    );
};

export default AccountProducts;