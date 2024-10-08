import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import QrScanner from 'qr-scanner';
import TopBar from '@/components/layouts/TopBar';
import { useSetAtom } from 'jotai';
import { utilityDataAtom } from '@/atoms/utilityAtoms';

const UtilityPayScan = () => {
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);

  const setUtilityData = useSetAtom(utilityDataAtom);

  useEffect(() => {
    const videoElem = videoRef.current;

    // QR Scan 옵션
    const QrOptions = {
      // 핸드폰의 경우, 외부 카메라인지 셀프카메라인지
      preferredCamera: 'environment',
      // 1초당 스캔 횟수
      maxScansPerSecond: 5,
      // QR 스캔 부분 표시
      highlightScanRegion: true,
    };

    if (videoElem) {
      const qrScanner = new QrScanner(
        videoElem,
        (result) => handleScan(result),
        QrOptions,
      );
      qrScanner.start();

      return () => qrScanner.destroy();
    }
  }, []);

  const handleScan = (result: QrScanner.ScanResult) => {
    const data = JSON.parse(result?.data.replace(/'/g, '"'));

    setUtilityData((prev) => ({
      ...prev,
      corporation: data.corporation,
      amount: data.amount,
    }));
    console.log(data);

    navigate('/utility/money');
  };

  return (
    <div className='max-h-screen'>
      <TopBar title='공과금 납부' />
      <div className='relative mt-36 flex h-3/4 w-full flex-col items-center justify-center'>
        <p className='my-4 text-center text-3xl'>
          종이 고지서에 있는 <br />
          QR 코드를 스캔하세요
        </p>
        <div className='relative h-72 w-72 overflow-hidden rounded-md border-4 border-primary'>
          <video
            ref={videoRef}
            className='absolute inset-0 h-full w-full object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default UtilityPayScan;
