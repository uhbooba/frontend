import KeywordButtons from '@/components/common/KeywordButtons';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import { useNavigate } from 'react-router';
import AccountDepositProduct from '@/components/common/AccountDepositProduct';
import { useAtom, useSetAtom } from 'jotai';
import {
  selectedDepositProductAtom,
  selectedKeywordAtom,
} from '@/atoms/deposit/depositDataAtoms';
import { selectedSavingsProductAtom } from '@/atoms/savings/savingsDataAtoms';
import { getMissionClearStatus } from '@/services/mission';

const AccountDepositProducts = () => {
  const [selectedKeyword, setSelectedKeyword] = useAtom(selectedKeywordAtom);
  const setSelectedDepositProduct = useSetAtom(selectedDepositProductAtom);
  const setSelectedSavingsProduct = useSetAtom(selectedSavingsProductAtom);
  const navigate = useNavigate();

  const keywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  const keywords = ['예금 상품', '적금 상품'];

  const DepositProducts = [
    {
      name: '정기예금 1번 상품',
      interestRate: 7,
      minimumAmount: 100000,
      minimumPeriod: 3,
      moveTo: '/deposit/explain',
      selectedProduct: '예금 상품',
      earlyInterestRate: 1,
    },
    {
      name: '정기예금 2번 상품',
      interestRate: 10,
      minimumAmount: 500000,
      minimumPeriod: 6,
      moveTo: '/deposit/explain',
      selectedProduct: '예금 상품',
      earlyInterestRate: 2,
    },
    {
      name: '정기예금 3번 상품',
      interestRate: 12,
      minimumAmount: 1000000,
      minimumPeriod: 12,
      moveTo: '/deposit/explain',
      selectedProduct: '예금 상품',
      earlyInterestRate: 3,
    },
  ];
  const SavingsProducts = [
    {
      name: '정기적금 1번 상품',
      interestRate: 5,
      minimumAmount: 10000,
      minimumPeriod: 3,
      moveTo: '/savings/mission',
      selectedProduct: '적금 상품',
      earlyInterestRate: 1,
    },
    {
      name: '정기적금 2번 상품',
      interestRate: 7,
      minimumAmount: 100000,
      minimumPeriod: 6,
      moveTo: '/savings/mission',
      selectedProduct: '적금 상품',
      earlyInterestRate: 2,
    },
    {
      name: '정기적금 3번 상품',
      interestRate: 10,
      minimumAmount: 500000,
      minimumPeriod: 12,
      moveTo: '/savings/mission',
      selectedProduct: '적금 상품',
      earlyInterestRate: 3,
    },
  ];

  const handleProductClick = async (product: {
    name: string;
    interestRate: number;
    minimumAmount: number;
    moveTo: string;
    selectedProduct: string;
    earlyInterestRate: number;
  }) => {
    if (product.selectedProduct === '예금 상품') {
      setSelectedDepositProduct({
        name: product.name,
        interestRate: product.interestRate,
        minimumAmount: product.minimumAmount,
        earlyInterestRate: product.earlyInterestRate,
      });

      navigate(product.moveTo);
    } else {
      try {
        const response = await getMissionClearStatus(4); // 적금 가입은 4단계 미션

        setSelectedSavingsProduct({
          name: product.name,
          interestRate: product.interestRate,
          minimumAmount: product.minimumAmount,
          earlyInterestRate: product.earlyInterestRate,
        });

        if (response?.result === true) {
          // 4단계 미션 클리어했으면 바로 적금가입 페이지로 이동
          navigate('/savings');
        } else {
          // 4단계 미션 클리어 안했으면 미션 페이지로 이동
          navigate(product.moveTo);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

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
                minimumAmount={product.minimumAmount}
                minimumPeriod={product.minimumPeriod}
                moveTo={product.moveTo}
                selectedProduct={product.selectedProduct}
                onClick={() => handleProductClick(product)}
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
                minimumAmount={product.minimumAmount}
                minimumPeriod={product.minimumPeriod}
                moveTo={product.moveTo}
                selectedProduct={product.selectedProduct}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}

        {/* {ProductsList.map((product, index) => (
                <AccountProduct 
                    key={index}
                    name={product.name}
                    description={product.description}
                    moveTo={product.moveTo}
                />                
            ))} */}
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default AccountDepositProducts;
