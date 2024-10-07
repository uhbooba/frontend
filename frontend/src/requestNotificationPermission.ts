import { messaging } from './firebase-message';
import { getToken } from 'firebase/messaging';

import axios from 'axios';

export const requestFirebaseNotificationPermission = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_PUBLIC_VAPID_KEY,
    });
    if (currentToken) {
      console.log('FCM Token:', currentToken);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}api/fcm/token`, {
        token: currentToken,
      });
    } else {
      console.warn('푸시 알림 권한을 얻지 못했습니다.');
    }
  } catch (error) {
    console.error('푸시 알림 토큰 가져오기 실패:', error);
  }
};
