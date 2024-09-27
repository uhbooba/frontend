import TopBar from "@/components/layouts/TopBar";
import { BottomTab } from "@/components/layouts/BottomTab";
import AccountProduct from "@/components/common/AccountProduct";


const AccountProductsList = () => {
    const ProductsList = [
        {
            name: '자유입출금 통장',
            description: '돈을 자유롭게 입금하고 출금해요.',
            moveTo: '',
        },
        {
            name: '정기 예금',
            description: '목돈을 맡겨두고 높은 이자를 받아요.',
            moveTo: '',
        },
        {
            name: '정기 적금',
            description: '일정 주기마다 정해진 금액을 맡겨요.', 
            moveTo: '',
        },
    ]
    return(
    <div>
        <TopBar 
            title='계좌 개설' 
            showXButton={false}
        />
        <div className="flex flex-col justify-center items-center" >
            {ProductsList.map((product, index) => (
                <AccountProduct 
                    key={index}
                    name={product.name}
                    description={product.description}
                    moveTo={product.moveTo}
                />                
            ))}
=        </div>
        <div className='fixed bottom-0 left-0 w-full'>
            <BottomTab />
        </div>
    </div>
    );
};

export default AccountProductsList;