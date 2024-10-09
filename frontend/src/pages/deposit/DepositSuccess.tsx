import Button from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import { useNavigate } from 'react-router';
import { createDepositAccount, getDepositProducts } from '@/services/deposit';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import {
  depositAccountAtom,
  selectedDepositProductAtom,
  withdrawalAccountAtom,
  selectMoneyAtom,
  depositPasswordAtom,
} from '@/atoms/deposit/depositDataAtoms';
import MainWrapper from '@/components/layouts/MainWrapper';

const DepositSuccess = () => {
  const navigate = useNavigate();
  const [selectedDepositProduct] = useAtom(selectedDepositProductAtom); // 예금상품명 가져오기
  const [, setDepositAccount] = useAtom(depositAccountAtom); // 예금 계좌정보 저장할곳
  const [withdrawalAccount] = useAtom(withdrawalAccountAtom); // 출금계좌 정보 가져올것
  const [selectMoney] = useAtom(selectMoneyAtom); // 예치 금액 가져오기
  const [accountTypeUniqueNo, setAccountTypeUniqueNo] = useState<string | null>(
    null,
  ); // 사용자가 고른 상품과 동일한 이름의 예금상품 유니크이름 저장하기
  const [depositPassword] = useAtom(depositPasswordAtom); // 패스워드아톰

  // 예금상품전체조회api부터 해야함
  useEffect(() => {
    const fetchAccountTypeUniqueNo = async () => {
      if (!selectedDepositProduct) {
        console.error('선택된 예금 상품이 없습니다.');
        return;
      }

      try {
        const response = await getDepositProducts();
        const products = response?.data?.result || [];

        // 선택된 상품명과 일치하는 상품 정보 찾기
        const selectedProductInfo = products.find(
          (product: any) => product.accountName === selectedDepositProduct.name,
        );

        if (selectedProductInfo) {
          setAccountTypeUniqueNo(selectedProductInfo.accountTypeUniqueNo); // 선택된 상품의 고유 번호 저장
        }
      } catch (error) {
        console.error('api 호출 자체 에러', error);
      }
    };

    fetchAccountTypeUniqueNo();
  }, [selectedDepositProduct]);

  // 이건 예금계좌 생성
  useEffect(() => {
    const createAccount = async () => {
      if (!selectedDepositProduct) {
        console.error('선택된 예금 상품이 없습니다.');
        return;
      }

      try {
        if (!selectMoney) {
          console.error('예치 금액이 없습니다.');
          return;
        }

        // 금액버튼 문자열이니까 쉼표도 없애고 숫자로 바꿔줘야됨
        const depositBalance = parseInt(selectMoney.replace(/,/g, ''), 10);

        // 예금계좌 생성 api 호출
        const response = await createDepositAccount(
          withdrawalAccount!.accountNo,
          accountTypeUniqueNo!,
          depositBalance,
          depositPassword,
        );

        if (response?.data?.result) {
          setDepositAccount(response.data.result);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (accountTypeUniqueNo) {
      createAccount(); // 고유번호 가져왔으면 이제 예금 계좌 생성 api 쓰기
    }
  }, [
    setDepositAccount,
    selectedDepositProduct,
    withdrawalAccount,
    selectMoney,
    accountTypeUniqueNo,
    depositPassword,
  ]);

  const GoNext = () => {
    navigate('/');
  };

  return (
    <div>
      <TopBar title='예금 가입' showBackButton={false} />

      <MainWrapper>
        {/* 배경 이미지 설정 */}
        <div
          className='relative flex flex-grow flex-col justify-between px-4 pt-8'
          style={{
            backgroundImage: `url("/assets/images/money_rain.png")`,
            backgroundSize: '420px auto',
            backgroundPosition: 'center -50px',
            // 이미지 한장만 나오게하고싶으면 나중에 이거 주석 해제하면 됨
            // backgroundRepeat: "no-repeat",
          }}
        >
          <div className='text-center'>
            <p className='text-5xl font-bold'>예금 상품</p>
            <p className='mt-2 text-5xl font-bold'>가입 성공</p>
          </div>

          {/* 말풍선 부분 */}
          <div className='relative mt-24 w-[290px] font-bold'>
            <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-6'>
              <p className='text-start text-xl text-black'>
                예금 상품 가입 완료!
              </p>
              <p className='mt-2 text-start text-xl text-black'>
                이제 만기일까지 기다리면
              </p>
              <p className='mt-4 text-start text-xl text-black'>
                나중에 많은 이자와 함께
              </p>
              <p className='text-start text-xl text-black'>
                목돈이 돌아올거야!
              </p>

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

          <div className='mt-auto'>
            {/* 돼지 이미지 */}
            <div className='mb-4 flex justify-end'>
              <img
                src='/assets/images/finish_pig.png'
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
        </div>
      </MainWrapper>
    </div>
  );
};

export default DepositSuccess;
