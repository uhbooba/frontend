import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import {
  savingPasswordAtom,
  selectedSavingsProductAtom,
  withdrawalAccountAtom,
  selectMoneyAtom,
} from '@/atoms/savings/savingsDataAtoms';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { getUserInfo, checkPassword } from '@/services/auth';
import { getMissionClearStatus } from '@/services/mission';
import NoModal from '@/components/modals/NoModal';
import MainWrapper from '@/components/layouts/MainWrapper';
import { createSavingsAccount, getSavingsProducts } from '@/services/saving';

const SavingsPassword = () => {
  const navigate = useNavigate();
  const [, setSavingPassword] = useAtom(savingPasswordAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputKey, setInputKey] = useState(0); // PasswordInput 리렌더링을 위한 고유 키값 설정
  const [selectedSavingProduct] = useAtom(selectedSavingsProductAtom);
  const [withdrawalAccount] = useAtom(withdrawalAccountAtom);
  const [selectMoney] = useAtom(selectMoneyAtom);
  const [accountTypeUniqueNo, setAccountTypeUniqueNo] = useState<string | null>(
    null,
  );

  useEffect(() => {
    // 적금 상품 고유번호를 가져오는 API 호출
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
        console.error('API 호출 중 에러', error);
      }
    };

    fetchAccountTypeUniqueNo();
  }, [selectedSavingProduct]);

  const passwordComplete = async (password: string) => {
    try {
      const userInfo = await getUserInfo();
      const userId = userInfo.result.id;

      // 비밀번호 확인 API 요청
      const isPasswordCorrect = await checkPassword(userId, password);

      if (isPasswordCorrect) {
        // 미션 클리어 여부 확인 (미션은 4단계 미션임)
        const missionResponse = await getMissionClearStatus(4);
        await handleCreateSavingsAccount(password); // 적금 계좌 생성

        if (missionResponse.result === true) {
          // 미션 이미 성공했으면 기본 가입 성공 페이지리ㅗ
          navigate('/savings/success');
        } else {
          // 미션 성공 안했으면 미션 및 가입 성공 페이지로
          navigate('/savings/success/mission');
        }
      } else {
        setIsModalOpen(true); // 비밀번호가 틀린 경우 모달 표시
        setInputKey((prevKey) => prevKey + 1); // PasswordInput 리렌더링
      }
    } catch (error) {
      console.error('비밀번호 오류 또는 API 호출 오류', error);
    }
  };

  const handleCreateSavingsAccount = async (password: string) => {
    try {
      // 금액에서 쉼표 제거하고 숫자로 변환
      const savingBalance = parseInt(selectMoney.replace(/,/g, ''), 10);

      // 적금 계좌 생성 API 호출
      const response = await createSavingsAccount(
        withdrawalAccount!.accountNo,
        accountTypeUniqueNo!,
        savingBalance,
        password,
      );

      if (response?.data?.statusCode !== 200) {
        throw new Error('적금 계좌 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('적금 계좌 생성 오류', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <TopBar title='적금 가입' />
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

export default SavingsPassword;
