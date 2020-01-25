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
import {TouchableHighlight, View, StatusBar} from 'react-native';

import PageView from './components/views/PageView';
import Text from './components/atoms/Text';
import Picker, {IPickerItem} from './components/atoms/Picker';

import LargeText from './components/atoms/LargeText';
import SearchButton from './components/SearchButton';
import Modal from './components/atoms/Modal';

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
  const [pickerValue, setpickerValue] = useState('ammusement parks');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <PageView>
        <LargeText>Find nearest</LargeText>
        <Picker
          selectedValue={pickerValue}
          setValue={setpickerValue}
          pickerItems={pickerItems}
        />
        <LargeText>from</LargeText>
        <SearchButton />

        <TouchableHighlight onPress={() => setModalOpen(true)}>
          <Text>OPEN</Text>
        </TouchableHighlight>

        <Modal visible={modalOpen} onClose={() => setModalOpen(false)}>
          <View>
            <Text>TJAA</Text>
          </View>
        </Modal>
      </PageView>
    </>
  );
};

export default App;
