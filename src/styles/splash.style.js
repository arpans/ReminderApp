import {StyleSheet} from 'react-native';
import {Fonts} from '../utils';
import Color from '../utils/Color';
export default StyleSheet.create({
  Body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
  },
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Logo: {
    width: 155,
    height: 155,
  },
  Text: {
    color: Color.blackColor,
    fontFamily: Fonts.italic,
    marginTop: 20,
    fontSize: 36,
  },
});
