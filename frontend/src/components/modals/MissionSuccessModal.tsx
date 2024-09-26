import Button from '../common/buttons/Button';

interface MissionSuccessModalProps {
  name?: string;
  onConfirm: () => void;
}

const MissionSuccessModal: React.FC<MissionSuccessModalProps> = ({
  name,
  onConfirm,
}) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='flex w-10/12 max-w-md flex-col items-center rounded-xl bg-white text-center text-lg'>
        <div className='px-6 py-8'>
          <p>{name ? `${name} ` : ''}미션에 성공하셨습니다.</p>
          <p>다음 미션에 도전해보세요!</p>
          <img
            src='/assets/images/mission_stamp.png'
            className='mx-auto my-8 h-56'
            alt='미션 성공 스탬프'
          />
        </div>
        <div className='w-2/3 border-t border-dashed py-8'>
          <Button
            label='확인'
            color='green'
            className='py-3'
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default MissionSuccessModal;
