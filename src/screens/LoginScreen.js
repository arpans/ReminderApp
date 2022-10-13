/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import pageStyles from '../styles/login.style';
import {Color, CommonStyles, DeviceInfo} from '../utils';
import {HybridToast} from '../components/HybridToast';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

const LoginScreen = props => {
  const {navigation} = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (_tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(20), password VARCHAR(20))',
              [],
            );
            txn.executeSql(
              'INSERT INTO table_user (email, password) VALUES (?,?)',
              ['abc@gmail.com', '123456'],
            );
          }
        },
      );
    });
  }, []);

  const login = () => {
    if (!email || !password) {
      HybridToast('Email Id and Password cant be left blank');
      return;
    } else if (email.length === 0) {
      HybridToast("Email Id can't be left blank");
      return;
    } else if (password.length === 0) {
      HybridToast("Password can't be left blank");
      return;
    }
    fetchUser();
  };

  const fetchUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where email = ? AND password = ?',
        [email, password],
        (_tx, results) => {
          console.log('results ', results);
          var len = results.rows.length;
          console.log('len ', len);
          if (len > 0) {
            let res = results.rows.item(0);
            console.log('results ', res.email, res.password);
            navigation.reset({
              index: 0,
              routes: [{name: 'Home', params: {userDetails: res}}],
            });
          } else {
            console.log('No user found');
            HybridToast('No user found');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={CommonStyles.Body}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={DeviceInfo.platform ? 'padding' : 'height'}>
          <View style={pageStyles.Container}>
            <View style={[CommonStyles.TextCenter, {marginBottom: 40}]}>
              <Image
                style={{width: 154, height: 100}}
                source={require('../images/logo.png')}
              />
            </View>
            <View>
              <Text style={[pageStyles.labeltxt]}>Email Id</Text>
              <TextInput
                style={pageStyles.textInput}
                placeholder={'Please Enter Email ID'}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={text => setEmail(text)}
                placeholderTextColor={Color.lightgreyColor}
                returnKeyType="next"
                value={email}
                caretHidden={false}
              />
            </View>
            <View style={{marginTop: Platform.OS === 'ios' ? 30 : 20}}>
              <Text style={pageStyles.labeltxt}>Password</Text>
              <TextInput
                style={pageStyles.textInput}
                placeholder={'Please Enter Password'}
                placeholderTextColor={Color.lightgreyColor}
                returnKeyType="done"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </View>
            <View style={{marginTop: 120}}>
              <TouchableOpacity
                style={pageStyles.loginButton}
                onPress={() => {
                  login();
                }}
                activeOpacity={0.5}>
                <Text style={pageStyles.loginButtonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
