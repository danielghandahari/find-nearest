import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

navigator.geolocation = require('@react-native-community/geolocation');

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
};

interface IProps {
  onClose: () => void;
  setCurrentAddress: React.Dispatch<React.SetStateAction<string>>;
}

const GooglePlacesInput: FC<IProps> = ({
  onClose,
  setCurrentAddress,
}: IProps) => {
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
      onPress={(data: any, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setCurrentAddress(data.description);
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
          marginTop: 100,
        },
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      currentLocation // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
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
      predefinedPlaces={[homePlace, workPlace]}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={() => (
      //   // <Image source={require('path/custom/left-icon')} />
      //   <Text>SomeFakeIcon</Text>
      // )}
      renderRightButton={() => (
        <TouchableOpacity style={styles.rightButton} onPress={onClose}>
          <Text>Cancel</Text>
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
});

export default GooglePlacesInput;
