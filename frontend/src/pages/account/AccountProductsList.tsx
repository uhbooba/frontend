import TopBar from '@/components/layouts/TopBar';
import AccountProduct from '@/components/common/AccountProduct';
import { useSetAtom } from 'jotai';
import { createAccountMissionAtom } from '@/atoms/account/accountCheckAtoms';
import { selectedKeywordAtom } from '@/atoms/deposit/depositDataAtoms';
import { useNavigate } from 'react-router';
import { postUserFreeAccount } from '@/services/account';
import MainWrapper from '@/components/layouts/MainWrapper';
import {
  getMissionClearStatus,
  setMissionClearStatus,
} from '@/services/mission';
import TitleText from '@/components/common/TitleText';
import Button from '@/components/common/buttons/Button';
import { useState } from 'react';

interface ProductItem {
  name: string;
  description: string;
  moveTo: string;
}

const AccountProductsList = () => {
  const setSelectedKeyword = useSetAtom(selectedKeywordAtom);
  const setIsMissionCleared = useSetAtom(createAccountMissionAtom);
  const navigate = useNavigate();
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const ProductsList = [
    {
      name: '수시입출금 통장',
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

  const handleProductClick = async (product: ProductItem) => {
    if (product.name === '수시입출금 통장') {
      try {
        // 계좌 생성 요청
        const response = await postUserFreeAccount();
        console.log(response);

        if (response?.status === 200) {
          // 계좌 생성 성공 후 미션 상태 확인
          const missionStatus = await getMissionClearStatus(2);
          if (!missionStatus?.result) {
            await setMissionClearStatus(2);
            setIsMissionCleared(true);
          }

          // 계좌 조회 페이지로 이동
          navigate(product.moveTo);
        }
      } catch (error: any) {
        // 400 Bad Request 에러 처리
        if (error.response?.status === 400) {
          setErrorModalVisible(true); // 경고 모달 표시
        } else {
          console.error('계좌 생성 중 오류 발생:', error);
        }
      }
    } else {
      setSelectedKeyword(
        product.name.includes('예금') ? '예금 상품' : '적금 상품',
      );
      navigate(product.moveTo);
    }
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
      {errorModalVisible && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-[320px] rounded bg-white p-6 text-center shadow-md'>
            <TitleText>
              이미 계좌가 <br /> 존재합니다.
            </TitleText>
            <Button
              label='닫기'
              color='red'
              size='customMedium'
              className='text-white'
              onClick={() => setErrorModalVisible(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountProductsList;
