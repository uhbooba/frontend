import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import BigModal from '@/components/modals/Big_Modal';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';

const DepositSignup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    idNumber: '',
    phoneNumber: '',
    accountNumber: '',
  });
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {
      name: '',
      idNumber: '',
      phoneNumber: '',
      accountNumber: '',
    };

    let isValid = true;

    if (!name || !/^[가-힣]+$/.test(name)) {
      newErrors.name = '한글만 입력이 가능합니다.';
      isValid = false;
    }
    if (!idNumber || !/^\d+$/.test(idNumber)) {
      newErrors.idNumber = '숫자만 입력 가능합니다.';
      isValid = false;
    }
    if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
      newErrors.phoneNumber = '숫자만 입력 가능합니다.';
      isValid = false;
    }
    if (!accountNumber || !/^\d+$/.test(accountNumber)) {
      newErrors.accountNumber = '숫자만 입력 가능합니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const OpenModal = () => {
    if (validateInputs()) {
      setIsModalOpen(true);
    }
  };

  const GoBack = () => {
    navigate(-1);
  };

  const ModalConfirm = () => {
    setIsModalOpen(false);
    navigate('/deposit/money');
  };

  const ModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='w-full overflow-x-hidden'>
      <TopBar title='예금 가입2 - 개인정보 입력' />

      <div className='mb-8 mt-4 bg-gray-400 py-4 text-center'>단계표시바</div>

      <div className='ml-4 mr-4'>
        <Input
          label='이름'
          variant='full'
          placeholder='이름을 입력하세요'
          value={name}
          onChange={(e) => setName(e.target.value)}
          isError={!!errors.name}
          className='mb-2'
        />
        {errors.name && <p className='mb-4 text-red-500'>{errors.name}</p>}

        <Input
          label='주민등록번호'
          variant='full'
          placeholder='주민등록번호를 입력하세요'
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          isError={!!errors.idNumber}
          className='mb-2'
        />
        {errors.idNumber && (
          <p className='mb-4 text-red-500'>{errors.idNumber}</p>
        )}

        <Input
          label='전화번호'
          variant='full'
          placeholder='전화번호를 입력하세요'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          isError={!!errors.phoneNumber}
          className='mb-2'
        />
        {errors.phoneNumber && (
          <p className='mb-4 text-red-500'>{errors.phoneNumber}</p>
        )}

        <Input
          label='계좌번호'
          variant='full'
          placeholder='계좌번호를 입력하세요'
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          isError={!!errors.accountNumber}
          className='mb-2'
        />
        {errors.accountNumber && (
          <p className='mb-4 text-red-500'>{errors.accountNumber}</p>
        )}
      </div>

      <div className='absolute bottom-24 left-0 flex w-full justify-between space-x-4 px-4'>
        <Button
          label='이전'
          size='large'
          color='orange'
          className='flex-grow'
          onClick={() => GoBack()}
        />
        <Button
          label='다음'
          size='medium'
          color='orange'
          className='flex-grow'
          onClick={() => OpenModal()}
        />
      </div>

      <BigModal
        isOpen={isModalOpen}
        ModalClose={ModalClose}
        GoNext={ModalConfirm}
        imageSrc='/assets/icons/warning.png'
        title='교육용 어플입니다.'
        description={
          <>
            <p className='font-bold'>
              모든 정보를 정확하게 입력했는지 <br />
              다시 한 번 확인해주세요.
            </p>
            <br />
            실제 은행 예금 상품을 가입할 때는 <br />
            더 많은 정보를 입력해야 합니다. <br />
            해당 어플은 교육용 어플이기 때문에 <br />
            실제보다 적은 정보만 입력했습니다. <br />
          </>
        }
      />
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default DepositSignup;
