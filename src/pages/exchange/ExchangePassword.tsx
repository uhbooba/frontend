import { useState } from 'react';
import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import { postExchange } from '@/services/exchange';
import { useAtom } from 'jotai';
import { accountNoAtom, exchangeAmountAtom } from '@/atoms/exchangeAtoms';
import MainWrapper from '@/components/layouts/MainWrapper';
import TitleText from '@/components/common/TitleText';
import axios from 'axios';
import NoModal from '@/components/modals/NoModal';

const ExchangePassword = () => {
  const navigate = useNavigate();
  const [accountNo] = useAtom(accountNoAtom);
  const [amount] = useAtom(exchangeAmountAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputKey, setInputKey] = useState(0);

  const passwordComplete = (password: string) => {
    fetchExchange(password);
  };

  const fetchExchange = async (password: string) => {
    try {
      const response = await postExchange(accountNo, 'USD', amount, password);
      navigate('/exchange/complete', {
        state: { exchangeResult: response.data?.result },
      });
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
      <TopBar title='환전' />
      <MainWrapper>
        <LevelBar currentLevel={4} totalLevel={4} />
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

export default ExchangePassword;
