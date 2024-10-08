import { axiosInstance } from '@/utils/axiosInstance';
import { messaging } from '@/firebase-message';
import { getToken, onMessage } from 'firebase/messaging';

export const postNotificationToken = async (token: string) => {
  const bodyData = { token };

  const response = await axiosInstance.post(
    '/user-service/notification',
    bodyData,
  );
  return response;
};

// 알림 권한 요청 및 토큰 처리
export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_PUBLIC_VAPID_KEY,
    });

    if (currentToken) {
      console.log('FCM Token:', currentToken);
      return postNotificationToken(currentToken); // 서버로 토큰 전송
    } else {
      console.warn('토큰을 가져올 수 없습니다. 권한을 허용해주세요.');
    }
  } else {
    console.warn(
      '알림 권한이 거부되었습니다. 알림을 사용하려면 권한을 허용해주세요.',
    );
  }
};

// 포그라운드 푸시 알림 수신 설정
export const setupForegroundMessageHandler = () => {
  onMessage(messaging, (payload) => {
    console.log('포그라운드에서 푸시 알림 수신:', payload);

    const { title, body } = payload.notification || {};
    if (title && body) {
      new Notification(title, {
        body,
      });
    }
  });
};
