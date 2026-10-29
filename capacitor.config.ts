import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hacktivate.rifchat',
  appName: 'RifChatPro',
  webDir: 'public',
  server: {
    androidScheme: 'http',
    cleartext: true,
  },
};

export default config;
