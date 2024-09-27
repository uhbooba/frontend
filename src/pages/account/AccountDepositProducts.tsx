import KeywordButtons from '@/components/common/KeywordButtons';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
// import { useNavigate } from "react-router";
import { useState } from 'react';
import AccountDepositProduct from '@/components/common/AccountDepositProduct';

const AccountDepositProducts = () => {
  const [selectedKeyword, setSelectedKeyword] = useState('예금 상품');

  // const navigate = useNavigate();

  const keywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  const keywords = ['예금 상품', '적금 상품'];

  const DepositProducts = [
    {
      name: '정기예금 1번 상품',
      interestRate: 7,
      minimumAmmount: 100000,
      minimumPeriod: 6,
      moveTo: '',
      selectedProduct: '예금 상품',
    },
    {
      name: '정기예금 2번 상품',
      interestRate: 10,
      minimumAmmount: 500000,
      minimumPeriod: 12,
      moveTo: '',
      selectedProduct: '예금 상품',
    },
    {
      name: '정기예금 3번 상품',
      interestRate: 12,
      minimumAmmount: 1000000,
      minimumPeriod: 24,
      moveTo: '',
      selectedProduct: '예금 상품',
    },
  ];
  const SavingsProducts = [
    {
      name: '정기적금 1번 상품',
      interestRate: 5,
      minimumAmmount: 10000,
      minimumPeriod: 6,
      moveTo: '',
      selectedProduct: '적금 상품',
    },
    {
      name: '정기적금 2번 상품',
      interestRate: 7,
      minimumAmmount: 100000,
      minimumPeriod: 12,
      moveTo: '',
      selectedProduct: '적금 상품',
    },
    {
      name: '정기적금 3번 상품',
      interestRate: 10,
      minimumAmmount: 500000,
      minimumPeriod: 24,
      moveTo: '',
      selectedProduct: '적금 상품',
    },
  ];

  return (
    <div>
      <TopBar title='계좌 개설' showXButton={false} />

      <div className='mt-4 border-b-2'>
        <KeywordButtons
          keywords={keywords}
          onKeywordClick={keywordClick}
          keywordBtnColor={selectedKeyword}
        />
      </div>

      <div className='flex flex-col items-center justify-center'>
        {selectedKeyword === '예금 상품' ? (
          <div>
            {DepositProducts.map((product, index) => (
              <AccountDepositProduct
                key={index}
                name={product.name}
                interestRate={product.interestRate}
                minimumAmount={product.minimumAmmount}
                minimumPeriod={product.minimumPeriod}
                moveTo={product.moveTo}
                selectedProduct={product.selectedProduct}
              />
            ))}
          </div>
        ) : (
          <div>
            {SavingsProducts.map((product, index) => (
              <AccountDepositProduct
                key={index}
                name={product.name}
                interestRate={product.interestRate}
                minimumAmount={product.minimumAmmount}
                minimumPeriod={product.minimumPeriod}
                moveTo={product.moveTo}
                selectedProduct={product.selectedProduct}
              />
            ))}
          </div>
        )}
        ;
        {/* {ProductsList.map((product, index) => (
                <AccountProduct 
                    key={index}
                    name={product.name}
                    description={product.description}
                    moveTo={product.moveTo}
                />                
            ))} */}
        ={' '}
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default AccountDepositProducts;
