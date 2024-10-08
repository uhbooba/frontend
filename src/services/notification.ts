import { messaging } from '@/firebase-message';
import { getToken, onMessage } from 'firebase/messaging';

export const requestNotificationPermission = async (): Promise<
  string | null
> => {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_PUBLIC_VAPID_KEY,
    });

    if (currentToken) {
      return currentToken;
    } else {
      throw new Error('FCM 토큰을 가져올 수 없습니다.');
    }
  } else {
    throw new Error('알림 권한이 거부되었습니다.');
  }
};

export const setupForegroundMessageHandler = (): void => {
  onMessage(messaging, (payload) => {
    const { title, body } = payload.notification || {};
    if (title && body) {
      new Notification(title, { body });
    }
  });
};
