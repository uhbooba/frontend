import { axiosInstance } from '@/utils/axiosInstance';
import { MissionResponse } from '@/types/mission';

// 특정 미션 클리어 여부 확인
export const getMissionClearStatus = async (
  missionNumber: number,
): Promise<MissionResponse> => {
  const response = await axiosInstance.get<MissionResponse>(
    `/missions/${missionNumber}`,
  );
  return response.data;
};

// 미션 클리어 설정 함수 추가
export const setMissionClearStatus = async (
  missionNumber: number,
): Promise<MissionResponse> => {
  const response = await axiosInstance.patch<MissionResponse>(
    `/missions/${missionNumber}`,
  );
  return response.data;
};
