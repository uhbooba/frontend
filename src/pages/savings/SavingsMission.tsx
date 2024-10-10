import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';
import { useEffect, useState } from 'react';
import { makeTTS } from '@/services/education';
import clsx from 'clsx';

const SavingsMission = () => {
  const navigate = useNavigate();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);

  const GoExplain = () => {
    navigate('/savings');
  };

  const playTTS = async () => {
    if (isTTSPlaying) return setIsTTSPlaying(false); // 재생 중이면 중단

    const text =
      '내년에 손주와 손녀들과 해외여행을 가기로 했습니다. 여행경비 마련을 위해 지금부터 조금씩 돈을 모으고자 합니다. 매달 돈을 조금씩 모아 만기에 큰 돈을 받을 수 있는 적금 상품을 가입해보세요.';

    try {
      const blob = await makeTTS(text);

      const audioUrl = window.URL.createObjectURL(blob);

      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
      setIsTTSPlaying(true);
      newAudio.play();
      newAudio.onended = () => {
        setIsTTSPlaying(false);
      };
    } catch (error) {
      console.error('TTS 오류', error);
    }
  };

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  return (
    <div className='bg-yellow-100'>
      <TopBar title='적금 가입' />
      <MainWrapper>
        {/* 돼지 말풍선 부분 */}
        <div className='relative flex flex-col items-center'>
          {/* 말풍선 스타일 적용 */}
          <div className='relative mt-8 h-[460px] w-[360px] rounded-lg bg-white'>
            <div className='mt-8 text-center'>
              <p className='text-4xl font-bold'>4단계 미션</p> <br />
              <p className='text-2xl'>
                이수자 할아버지는 <br />
                목돈을 마련하기 위해서 <br />
                매월 자동납부를 이용한 <br />
                <span className='text-yellow-400'>적금상품</span>을 가입하려고
                합니다.
              </p>
              <br />
              <p className='text-4xl font-bold'>
                3가지 상품 중에서 <br />
                적금상품 하나를 <br />
                가입해보세요!
              </p>
              <div className='flex pl-8 pr-8'>
                <Button
                  label='가입하러가기'
                  size='small'
                  color='orange'
                  onClick={() => GoExplain()}
                  className='mt-4'
                />
                <div
                  className={clsx([
                    'ml-3 mt-4 w-14 cursor-pointer rounded-full p-3',
                    isTTSPlaying ? 'bg-blue-700' : 'bg-blue-500',
                  ])}
                  onClick={playTTS}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-9 text-white'
                  >
                    <path d='M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z' />
                    <path d='M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z' />
                  </svg>
                </div>
              </div>
            </div>

            {/* 말풍선 꼬리 부분 */}
            <div className='absolute bottom-[-29px] left-[155px] h-0 w-0 border-l-[30px] border-r-[30px] border-t-[30px] border-solid border-l-transparent border-r-transparent border-t-white'></div>
          </div>

          {/* 돼지 이미지 */}
          <div className='flex items-center justify-center'>
            <img
              src='/assets/images/pig.png'
              alt='pig'
              className='mt-4 h-56 w-56'
            />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default SavingsMission;
