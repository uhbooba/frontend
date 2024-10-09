import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import {
  depositPasswordAtom,
  selectedDepositProductAtom,
  withdrawalAccountAtom,
  selectMoneyAtom,
} from '@/atoms/deposit/depositDataAtoms';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { getUserInfo, checkPassword } from '@/services/auth';
import NoModal from '@/components/modals/NoModal';
import MainWrapper from '@/components/layouts/MainWrapper';
import { createDepositAccount, getDepositProducts } from '@/services/deposit';

const DepositPassword = () => {
  const navigate = useNavigate();
  const [, setDepositPassword] = useAtom(depositPasswordAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputKey, setInputKey] = useState(0); // PasswordInput 리렌더링을 위한 고유 키값 설정
  const [selectedDepositProduct] = useAtom(selectedDepositProductAtom);
  const [withdrawalAccount] = useAtom(withdrawalAccountAtom);
  const [selectMoney] = useAtom(selectMoneyAtom);
  const [accountTypeUniqueNo, setAccountTypeUniqueNo] = useState<string | null>(
    null,
  );

  useEffect(() => {
    // 예금 상품 고유번호를 가져오는 api 부르기
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
        console.error('api 호출 중 에러', error);
      }
    };

    fetchAccountTypeUniqueNo();
  }, [selectedDepositProduct]);

  const passwordComplete = async (password: string) => {
    try {
      const userInfo = await getUserInfo();
      const userId = userInfo.result.id;

      // 비밀번호 확인 api 요청
      const isPasswordCorrect = await checkPassword(userId, password);

      if (isPasswordCorrect) {
        setDepositPassword(password); // 비밀번호 저장

        // 금액에서 쉼표 제거하고 숫자로 변환
        const depositBalance = parseInt(selectMoney.replace(/,/g, ''), 10);

        // 예금 계좌 생성 API 호출
        const response = await createDepositAccount(
          withdrawalAccount!.accountNo,
          accountTypeUniqueNo!,
          depositBalance,
          password,
        );

        if (response?.data?.statusCode === 200) {
          // 성공응답오면 강입 성공 페이지로 이동
          navigate('/deposit/success');
        } else {
          // 실패응답 오면 비번 틀렷다고 모달 뜨게하기
          setIsModalOpen(true);
        }
      } else {
        // 비밀번호가 틀리면 모달 표시
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('비번오류 또는 계좌생성api 오류', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputKey((prevKey) => prevKey + 1); // PasswordInput 컴포넌트 리렌더링 시키기
  };

  return (
    <div>
      <TopBar title='예금 가입' />
      <MainWrapper>
        <div className='mb-2 mt-20'>
          <LevelBar currentLevel={5} totalLevel={5} />
        </div>

        <PasswordInput key={inputKey} onComplete={passwordComplete} />

        <NoModal
          isOpen={isModalOpen}
          ModalClose={closeModal}
          imageSrc='/assets/icons/warning.png'
          title='비밀번호 오류'
          description='비밀번호가 틀립니다.'
        />
      </MainWrapper>
    </div>
  );
};

export default DepositPassword;
