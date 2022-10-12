import React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import 'react-native-gesture-handler';
import Router from './Router';
import Color from './utils/Color';

const App = () => {
  return (
    <>
      {Platform.OS === 'ios' ? (
        <StatusBar translucent barStyle={'light-content'} />
      ) : (
        <View
          style={{
            height: StatusBar.currentHeight,
            backgroundColor: Color.primaryColor,
          }}>
          <StatusBar
            backgroundColor={Color.primaryColor}
            translucent
            barStyle={'light-content'}
          />
        </View>
      )}
      <Router />
    </>
  );
};

export default App;
