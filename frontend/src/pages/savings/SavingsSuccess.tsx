import { BottomTab } from '@/components/layouts/BottomTab';
import Button from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import { useNavigate } from 'react-router';
import { createSavingsAccount, getSavingsProducts } from '@/services/saving';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import {
  savingAccountAtom,
  selectedSavingsProductAtom,
  withdrawalAccountAtom,
  selectMoneyAtom,
} from '@/atoms/savings/savingsDataAtoms';

const SavingsSuccess = () => {
  const navigate = useNavigate();
  const [selectedSavingProduct] = useAtom(selectedSavingsProductAtom); // 예금상품명 가져오기
  const setSavingAccount = useSetAtom(savingAccountAtom); // 예금 계좌정보 저장할곳
  const [withdrawalAccount] = useAtom(withdrawalAccountAtom); // 출금계좌 정보 가져올것
  const [selectMoney] = useAtom(selectMoneyAtom); // 예치 금액 가져오기
  const [accountTypeUniqueNo, setAccountTypeUniqueNo] = useState<string | null>(
    null,
  ); // 사용자가 고른 상품과 동일한 이름의 예금상품 유니크이름 저장하기

  // 적금상품전체조회api부터 해야함
  useEffect(() => {
    const fetchAccountTypeUniqueNo = async () => {
      if (!selectedSavingProduct) {
        console.error('선택된 적금 상품이 없습니다.');
        return;
      }

      try {
        const response = await getSavingsProducts();
        const products = response?.data?.result || [];

        // 선택된 상품명과 일치하는 상품 정보 찾기
        const selectedProductInfo = products.find(
          (product: any) => product.accountName === selectedSavingProduct.name,
        );

        if (selectedProductInfo) {
          setAccountTypeUniqueNo(selectedProductInfo.accountTypeUniqueNo); // 선택된 상품의 고유 번호 저장
        }
      } catch (error) {
        console.error('api 호출 자체 에러', error);
      }
    };

    fetchAccountTypeUniqueNo();
  }, [selectedSavingProduct]);

  // 이건 적금계좌 생성 api 하는거
  useEffect(() => {
    const createAccount = async () => {
      if (!selectedSavingProduct) {
        console.error('선택된 적금 상품이 없습니다.');
        return;
      }

      try {
        // 금액버튼 문자열이니까 쉼표도 없애고 숫자로 바꿔줘야됨
        if (!selectMoney) {
          console.error('유효한 예치 금액이 없습니다.');
          return;
        }
        const savingBalance = parseInt(selectMoney.replace(/,/g, ''), 10);
        const response = await createSavingsAccount(
          withdrawalAccount!.accountNo,
          accountTypeUniqueNo!,
          savingBalance,
        );

        if (response?.data?.result) {
          setSavingAccount(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (accountTypeUniqueNo) {
      createAccount(); // 고유번호 가져왔으면 이제 적금 계좌 생성 api 쓰기
    }
  }, [
    setSavingAccount,
    selectedSavingProduct,
    withdrawalAccount,
    selectMoney,
    accountTypeUniqueNo,
  ]);

  const GoNext = () => {
    navigate('/');
  };

  return (
    <div>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='계좌 생성' showBackButton={false} />
      </div>

      {/* 배경 이미지 설정 */}
      <div
        className='relative mt-16 flex flex-grow flex-col justify-between px-4 pt-8'
        style={{
          backgroundImage: `url("/assets/images/coin_rain.png")`,
          backgroundSize: '440px auto',
          backgroundPosition: 'center -50px',
          // 이미지 한장만 나오게하고싶으면 나중ㅇ테 이거 주석 해제하면 됨
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div className='mt-4 text-center'>
          <p className='text-5xl font-bold'>적금 상품</p>
          <p className='mt-2 text-5xl font-bold'>가입 성공</p>
        </div>

        {/* 말풍선 부분 */}
        <div className='relative mt-24 w-[280px]'>
          <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-6'>
            <p className='text-start text-xl text-black'>
              적금 상품 가입 완료!
            </p>
            <p className='mt-2 text-start text-xl text-black'>
              이제 매달 열심히 넣으면
            </p>
            <p className='mt-4 text-start text-xl text-black'>
              나중에는 큰 목돈이 되서
            </p>
            <p className='text-start text-xl text-black'>돌아올거야!</p>

            {/* 말풍선 꼬리 부분 */}
            <div className='absolute bottom-[-22px] left-[70%] -translate-x-1/2 transform'>
              {/* 바깥쪽 삼각형*/}
              <div className='h-0 w-0 border-l-[22px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300'></div>

              {/* 안쪽 삼각형*/}
              <div className='absolute left-[50%] top-[-1px] h-0 w-0 -translate-x-1/2 transform border-l-[20px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100'></div>
            </div>

            {/* Tip! 삼각형 자체를 테두리로 만들어야해서, 삼각형에 테두리를 주려면 크기와 색깔이 다른 삼각형을 겹쳐서 만들어야 한다. */}
          </div>
        </div>

        {/* 돼지 이미지 */}
        <div className='mb-4 flex justify-end'>
          <img
            src='/assets/images/finish_j_pig.png'
            alt='Pig'
            className='h-60 w-60'
          />
        </div>

        {/* 버튼 */}
        <div className='mb-3'>
          <Button
            label='메인화면으로 이동하기'
            size='large'
            color='orange'
            className='w-full py-4'
            onClick={() => GoNext()}
          />
        </div>
      </div>

      {/* 바텀탭 */}
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default SavingsSuccess;
