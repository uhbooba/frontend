import { axiosInstance } from '@/utils/axiosInstance';

// 로그인
export const postLogin = async (username: string, password: string) => {
  const bodyData = {
    username,
    password,
  };

  const response = await axiosInstance.post('/user-service/login', bodyData);
  return response;
};

// 회원가입
export const postSignup = async (
  name: string,
  username: string,
  password: string,
  phone: string,
) => {
  const bodyData = {
    name,
    username,
    password,
    phone,
  };

  const response = await axiosInstance.post('/user-service/users', bodyData);
  return response;
};

// 아이디 중복 확인
export const checkUsername = async (username: string) => {
  const response = await axiosInstance(`/users/check-username/${username}`);
  return response;
};

// 비밀번호 확인
export const checkPassword = () => {};

// sms 전송
export const postSms = async (phone: string) => {
  const bodyData = {
    phone,
  };

  const response = await axiosInstance.post('/user-service/sms', bodyData);
  return response;
};

// sms 인증
export const postSmsVerify = async (phone: string, code: string) => {
  const bodyData = {
    phone,
    code,
  };

  const response = await axiosInstance.post(
    '/user-service/sms/verify',
    bodyData,
  );
  return response;
};
