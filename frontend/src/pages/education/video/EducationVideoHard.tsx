import KeywordButtons from '@/components/common/KeywordButtons';
import TopBar from '@/components/layouts/TopBar';
import { useState } from 'react';
import videoDatas from '../../../mocks/videoDatas';
import { useNavigate } from 'react-router';
import MainWrapper from '@/components/layouts/MainWrapper';

const EducationVideo = () => {
  const [selectKeyword, setSelectKeyword] = useState('모두 보기');

  const navigate = useNavigate();

  const GoEdu = () => {
    navigate('/education');
  };

  const keywordClick = (keyword: string) => {
    setSelectKeyword(keyword);
  };

  const keywords = ['모두 보기', '금융위원회', '시.금.치'];

  const filteredVideos = videoDatas.filter(
    (video) => selectKeyword === '모두 보기' || video.keyword === selectKeyword,
  );

  return (
    <div>
      <TopBar title='교육영상' onXButtonClick={GoEdu} />
      <MainWrapper>
        <div className='mt-20 border-b-2'>
          <KeywordButtons
            keywords={keywords}
            onKeywordClick={keywordClick}
            keywordBtnColor={selectKeyword}
          />
        </div>

        <div className='mt-4 px-4'>
          {filteredVideos.map((video) => (
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
          ))}
        </div>
      </MainWrapper>
    </div>
  );
};

export default EducationVideo;
