/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import PageView from './components/views/PageView';
import Text from './components/atoms/Text';
import Picker from './components/atoms/Picker';
import {IPickerItem} from './components/atoms/Picker';

const pickerItems: IPickerItem[] = [
  {
    label: 'subway',
    value: 'Subway',
  },
  {
    label: 'restaurants',
    value: 'Restaurants',
  },
  {
    label: 'ammusement parks',
    value: 'Ammusement parks',
  },
];

const App = () => {
  const [pickerValue, setpickerValue] = useState('ammusement parkshhh');

  return (
    <>
      <StatusBar barStyle="light-content" />
      <PageView>
        <Text>Find nearest</Text>
        <Picker
          selectedValue={pickerValue}
          setValue={setpickerValue}
          pickerItems={pickerItems}
        />
        <Text>from</Text>
      </PageView>
    </>
  );
};

export default App;
