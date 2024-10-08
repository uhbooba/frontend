import { axiosInstance } from '@/utils/axiosInstance';

// 교육 영상 조회
export const getEducationVideos = () => {
  const response = axiosInstance(`/external-service/video`);
  return response;
};

// 교육 영상 키워드
export const getKeyword = () => {
  const response = axiosInstance(`/external-service/video/keywords`);
  return response;
};

// 교육 영상 키워드별 검색
export const getVideoByKeyword = (keyword: string) => {
  const response = axiosInstance(`/external-service/video/search/${keyword}`);
  return response;
};

// 교육 퀴즈
export const getQuizItem = (part: string) => {
  const response = axiosInstance(`/external-service/quiz/${part}`);
  return response;
};

// 금융 사기 TTS
export const getSmishingTTS = (ttsKey: string) => {
  const response = axiosInstance(`/external-service/tts/${ttsKey}`, {
    responseType: 'blob',
  });

  return response;
};

// 금융 사기 시나리오 가져오기
export const getSmishing = () => {
  const response = axiosInstance(`/external-service/smishing`);

  return response;
};

// 금융 사기 시나리오 완료
export const postSmishingStatus = async (scenario: string) => {
  const bodyData = {
    scenario,
  };

  const response = await axiosInstance.post(
    '/external-service/smishing',
    bodyData,
  );
  return response;
};
