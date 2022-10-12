import {Platform, StyleSheet} from 'react-native';
import {Fonts} from '../utils';
import Color from '../utils/Color';
export default StyleSheet.create({
  Container: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 50,
  },
  Heading_sm: {
    fontSize: 14,
    color: Color.darkGreyColor,
    fontWeight: 'bold',
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: Color.darkGreyColor,
    borderRadius: 5,
  },
  labeltxt: {
    fontFamily: Fonts.robotoRegular,
    fontSize: 18,
    color: Color.blackColor,
  },
  textInput: {
    fontFamily: Fonts.robotoRegular,
    fontSize: 24,
    color: Color.blackColor,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    borderBottomColor: Color.underlineColor,
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  loginButton: {
    backgroundColor: Color.primaryColor,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  loginButtonText: {
    fontFamily: Fonts.robotoRegular,
    color: Color.whiteColor,
    textAlign: 'center',
    fontSize: 22,
  },
});
