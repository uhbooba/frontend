import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import TextBubble from '@/components/common/TextBubble';
import MainWrapper from '@/components/layouts/MainWrapper';
import { exchangeMissionAtom } from '@/atoms/exchangeAtoms';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { makeTTS } from '@/services/education';
import clsx from 'clsx';
import { useState } from 'react';

const ExchangeMission = () => {
  const navigate = useNavigate();
  const setIsMission = useSetAtom(exchangeMissionAtom);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);

  useEffect(() => {
    // 페이지에 들어오면 미션 상태 true
    setIsMission(true);
  }, []);

  const GoExplain = () => {
    navigate('/exchange/explain');
  };

  const playTTS = async () => {
    if (isTTSPlaying) return setIsTTSPlaying(false);
    const text =
      '경로당 모임에서 다음달에 해외여행을 가기로 했습니다. 현재 환율이 낮기 때문에 미리 환전을 해두어야 합니다. 해외여행 경비로 사용할 150달러를 환전해보세요.';

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
      setIsTTSPlaying(false);
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
    <div className='flex flex-col bg-yellow-100'>
      <TopBar title='환전' />
      <MainWrapper>
        <div className='flex flex-col items-center justify-center'>
          <TextBubble
            bubbleSize='w-11/12'
            content={
              <>
                <p className='text-4xl font-bold'>7단계 미션</p> <br />
                <p className='text-2xl'>
                  이수자 할아버지는 <br />
                  경로당에서 해외여행을 <br />
                  준비 중입니다. <br />
                  해외에서 사용할 경비를 <br />
                  <span className='text-bold text-primary'>150달러</span>로
                  환전하려고
                  <br /> 합니다.
                </p>
                <br />
                <p className='text-4xl font-bold'>
                  원화를 달러로 <br />
                  환전하세요!
                </p>
                <div className='ml-8 mr-8 flex'>
                  <Button
                    label='환전하러가기'
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
                    onClick={playTTS} // 스피커 아이콘 클릭 시 TTS 재생
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
              </>
            }
          />
          <div className='flex items-center justify-center'>
            <img
              src='/assets/images/pig.png'
              alt='Pig'
              className='mt-4 h-56 w-56'
              loading='lazy'
            />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default ExchangeMission;
