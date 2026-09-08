// این فایل اعلان‌های گوشی را وقتی سایت نیم‌باز در پس‌زمینه یا بسته است نمایش می‌دهد.
// مقادیر پایین (پیکربندی Firebase) عمومی‌اند، نه محرمانه — دقیقاً همان مقادیری هستند
// که در lib/push_notifications.dart هم استفاده شده‌اند.

importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCQOGLfkrTAF0cnAjEGAP4FJRdvRxFcaY0',
  authDomain: 'nimbaz-3cb77.firebaseapp.com',
  projectId: 'nimbaz-3cb77',
  storageBucket: 'nimbaz-3cb77.firebasestorage.app',
  messagingSenderId: '605004338801',
  appId: '1:605004338801:web:4bd1bf02ed909f393dedd0',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'نیم‌باز';
  const options = {
    body: (payload.notification && payload.notification.body) || '',
    icon: 'icons/Icon-192.png',
  };
  self.registration.showNotification(title, options);
});
