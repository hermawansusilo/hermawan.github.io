var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BA72D2cOiTV1jWSiwEtK2s2lvAtejEkNdk1a_Iaed0K8CCRygYepWsndr36PUh_HmpQhjRPcl2mQb_B3vlhBEGU",
   "privateKey": "71W-3RFwLn5eQstlOCKK8Ntc2wjZm0oH0e7-4_f7CVI"
};
 
 
webPush.setVapidDetails(
   'mailto:xwaywanz@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fJID3kClSi4:APA91bExVp9uaP1iLXKcsEtjuiFA26tRPpPLm9NI7eFmGG8uXeiPEnBkYwG2LlHOrIh4V6Awa_M0JzVZCG4Ohd9wG5QQiZg8DvpCh6-wN-AYmVlM87BYKxddjQVhCqdQ5WtcO5_YACmD",
   "keys": {
       "p256dh": "BIHQgtqIxbL/x+wHIhWAHDknE/r1owUkGASodPp78/ylgSXb2ASY4+S+hrEwAMuOCL9GayC3Kihh/0BNQmoEFeM=",
       "auth": "T9L7p3KCvG172b4a0dLh8Q=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1012627725313',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);