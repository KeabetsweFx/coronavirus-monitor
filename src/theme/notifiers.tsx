import { NotifierComponents } from 'react-native-notifier';

import { Colors } from 'public/colors';
import { FontFamily } from 'public/fonts';
import { Images } from 'public/images';

export const SuccessOptions = {
  Component: NotifierComponents.Notification,
  duration: 5000,
  showAnimationDuration: 400,
  componentProps: {
    imageSource: Images.check,
    imageStyle: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
    titleStyle: {
      color: Colors.black,
      fontSize: 17,
      fontFamily: FontFamily.SemiBold,
    },
    descriptionStyle: {
      color: Colors.black,
      fontSize: 17,
      fontFamily: FontFamily.Regular,
    },
  },
};
