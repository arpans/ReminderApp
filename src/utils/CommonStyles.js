import {StyleSheet} from 'react-native';
import Color from './Color';

const CommonStyles = StyleSheet.create({
  Body: {
    backgroundColor: Color.whiteColor,
    flex: 1,
  },
  Flex1: {
    flex: 1,
  },
  Container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  GreyBg: {
    backgroundColor: '#F5F6FA',
  },
  Heading: {
    fontSize: 16,
    color: Color.blackColor,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardViewStyle: {
    backgroundColor: Color.whiteColor,
    shadowColor: '#000000',
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    shadowOffset: {height: 2, width: 0},
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginTop: 10,
  },
  buttonPrimary: {
    backgroundColor: Color.primaryColor,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonDisable: {
    backgroundColor: Color.lightgreyColor,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonPrimaryText: {
    color: Color.whiteColor,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonSuccess: {
    backgroundColor: Color.greenColor,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonSecondary: {
    backgroundColor: Color.blueColor,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: Color.primaryColor,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: Color.darkgreyColor,
    textAlign: 'center',
    fontSize: 16,
  },
  formControl: {
    height: 50,
    color: Color.blackColor,
    marginBottom: 15,
    backgroundColor: Color.whiteColor,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Color.primaryColor,
    borderRadius: 5,
  },
  FormControltextArea: {
    borderColor: '#B7B7B7',
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 15,
    backgroundColor: Color.whiteColor,
    paddingLeft: 15,
    paddingRight: 15,
    color: Color.blackColor,
    fontSize: 14,
  },
  Row: {
    flexDirection: 'row',
  },
  Contain: {
    resizeMode: 'contain',
  },
  Imgfluid: {
    width: '100%',
    height: '100%',
  },
  TextCenter: {
    alignItems: 'center',
  },
  TextWhite: {
    color: Color.whiteColor,
  },
  TextBlack: {
    color: Color.blackColor,
  },
  TextGreen: {
    color: Color.greenColor,
  },
  TextMuted: {
    color: Color.darkgreyColor,
  },
  TextPrimary: {
    color: Color.primaryColor,
  },
  TextSecondary: {
    color: Color.secondaryColor,
  },
  AlignCenter: {
    alignItems: 'center',
  },
  JustifyCenter: {
    justifyContent: 'center',
  },
  SpaceBetween: {
    justifyContent: 'space-between',
  },
  WidthHalf: {
    width: '48%',
    //marginHorizontal: '1%',
  },
  WidthFull: {
    width: '100%',
  },
  Size14: {
    fontSize: 14,
  },
  Size16: {
    fontSize: 16,
  },
  mt_30: {
    marginTop: 30,
  },
  mt_15: {
    marginTop: 15,
  },
  mt_10: {
    marginTop: 10,
  },
  mt_5: {
    marginTop: 5,
  },
  my_30: {
    marginVertical: 30,
  },
  my_15: {
    marginVertical: 15,
  },
  my_10: {
    marginVertical: 10,
  },
  my_5: {
    marginVertical: 5,
  },
  mb_30: {
    marginBottom: 30,
  },
  mb_20: {
    marginBottom: 20,
  },
  mb_15: {
    marginBottom: 15,
  },
  mb_10: {
    marginBottom: 10,
  },
  ml_15: {
    marginLeft: 15,
  },
  ml_10: {
    marginLeft: 10,
  },
  ml_5: {
    marginLeft: 5,
  },
  mr_15: {
    marginRight: 15,
  },
  mr_10: {
    marginRight: 10,
  },
  mr_5: {
    marginRight: 5,
  },
  py_15: {
    paddingHorizontal: 15,
  },
  PersonList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    shadowOffset: {height: 2, width: 0},
    padding: 15,
    borderRadius: 6,
    margin: 5,
    marginTop: 10,
  },
});

export default CommonStyles;
