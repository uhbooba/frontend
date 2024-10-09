import { useNavigate } from 'react-router';
import Button from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';

const SmishingAgree = () => {
  const navigate = useNavigate();

  const GoEdu = () => {
    navigate('/education');
  };

  return (
    <div>
      <TopBar title='약관 동의' onXButtonClick={GoEdu} />

      <MainWrapper>
        <h3 className='mb-4 text-4xl font-bold'>모의 상황 안내</h3>
        <ul className='space-y-2 text-2xl'>
          <li>
            • 본 서비스에서 제공되는 모든 자료 및 콘텐츠는 가상의 시나리오에
            기초한 것으로,
            <span className='font-bold text-primary'>실제 상황과 무관</span>
            합니다.
          </li>
          <li>
            • 모든 시나리오, 이벤트, 데이터는
            <span className='font-bold text-primary'> 가상의 사례</span>를
            기반으로 제공됩니다.
          </li>
          <li>
            • 사용자는 본 서비스에서 발생하는 모든 활동에 대해 법적 효력이
            없음을 인정하며, 이에 따른 문제 발생 시 서비스 제공자에게 법적
            책임을 묻지 않을 것을 동의합니다.
          </li>
        </ul>
        <p className='mt-8 text-center text-2xl text-gray-700'>
          위 <span className='font-bold text-primary'>약관에 동의</span>하며,
          <br /> 본 서비스가 실제와 무관한 모의 상황을 다룬다는 점을 이해합니다.
        </p>
        <div className='mb-2 flex w-full items-center justify-center p-4'>
          <Button
            label='확인'
            size='medium'
            color='orange'
            onClick={() => navigate('/prevention/messages')}
            className='ml-2'
          />
        </div>
      </MainWrapper>
    </div>
  );
};

export default SmishingAgree;
