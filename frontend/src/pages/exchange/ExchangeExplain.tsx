import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';
import TitleText from '@/components/common/TitleText';

const ExchangeExplain = () => {
  const navigate = useNavigate();

  const GoAgree = () => {
    navigate('/exchange/agree');
  };

  return (
    <div>
      <TopBar title='환전' />
      <MainWrapper>
        <div>
          <div className='text-center'>
            <TitleText>환전이란?</TitleText>
          </div>
          <div className=''>
            <p className='ml-4 mt-2 text-start text-lg font-bold'>
              우리나라 돈(원화)을 외국돈(외화)으로 바꾸거나 <br />
              외국돈을 우리나라 돈으로 바꾸는 것을 말해요.
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              환전할 때는{' '}
              <span className='font-bold text-yellow-400'>환율</span>을 꼭
              확인해야 해요!!
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              <span className='font-bold text-yellow-400'>환율이 낮을 때</span>{' '}
              환전하면{' '}
              <span className='font-bold text-yellow-400'>더 많은 돈</span>을{' '}
              <br />
              받을 수 있어요.
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              <span className='font-bold text-yellow-400'>환율이 높을 때</span>{' '}
              환전하면{' '}
              <span className='font-bold text-yellow-400'>더 적은 돈</span>을{' '}
              <br />
              받게 됩니다.
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              해외여행을 갈 때 꼭 필요한 과정이에요.
            </p>
          </div>
        </div>

        {/* 말풍선 부분 */}
        <div className='relative ml-16 mt-8 w-[255px]'>
          <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-3'>
            <p className='text-center text-lg text-black'>
              외국에 가기 전에는 미리미리
            </p>
            <p className='text-center text-lg text-black'>
              환율을 체크해서 환전해두자!
            </p>

            {/* 말풍선 꼬리 부분 */}
            <div className='absolute bottom-[-22px] left-[80%] -translate-x-1/2 transform'>
              {/* 바깥쪽 삼각형*/}
              <div className='h-0 w-0 border-l-[22px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300'></div>

              {/* 안쪽 삼각형*/}
              <div className='absolute left-[50%] top-[-1px] h-0 w-0 -translate-x-1/2 transform border-l-[20px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100'></div>
            </div>

            {/* Tip! 삼각형 자체를 테두리로 만들어야해서, 삼각형에 테두리를 주려면 크기와 색깔이 다른 삼각형을 겹쳐서 만들어야 한다. */}
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <img
            src='/assets/images/exchange_pigs.png'
            alt='Pig'
            className='ml-32 mt-4 h-56 w-56'
          />
        </div>

        {/* 확인 버튼 */}
        <div className='w-full items-center justify-center p-4'>
          <Button
            label='확인'
            size='large'
            color='orange'
            onClick={() => GoAgree()}
          />
        </div>
      </MainWrapper>
    </div>
  );
};

export default ExchangeExplain;
