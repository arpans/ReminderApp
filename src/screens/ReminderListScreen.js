/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import pageStyles from '../styles/reminder.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color, Fonts} from '../utils';
import ImagePicker from 'react-native-image-crop-picker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {HybridToast} from '../components/HybridToast';
import moment from 'moment-timezone';
const screenWidth = Math.round(Dimensions.get('window').width);

var db = openDatabase({name: 'ReminderDatabse.db'});

const ReminderListScreen = props => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const {navigation} = props;
  const [reminderName, setReminderName] = useState('');
  const [reminderDescription, setReminderDescription] = useState('');
  const [imageData, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState();
  const [dateShow, setDateShow] = useState(false);
  const [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_reminder order by dateTime desc',
        [],
        (_tx, results) => {
          // console.log('item fetch:', JSON.stringify(results.rows.item(1)));
          let newArray = [];
          let newArray1 = [];
          let newObj = {};
          for (let i = 0; i < results.rows.length; i++) {
            if (
              !newArray1.includes(results.rows.item(i).dateTime.split(',')[0])
            ) {
              newArray1.push(results.rows.item(i).dateTime.split(',')[0]);
              newObj[results.rows.item(i).dateTime.split(',')[0]] = i;
              let dict = {};
              dict.title = results.rows.item(i).dateTime.split(',')[0];

              var item = results.rows.item(i);
              let obj = {};
              let tempData = [];
              for (let d in item) {
                obj[d] = item[d];
              }
              tempData.push(obj);
              dict.data = tempData;
              newArray.push(dict);
            } else {
              var exItem =
                newArray[newObj[results.rows.item(i).dateTime.split(',')[0]]];
              var item = results.rows.item(i);
              // console.log('item else part:::' + JSON.stringify(exItem));
              let obj = {};
              let tempData = [];
              for (let d in item) {
                obj[d] = item[d];
              }
              tempData.push(obj);
              var data = exItem.data;
              data.push(obj);

              newArray.data = data;
            }
            // console.log('newArray:::', JSON.stringify(newArray));
          }
          const sortedArray = newArray.sort(
            (a, b) =>
              new moment(b.title, 'DD/MM/YYYY').format('YYYYMMDD') -
              new moment(a.title, 'DD/MM/YYYY').format('YYYYMMDD'),
          );
          // console.log('sortedArray:::', JSON.stringify(newArray));
          // console.log('newArray:::', JSON.stringify(newArray));
          setFlatListItems(sortedArray);
        },
      );
    });
  }, [modal1]);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_reminder'",
        [],
        function (_tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql(
              'DROP TABLE IF EXISTS table_reminder',
              [],
              (_txn, results) => {
                console.log('Results DROP', results.rowsAffected);
              },
            );
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_reminder(id INTEGER PRIMARY KEY AUTOINCREMENT, reminderName VARCHAR(25), reminderDescription VARCHAR(255), dateTime VARCHAR(255), image VARCHAR(255))',
              [],
              (_txn, results) => {
                console.log('Results 123', results.rowsAffected);
              },
            );
          }
        },
      );
    });
  }, []);

  const resetData = () => {
    setReminderName('');
    setReminderDescription('');
    setDate(new Date());
    setImage('');
    setImageName('');
    setDateShow(false);
  };

  const saveValues = () => {
    if (!reminderName || !reminderDescription || !date || !imageData) {
      HybridToast(
        'Reminder Name, Reminder Description, Date and Image cant be left blank',
      );
      return;
    } else if (reminderName.length === 0) {
      HybridToast("Reminder Name can't be left blank");
      return;
    } else if (reminderDescription.length === 0) {
      HybridToast("Reminder Description can't be left blank");
      return;
    } else if (date.length === 0) {
      HybridToast("Date can't be left blank");
      return;
    } else if (imageData.length === 0) {
      HybridToast("Image can't be left blank");
      return;
    }
    saveData();
  };

  const saveData = () => {
    // console.log('reminderName ', reminderName);
    setModal(false);
    db.transaction(function (txn) {
      txn.executeSql(
        'INSERT INTO table_reminder (reminderName, reminderDescription, dateTime, image) VALUES (?,?,?,?)',
        [reminderName, reminderDescription, date.toLocaleString(), imageData],
        (_tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            setModal(false);
            setModal1(true);
            resetData();
          } else {
            Alert.alert('Failed');
            console.log('Failed');
          }
        },
      );
    });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (event?.type === 'dismissed') {
      setMode(undefined);
      setDateShow(false);
      return;
    } else {
      setDateShow(true);
    }
    setDate(currentDate);
    console.log('mode ', mode);
    if (mode === 'date') {
      showMode('time');
      setMode(undefined);
    }
  };

  useEffect(() => {
    if (mode !== undefined) {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: mode,
        is24Hour: true,
        minimumDate: new Date(),
      });
    }
  }, [mode]);

  const showMode = currentMode => {
    setMode(currentMode);
  };

  const launchCamera = async crop => {
    let cropValue = crop == null ? false : crop;
    return new Promise((resolve, reject) => {
      ImagePicker.openCamera({
        width: 200,
        height: 200,
        cropping: cropValue,
        includeBase64: true,
        includeExif: true,
        compressImageQuality: 0.4,
      })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  return (
    <SafeAreaView style={pageStyles.container}>
      {flatListItems.length > 0 ? (
        <SectionList
          sections={flatListItems}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => {
            return (
              <View style={pageStyles.Boxbg}>
                <View style={pageStyles.WatchBox}>
                  <View style={pageStyles.WatchImgBox}>
                    <Image
                      style={pageStyles.WatchImage}
                      resizeMode="cover"
                      source={{
                        uri: `data:image/jpeg;base64,${item.image}`,
                      }}
                    />
                  </View>
                  <View style={pageStyles.WatchTextBox}>
                    <Text style={pageStyles.Heading}>{item.reminderName}</Text>
                    <Text style={pageStyles.WatchText}>
                      {
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
                      }
                    </Text>
                    <View
                      style={{
                        height: 0.5,
                        marginTop: 10,
                        width: '100%',
                        backgroundColor: '#0013CE66',
                      }}
                    />
                  </View>
                </View>
              </View>
            );
          }}
          renderSectionHeader={({section}) => {
            var title = moment(section.title, 'DD/MM/YYYY, hh:mm:ss').format(
              'YYYY-MM-DD',
            );
            // console.log(`title: ${title}`);
            var showDate = moment().isSame(title, 'day')
              ? 'Today'
              : moment(section.title, 'DD/MM/YYYY, hh:mm:ss').format(
                  'MMM, DD YYYY',
                );
            return <Text style={pageStyles.header}>{showDate}</Text>;
          }}
        />
      ) : (
        <Text
          style={{
            fontFamily: Fonts.robotoRegular,
            fontSize: 22,
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          {'No Reminders Found'}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => {
          setModal(true);
        }}
        activeOpacity={0.5}
        style={pageStyles.Floating}>
        <Ionicons name="add" size={47} color="white" />
      </TouchableOpacity>
      <Modal
        backdropOpacity={1}
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          // setModal(false);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000090',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '94%',
              backgroundColor: Color.whiteColor,
              paddingVertical: (screenWidth * 4) / 100,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                borderBottomColor: '#C0CCDA',
                borderBottomWidth: 7,
                alignSelf: 'center',
                justifyContent: 'space-between',
                paddingBottom: 10,
              }}>
              <View
                style={{
                  width: '70%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginLeft: 40,
                }}>
                <Text
                  style={{
                    fontSize: (screenWidth * 5) / 100,
                    color: '#1F2D3D',
                  }}>
                  New Reminder
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModal(false);
                  resetData();
                }}>
                <Image
                  source={require('../images/close.png')}
                  style={{
                    resizeMode: 'contain',
                    width: 32,
                    height: 32,
                    marginRight: 10,
                    marginTop: 5,
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingLeft: 15, paddingRight: 15, marginTop: 20}}>
              <View>
                <Text style={[pageStyles.labelText]}>Reminder Name</Text>
                <TextInput
                  style={pageStyles.textInput}
                  placeholder={'Please Enter Reminder Name'}
                  keyboardType="default"
                  onChangeText={text => setReminderName(text)}
                  placeholderTextColor={Color.blackColor}
                  returnKeyType="next"
                  value={reminderName}
                  caretHidden={false}
                />
              </View>
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 20}}>
                <Text style={pageStyles.labelText}>Reminder Description</Text>
                <TextInput
                  style={pageStyles.textInput}
                  placeholder={'Please Enter Reminder Description'}
                  placeholderTextColor={Color.blackColor}
                  returnKeyType="done"
                  value={reminderDescription}
                  onChangeText={text => setReminderDescription(text)}
                />
              </View>
              <TouchableOpacity
                style={{marginTop: Platform.OS === 'ios' ? 30 : 30}}
                onPress={() => {
                  showMode('date');
                }}
                activeOpacity={0.5}>
                <Text style={pageStyles.textInput}>
                  {dateShow && date !== undefined
                    ? date.toLocaleString()
                    : 'Please Select Date and Time'}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <TouchableOpacity
                  style={pageStyles.selectImageButton}
                  onPress={() => {
                    launchCamera(false)
                      .then(obj => {
                        console.log(obj);
                        setImage(obj.data);
                        // console.log(obj.filename);
                        var fileName =
                          obj.path !== undefined &&
                          obj.path.substring(
                            obj.path.lastIndexOf('/') + 1,
                            obj.length,
                          );
                        setImageName(fileName);
                      })
                      .catch(error => {});
                  }}
                  activeOpacity={0.5}>
                  <Text style={pageStyles.selectImageButtonText}>
                    Select Image
                  </Text>
                </TouchableOpacity>
                {imageName !== '' && (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="head"
                    style={pageStyles.imageDataText}>
                    {imageName}
                  </Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={pageStyles.loginButton}
                  onPress={() => {
                    saveValues();
                  }}
                  activeOpacity={0.5}>
                  <Text style={pageStyles.loginButtonText}>SAVE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[pageStyles.loginButton, {marginLeft: 35}]}
                  onPress={() => {
                    resetData();
                  }}
                  activeOpacity={0.5}>
                  <Text style={pageStyles.loginButtonText}>RESET</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={modal1}>
        <View style={pageStyles.modalContainer}>
          <View style={pageStyles.modalView}>
            <Text style={pageStyles.textStyle}>{'Alert'}</Text>
            <Text style={pageStyles.subTextStyle}>
              {'Reminder Set Succesfully'}
            </Text>
            <TouchableOpacity
              style={[pageStyles.alertButton, {marginRight: 35}]}
              onPress={() => {
                setModal1(false);
              }}
              activeOpacity={0.5}>
              <Text style={pageStyles.loginButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReminderListScreen;
