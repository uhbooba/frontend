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
      <div className='flex h-2/3 w-10/12 flex-col items-center rounded-xl bg-white text-center text-xl'>
        <div className='mt-8'>
          <p>{name} 미션에 성공하셨습니다.</p>
          <p>다음 미션에 도전해보세요!</p>
          <img src='/assets/images/mission_stamp.png' className='w-72 py-10' />
        </div>

        <div className='mb-8 flex h-full w-full items-end justify-center border-t-2 border-dashed'>
          <Button
            label='확인'
            color='green'
            className='h-fit w-2/3'
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default MissionSuccessModal;
