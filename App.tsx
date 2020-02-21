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
import {StatusBar, View, StyleSheet} from 'react-native';
import Geocoder from 'react-native-geocoding';

import Logo from './components/Logo';
import ResultModal from './components/ResultModal';
import FixedBottomButton from './components/atoms/FixedBottomButton';
import PageView from './components/views/PageView';
import Text from './components/atoms/Text';

import LargeText from './components/atoms/LargeText';
import SearchButton from './components/SearchButton';
import SearchModal from './components/SearchModal';

Geocoder.init('AIzaSyCf7Y8tZY3PTvER1A5VhEM_JnHW-_OKNlc');

const query = 'https://findingmetro.com/.netlify/functions/server/place';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [resultModalOpen, setResultModalOpen] = useState(false);

  const [noSubwaysText, setNoSubwaysText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subways, setSubways] = useState<any[]>([]);

  const onGo = async () => {
    setIsLoading(true);
    if (noSubwaysText.length) setNoSubwaysText('');
    setSubways([]);

    Geocoder.from(currentAddress)
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
          setNoSubwaysText(
            'There are unfortunately no subways near the given address 😢',
          );
        } else {
          setNoSubwaysText('Failed finding subways near the given address 🧐');
        }

        if (resJson)
          setSubways(
            resJson.sort(
              (a: {distanceValue: number}, b: {distanceValue: number}) =>
                a.distanceValue - b.distanceValue,
            ),
          );
        setIsLoading(false);
        setResultModalOpen(true);
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
      <PageView style={styles.pageView}>
        <View>
          <Logo />
        </View>
        <View>
          <LargeText style={styles.findSubwaysText}>
            Find nearest subways from
          </LargeText>
          <SearchButton
            text={currentAddress}
            onPress={() => setModalOpen(true)}
          />
        </View>

        <SearchModal
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          setCurrentAddress={setCurrentAddress}
        />

        <ResultModal
          visible={resultModalOpen}
          onClose={() => setResultModalOpen(false)}
          result={{
            data: subways,
            errorMsg: noSubwaysText,
          }}
        />

        {isLoading && <Text>Loading...</Text>}
      </PageView>
      {currentAddress !== '' && (
        <FixedBottomButton text="SEARCH" onPress={onGo} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pageView: {justifyContent: 'space-around'},
  findSubwaysText: {
    fontSize: 31,
  },
});

export default App;
