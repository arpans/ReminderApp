import Toast from 'react-native-simple-toast';

export const HybridToast = message => {
  Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
};
