import { useState, useEffect } from 'react';
import KeywordButtons from '@/components/common/KeywordButtons';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';

// 비디오에 있는 속성들 타입 정해주기
interface Video {
  id: number;
  keyword: string;
  title: string;
  url: string;
  description: string;
  upload_at: string;
}

const EducationVideo2 = () => {
  const [selectKeyword, setSelectKeyword] = useState('모두 보기');
  const [videoData, setVideoData] = useState<Video[]>([]);
  const [keywordData, setKeywordData] = useState<string[]>([]);

  const keywordClick = (keyword: string) => {
    setSelectKeyword(keyword);
  };

  const keywords = ['모두 보기', ...keywordData];

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await fetch(
          'http://j11a402.p.ssafy.io:8080/external-service/video/keywords',
        );
        const data = await response.json();
        if (data.status === 'success') {
          setKeywordData(data.data);
        }
      } catch (error) {
        console.log(`키워드 에러 : ${error}`);
      }
    };

    fetchKeywords();
  }, []);

  // 확인용 콘솔로그
  useEffect(() => {
    console.log(`키워드 데이터 : ${keywordData}`);
  }, [keywordData]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          'http://j11a402.p.ssafy.io:8080/external-service/video',
        );
        const data = await response.json();
        console.log(`이건 리스폰 그자체: ${response}`);
        console.log(response);
        console.log(`이것은 성공한 데이터 : ${data}`);
        if (data.status === 'success') {
          setVideoData(data.data);
        }
      } catch (error) {
        console.log(`이것은 에러 : ${error}`);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videoData.filter(
    (video) => selectKeyword === '모두 보기' || video.keyword === selectKeyword,
  );

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='교육영상' />
      </div>

      <div className='mt-20 border-b-2'>
        <KeywordButtons
          keywords={keywords}
          onKeywordClick={keywordClick}
          keywordBtnColor={selectKeyword}
        />
      </div>

      <div className='mt-4 px-4'>
        {filteredVideos.length === 0 ? (
          <p>유튜브 영상이 없습니다.</p>
        ) : (
          filteredVideos.map((video) => (
            <div
              key={video.id}
              className='mb-8 rounded-lg border bg-white p-4 shadow-md'
            >
              <h3 className='mb-2 text-xl font-bold'>{video.title}</h3>
              <iframe
                width='100%'
                height='315'
                src={video.url}
                title={video.title}
                className='mb-4 rounded-lg border-2 border-gray-300'
                allow='accelerometer; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
          ))
        )}
      </div>

      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default EducationVideo2;
