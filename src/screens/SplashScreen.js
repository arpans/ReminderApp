import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import pageStyles from '../styles/splash.style';

var db = openDatabase({name: 'UserDatabase.db'});

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const fetchData = async () => {
      const timer = setTimeout(() => {
        db.transaction(tx => {
          tx.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
            [],
            (_txn, res) => {
              console.log('results ', res);
              if (res.rows.length === 1) {
                tx.executeSql(
                  'SELECT * FROM table_user where email = ? AND password = ?',
                  ['abc@gmail.com', '123456'],
                  (_tx, results) => {
                    console.log('results ', results);
                    var len = results.rows.length;
                    console.log('len ', len);
                    if (len > 0) {
                      let res1 = results.rows.item(0);
                      console.log('results ', res.email, res.password);
                      // navigation.navigate('Home', {userDetails: res.email});
                      navigation.reset({
                        index: 0,
                        routes: [{name: 'Home', params: {userDetails: res1}}],
                      });
                    } else {
                      console.log('No user found');
                      // HybridToast('No user found');
                      navigation.reset({
                        index: 0,
                        routes: [{name: 'Login'}],
                      });
                    }
                  },
                );
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                });
              }
            },
          );
        });
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    };
    fetchData();
  }, [navigation]);

  return (
    <>
      <View style={pageStyles.Body}>
        <Image style={pageStyles.Logo} source={require('../images/logo.png')} />
        <Text style={pageStyles.Text}>Remind Me</Text>
      </View>
    </>
  );
};

export default SplashScreen;
