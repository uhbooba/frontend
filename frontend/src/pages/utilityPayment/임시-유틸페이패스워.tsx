import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import { postUtilityPay } from '@/services/utility';
import { useAtom } from 'jotai';
import { utilityDataAtom } from '@/atoms/utilityAtoms';
import MainWrapper from '@/components/layouts/MainWrapper';
import TitleText from '@/components/common/TitleText';
import NoModal from '@/components/modals/NoModal';
import { useState } from 'react';
import axios from 'axios';

const UtilityPayPassword2222 = () => {
  const navigate = useNavigate();

  const [utilityData] = useAtom(utilityDataAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputKey, setInputKey] = useState(0);

  const passwordComplete = () => {
    navigate('/utility/success');

    // 환전 시작
    fetchPayUtility();
  };

  const fetchPayUtility = async () => {
    try {
      const response = await postUtilityPay(
        utilityData.corporation,
        utilityData.amount,
      );

      if (response?.data?.statusCode === 200) {
        navigate('/utility/complete');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message === '비밀번호가 맞지 않습니다.') {
          setIsModalOpen(true);
          setInputKey((prevKey) => prevKey + 1);
        }
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <TopBar title='공과금 납부' />
      <MainWrapper>
        <LevelBar currentLevel={3} totalLevel={3} />
        <TitleText className='text-center'>비밀번호 입력</TitleText>
        <PasswordInput onComplete={passwordComplete} key={inputKey} />
      </MainWrapper>
      <NoModal
        isOpen={isModalOpen}
        ModalClose={closeModal}
        imageSrc='/assets/icons/warning.png'
        title='비밀번호 오류'
        description='비밀번호가 틀립니다.'
      />
    </div>
  );
};

export default UtilityPayPassword2222;
