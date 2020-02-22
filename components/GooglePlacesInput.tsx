import React, {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import {thirdColor, textColor, secondColor} from '../utils/variables';
import {setAsyncStorage, getAsyncStorage} from '../utils/async-storage';

navigator.geolocation = require('@react-native-community/geolocation');

interface IProps {
  onClose: () => void;
  setCurrentAddress: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (arg: any) => void;
}

type PlaceSearch = {description: string};

const GooglePlacesInput: FC<IProps> = ({
  onClose,
  setCurrentAddress,
  onSearch,
}: IProps) => {
  const [recentSearches, setRecentSearches] = useState<PlaceSearch[]>([]);

  useEffect(() => {
    async function getRecentSearches() {
      const currentRecentSearches: PlaceSearch[] = await getAsyncStorage(
        'recent-searches',
      );
      if (currentRecentSearches && currentRecentSearches.length) {
        setRecentSearches(currentRecentSearches);
      }
    }

    getRecentSearches();
  }, []);

  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance="light" // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails
      renderDescription={(row: any) => row.description} // custom description render
      onPress={async (data: any, details = null) => {
        // 'details' is provided when fetchDetails = true

        if (
          typeof data.description === 'string' &&
          data.description === 'Current location'
        ) {
          const {lat, lng} = data.geometry.location;

          Geocoder.from(lat, lng)
            .then((json: {results: {formatted_address: any}[]}) => {
              const address = json.results[0].formatted_address;
              setCurrentAddress(address);
              onSearch(address);
            })
            .catch((error: any) => console.warn(error));
        } else {
          setCurrentAddress(data.description);

          // Set new recent searches
          const MAX_SEARCHES = 10;
          const searchExists = recentSearches.some(
            s => s.description === data.description,
          );

          if (!searchExists) {
            const newSearch: PlaceSearch = {description: data.description};
            const newRecentSearches = [newSearch, ...recentSearches].slice(
              0,
              MAX_SEARCHES,
            );

            setRecentSearches(newRecentSearches);
            await setAsyncStorage('recent-searches', newRecentSearches);
          }
          onSearch(data.description);
        }

        onClose();
      }}
      getDefaultValue={() => ''}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyCf7Y8tZY3PTvER1A5VhEM_JnHW-_OKNlc',
        language: 'en', // language of the results
        // types: '(cities)', // default: 'geocode'
      }}
      styles={{
        textInputContainer: {
          width: '100%',
          marginTop: 75,
          backgroundColor: secondColor,
          // borderColor: 'red',
          // borderWidth: 2,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        description: {
          fontWeight: 'bold',
          color: textColor,
        },
        predefinedPlacesDescription: {
          color: thirdColor,
        },
        poweredContainer: {
          display: 'none',
        },
      }}
      currentLocation // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI="None" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        // type: 'cafe',
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address',
      }}
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_3',
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={() => (
      //   // <Image source={require('path/custom/left-icon')} />
      //   <Text>SomeFakeIcon</Text>
      // )}

      predefinedPlaces={recentSearches}
      renderRightButton={() => (
        <TouchableOpacity style={styles.rightButton} onPress={onClose}>
          <Text style={styles.rightButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  rightButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rightButtonText: {
    fontWeight: '700',
    color: textColor,
  },
});

export default GooglePlacesInput;
