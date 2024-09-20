import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import { useNavigate } from 'react-router';
import BigModal from '@/components/modals/Big_Modal';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import { useEffect, useState } from 'react';
import { validateInputs } from '@/utils/validateInputs';
import TopBar from '@/components/layouts/TopBar';

const DepositSignup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    idNumber: '',
    phoneNumber: '',
  });

  useEffect(() => {
    setIsModalOpen(false);
    setName('');
    setIdNumber('');
    setPhoneNumber('');
    setErrors({
      name: '',
      idNumber: '',
      phoneNumber: '',
    });
  }, [setIsModalOpen, setName, setIdNumber, setPhoneNumber, setErrors]);

  const navigate = useNavigate();

  const OpenModal = () => {
    const { isValid, newErrors } = validateInputs(name, idNumber, phoneNumber);
    setErrors(newErrors);

    if (isValid) {
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
    <div>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='예금 가입' showBackButton={true} showXButton={true} />
      </div>

      <div className='mt-20'>
        <LevelBar currentLevel={2} totalLevel={5} />
      </div>

      <div className='ml-4 mr-4 mt-12'>
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
      </div>

      <div className='mb-2 flex w-full items-center justify-center p-4'>
        <Button
          label='이전'
          size='medium'
          color='orange'
          className='mr-2'
          onClick={() => GoBack()}
        />
        <Button
          label='다음'
          size='medium'
          color='orange'
          className='ml-2'
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