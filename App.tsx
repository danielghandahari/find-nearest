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
import {
  TouchableHighlight,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
// import Geocoder from 'react-native-geocoding';
import Geocoder from 'react-native-geocoding';

import FixedBottomButton from './components/atoms/FixedBottomButton';
import PageView from './components/views/PageView';
import Text from './components/atoms/Text';
import Picker, {IPickerItem} from './components/atoms/Picker';

import LargeText from './components/atoms/LargeText';
import SearchButton from './components/SearchButton';
import Modal from './components/atoms/Modal';
import GooglePlacesInput from './components/GooglePlacesInput';
import SearchModal from './components/SearchModal';

Geocoder.init('AIzaSyCf7Y8tZY3PTvER1A5VhEM_JnHW-_OKNlc');

const query = 'https://findingmetro.com/.netlify/functions/server/place';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');

  const [noSubwaysText, setNoSubwaysText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subways, setSubways] = useState<any[]>([]);

  const onGo = async () => {
    setIsLoading(true);
    if (noSubwaysText.length) setNoSubwaysText('');
    setSubways([]);
    Geocoder.from('Pingstvägen 4')
      .then((json: {results: {geometry: {location: any}}[]}) => {
        const {location} = json.results[0].geometry;
        return location;
      })
      .then(async (coordinates: any) => {
        const res = await fetch(query, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: currentAddress,
            coordinates: {
              lat: coordinates.lat,
              lng: coordinates.lng,
            },
          }),
        });

        let resJson;
        if (res.status === 200) {
          resJson = await res.json();
        } else if (res.status === 404) {
          setNoSubwaysText('There are no subways near the given address!');
        } else {
          setNoSubwaysText('Failed finding subways near the given address.');
        }

        if (resJson)
          setSubways(
            resJson.sort(
              (a: {distanceValue: number}, b: {distanceValue: number}) =>
                a.distanceValue - b.distanceValue,
            ),
          );
        setIsLoading(false);
      })
      .catch((error: any) => {
        setNoSubwaysText('Failed finding subways near the given address.');
        console.error('Error: ', error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <PageView>
        <LargeText>Find nearest subways from</LargeText>
        <SearchButton
          text={currentAddress}
          onPress={() => setModalOpen(true)}
        />

        <SearchModal
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          setCurrentAddress={setCurrentAddress}
        />

        {subways ? subways.map(s => <Text>{s.name}</Text>) : null}
      </PageView>
      {currentAddress !== '' && (
        <FixedBottomButton text="SEARCH" onPress={onGo} />
      )}
    </>
  );
};

export default App;
