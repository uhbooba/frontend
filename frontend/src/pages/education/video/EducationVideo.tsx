import { useState, useEffect } from 'react';
import KeywordButtons from '@/components/common/KeywordButtons';
import TopBar from '@/components/layouts/TopBar';
import {
  getEducationVideos,
  getKeyword,
  getVideoByKeyword,
} from '@/services/education';
import MainWrapper from '@/components/layouts/MainWrapper';

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
      <TopBar title='교육영상' />
      <MainWrapper>
        <div className='mt-16 border-b-2'>
          <KeywordButtons
            keywords={['모두 보기', ...keywords]}
            onKeywordClick={keywordClick}
            keywordBtnColor={selectKeyword}
          />
        </div>

        <div className='mt-4 px-4'>
          {filteredVideos.length === 0 ? (
            <div className='flex items-center justify-center'>
              {/* 문구 대신 로딩중 아이콘(animate-spin) 사용하기 반영 */}
              <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900'></div>
            </div>
          ) : (
            filteredVideos.map((video) => (
              <div
                key={video.id}
                className='mb-8 rounded-lg border bg-white p-4 shadow-md'
              >
                <h3 className='mb-2 text-xl font-bold'>{video.title}</h3>
                <iframe
                  // width='100%'
                  // height='315'
                  loading='lazy'
                  src={video.url}
                  title={video.title}
                  className='mb-4 aspect-video rounded-lg border-2 border-gray-300'
                  allow='accelerometer; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            ))
          )}
        </div>
      </MainWrapper>
    </div>
  );
};

export default EducationVideo;
