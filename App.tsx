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
import GooglePlacesInput from './components/GooglePlacesInput';
import SearchModal from './components/SearchModal';

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
  const [currentAddress, setCurrentAddress] = useState('');

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
        <SearchButton
          text={currentAddress}
          onPress={() => setModalOpen(true)}
        />

        {/* <Modal visible={modalOpen} onClose={() => setModalOpen(false)}>
          <View>
            <Text>TJAA</Text>
          </View>
        </Modal> */}

        <SearchModal
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          setCurrentAddress={setCurrentAddress}
        />
      </PageView>
    </>
  );
};

export default App;
