import TopBar from '@/components/layouts/TopBar';
import AccountProduct from '@/components/common/AccountProduct';
import { useSetAtom } from 'jotai';
import { selectedKeywordAtom } from '@/atoms/deposit/depositDataAtoms';
import { useNavigate } from 'react-router';
import { postUserFreeAccount } from '@/services/account';
import MainWrapper from '@/components/layouts/MainWrapper';

interface ProductItem {
  name: string;
  description: string;
  moveTo: string;
}

const AccountProductsList = () => {
  const setSelectedKeyword = useSetAtom(selectedKeywordAtom);
  const navigate = useNavigate();

  const ProductsList = [
    {
      name: '자유입출금 통장',
      description: '돈을 자유롭게 입금하고 출금해요.',
      moveTo: '/account/check',
    },
    {
      name: '정기 예금',
      description: '목돈을 맡겨두고 높은 이자를 받아요.',
      moveTo: '/account/products/deposit',
    },
    {
      name: '정기 적금',
      description: '일정 주기마다 정해진 금액을 맡겨요.',
      moveTo: '/account/products/deposit',
    },
  ];

  const handleProductClick = (product: ProductItem) => {
    if (product.name === '자유입출금 통장') {
      const createDemandDeposit = () => {
        try {
          postUserFreeAccount();
        } catch (error) {
          console.error('Error fetching answer:', error);
        }
      };
      createDemandDeposit();
      navigate(product.moveTo);
    }
    setSelectedKeyword(
      product.name.includes('예금') ? '예금 상품' : '적금 상품',
      // 클릭한거에 예금이 있으면 예금상품 버튼을 보여주고, 아니면 적금상품 버튼을 보여줌
      // 다음 페이지 들어가서 예금상품과 적금상품 버튼 무엇 클릭할지 결정하는거임
    );
    navigate(product.moveTo);
  };

  return (
    <div>
      <TopBar title='계좌 개설' showXButton={false} />
      <MainWrapper>
        <div className='flex flex-col items-center justify-center'>
          {ProductsList.map((product, index) => (
            <AccountProduct
              key={index}
              name={product.name}
              description={product.description}
              moveTo={product.moveTo}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </MainWrapper>
    </div>
  );
};

export default AccountProductsList;
