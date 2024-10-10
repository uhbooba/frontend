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

    // 키워드 버튼을 클릭하면 처음에는 2개만 가져와서 먼저보여주기
    if (keyword !== '모두 보기') {
      try {
        const response = await getVideoByKeyword(keyword);
        const videos = response.data.data;

        // 처음 2개만 가져오기
        setVideoData(videos.slice(0, 2));

        // 2개가 다 나오면 나머지 영상도 가져오기
        if (videos.length > 1) {
          setTimeout(() => {
            setVideoData(videos); // 전체 영상 가져오기
          }, 1300); // 1.3초 뒤 나머지 영상을 가져옴
        }
      } catch (error) {
        console.log('keywordClick 에러', error);
      }
    } else {
      // 모두보기일때도 2개만 먼저보여주고 나머지 가져오기
      try {
        const response = await getEducationVideos();
        const videos = response.data.data;

        // 처음 2개만 가져오기
        setVideoData(videos.slice(0, 2));

        // 2개가 다 나오면 나머지 영상도 가져오기
        if (videos.length > 1) {
          setTimeout(() => {
            setVideoData(videos); // 전체 영상 가져오기
          }, 1300); // 1.3초 뒤 나머지 영상을 가져옴
        }
      } catch (error) {
        console.log('keywordClick 에러', error);
      }
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
      <MainWrapper isBottomTab={true}>
        <div className='border-b-2'>
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
                className='mb-8 rounded-lg border bg-white pl-2 pt-4 shadow-md'
              >
                <h3 className='mb-2 pl-2 pr-2 text-xl font-bold'>
                  {video.title}
                </h3>
                <iframe
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
