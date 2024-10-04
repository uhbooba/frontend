import { useState, useEffect } from 'react';
import KeywordButtons from '@/components/common/KeywordButtons';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';
import {
  getEducationVideos,
  getKeyword,
  getVideoByKeyword,
} from '@/services/education';

// 비디오에 있는 속성들 타입 정해주기
interface Video {
  id: number;
  keyword: string;
  title: string;
  url: string;
  description: string;
  upload_at: string;
}

const EducationVideo = () => {
  const [selectKeyword, setSelectKeyword] = useState('모두 보기');
  const [videoData, setVideoData] = useState<Video[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  const keywordClick = async (keyword: string) => {
    setSelectKeyword(keyword);

    if (keyword !== '모두 보기') {
      try {
        const response = await getVideoByKeyword(keyword);
        setVideoData(response.data.data);
        console.log('키워드 뭐있나보자', response.data.data);
      } catch (error) {
        console.log('keywordClick 에러', error);
      }
    } else {
      fetchAllVideo();
    }
  };

  const fetchAllVideo = async () => {
    try {
      const response = await getEducationVideos();
      setVideoData(response.data.data);
    } catch (error) {
      console.log('fetchAllVideo 에러', error);
    }
  };

  const fetchKeywords = async () => {
    try {
      const response = await getKeyword();
      setKeywords(response.data.data);
      console.log('가져온 전체 키워드:', response.data.data);
    } catch (error) {
      console.log('fetchKeywords 에러', error);
    }
  };

  useEffect(() => {
    fetchAllVideo();
    fetchKeywords();
  }, []);

  const filteredVideos = Array.isArray(videoData)
    ? videoData.filter(
        (video) =>
          selectKeyword === '모두 보기' || video.keyword === selectKeyword,
      )
    : [];

  return (
    <div>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='교육영상' />
      </div>

      <div className='mt-16 border-b-2'>
        <KeywordButtons
          keywords={['모두 보기', ...keywords]}
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

export default EducationVideo;
