/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, {FC} from 'react';
import {StyleSheet, View, Linking, Dimensions} from 'react-native';
import {firstColor, grey, thirdColor} from '../utils/variables';
import Modal from './atoms/Modal';
import Text from './atoms/Text';
import {Result} from '../custom-types';
import LargeText from './atoms/LargeText';
import SkeumorphicView from './views/SkeumorphicView';
import LocationIcon from './LocationIcon';

interface IProps {
  visible: boolean;
  onClose: () => void;
  result: Result;
  currentAddress: string;
}

const ResultModal: FC<IProps> = ({
  visible,
  onClose,
  result,
  currentAddress,
}: IProps) => {
  const {data, errorMsg} = result;

  const renderErrorMsg = () => (
    <View style={styles.errorContainer}>
      <LargeText style={styles.error}>{errorMsg}</LargeText>
    </View>
  );

  const renderResult = () => (
    <View style={styles.resultContainer}>
      <LargeText style={styles.resultTitleAddress}>
        Here are the closest subways to
      </LargeText>
      <LargeText style={styles.resultTitle}>{`${currentAddress} 🚂`}</LargeText>
      {data.map((s: any, i: number) => {
        const isFirst = i === 0;
        const isLast = i === data.length - 1;
        const isFirstStyle = isFirst ? {color: thirdColor} : {};
        const isLastStyle = isLast ? {marginBottom: 30} : {};

        const gMapsNameUri = s.name.replace(' ', '+');

        return (
          <SkeumorphicView
            key={i}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${gMapsNameUri}`,
              )
            }
            style={{...styles.resultButton, ...isLastStyle}}
            elementType="button">
            <View style={styles.resultTextContainer}>
              <Text style={{...styles.result, ...isFirstStyle}} key={s.name}>
                {s.name}
              </Text>
              <Text style={styles.distanceText}>
                {`Distance: ${s.distanceTextRepr}`}
              </Text>
            </View>

            <LocationIcon />
          </SkeumorphicView>
        );
      })}
    </View>
  );

  return (
    <Modal onClose={onClose} visible={visible} useScrollView>
      <View style={styles.container}>
        {errorMsg === '' && data ? (
          <>{renderResult()}</>
        ) : (
          <>{renderErrorMsg()}</>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: 28,
  },
  resultContainer: {
    flex: 1,
  },
  resultTitle: {
    marginBottom: 50,
  },
  resultTitleAddress: {
    fontFamily: 'Muli-Regular',
    color: grey,
    fontSize: 14,
  },
  result: {
    fontSize: 16,
  },
  resultTextContainer: {},
  distanceText: {
    fontSize: 12,
    color: grey,
  },
  resultButton: {
    width: Dimensions.get('screen').width * 0.7,
    backgroundColor: firstColor,
    marginBottom: 35,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ResultModal;
