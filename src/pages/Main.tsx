import Button from '../components/common/Button';
import XButton from '@/components/common/XButton';
import BackButton from '@/components/common/BackButton';

const Main = () => {
  console.log('메인 컴포넌트 렌더링 확인영');
  return (
    <div>
      main
      <br />
      <br />
      <Button label='큰 버튼' size='large' color='orange' className='ml-4' />
      <br />
      <br />
      <br />
      <Button label='작은 버튼' size='small' color='red' className='ml-4' />
      <Button label='작은 버튼' size='small' color='green' className='ml-4' />
      <br />
      <br />
      <br />
      <XButton />
      <br />
      <br />
      <br />
      <BackButton />
    </div>
  );
};

export default Main;
