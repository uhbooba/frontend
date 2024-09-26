import { axiosInstance } from '@/utils/axiosInstance';

// 교육 영상 조회
export const getEducationVideos = () => {
  const response = axiosInstance(`/external-service/video`);
  return response;
};
