import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import { useNavigate } from 'react-router';
import { getUserFreeAccount } from '@/services/account';
import MainWrapper from '@/components/layouts/MainWrapper';

const EducationDownload = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [userName, setUserName] = useState<string>('사용자 이름'); // 기본 이름 설정
  const currentDate = new Date().toLocaleDateString();

  const GoEdu = () => {
    navigate('/education');
  };

  // 캔버스 사용해서 이미지 위에 글씨 올리는 구조
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await getUserFreeAccount();
        if (response?.data?.result?.username) {
          setUserName(response.data.result.username); // API로부터 사용자 이름 가져오기
        } else {
          console.error('사용자 이름을 가져올 수 없습니다.');
        }
      } catch (error) {
        console.error('사용자 정보 API 호출 중 오류 발생:', error);
      }
    };

    fetchUserName();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      const image = new Image();
      image.src = '/assets/images/certificate2.png';

      image.onload = () => {
        const originalWidth = image.width;
        const originalHeight = image.height;

        const maxWidth = window.innerWidth * 0.9;
        const scaleRatio = maxWidth / originalWidth;
        const canvasWidth = maxWidth;
        const canvasHeight = originalHeight * scaleRatio;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

        ctx.font = `bold ${40 * scaleRatio}px sans-serif`;
        ctx.fillStyle = 'black';
        ctx.fillText(userName, canvasWidth * 0.72, canvasHeight * 0.3); // 이름 위치 수정하는 곳

        ctx.font = `bold ${45 * scaleRatio}px sans-serif`;
        ctx.fillStyle = 'black';
        ctx.fillText(currentDate, canvasWidth * 0.4, canvasHeight * 0.8); // 날짜 위치 수정하는 곳
      };
    }
  }, [userName, currentDate]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = '이수증.png';
      link.click();
    }
  };

  return (
    <div>
      <TopBar
        title='이수증 다운로드'
        onXButtonClick={GoEdu}
        showBackButton={false}
      />
      <MainWrapper>
        <div className='flex justify-center'>
          <canvas ref={canvasRef} className='border'></canvas>
        </div>

        <div className='mt-10 p-4'>
          <Button
            label={
              <span className='flex items-center'>
                <span className='mr-2'>저장하기</span>
                <img
                  src='/assets/images/download.png'
                  alt='Download Icon'
                  className='h-5 w-5'
                />
              </span>
            }
            onClick={downloadImage}
            className='mb-4 flex items-center justify-center py-4'
          />
        </div>
      </MainWrapper>
    </div>
  );
};

export default EducationDownload;
