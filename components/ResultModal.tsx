/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, {FC} from 'react';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import {thirdColor} from '../utils/variables';
import Modal from './atoms/Modal';
import Text from './atoms/Text';
import {Result} from '../custom-types';
import LargeText from './atoms/LargeText';
import {trim} from '../utils/functions';

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
  const resultTitle = `Here are the closest subways to ${currentAddress} 🚂🤩`;

  const renderErrorMsg = () => (
    <View style={styles.errorContainer}>
      <LargeText style={styles.error}>{errorMsg}</LargeText>
    </View>
  );

  const renderResult = () => (
    <View style={styles.resultContainer}>
      <LargeText style={styles.resultTitle}>{resultTitle}</LargeText>
      {data.map((s: any, i: number) => {
        const isFirst = i === 0;
        const isLast = i === data.length - 1;
        const isFirstStyle = isFirst ? {color: thirdColor} : {};
        const isLastStyle = isLast ? {marginBottom: 30} : {};

        const gMapsNameUri = s.name.replace(' ', '+');

        return (
          <TouchableOpacity
            key={i}
            activeOpacity={1}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${gMapsNameUri}`,
              )
            }>
            <Text
              style={{...styles.result, ...isFirstStyle, ...isLastStyle}}
              key={s.name}>{`${s.name}: ${s.distanceTextRepr}`}</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  result: {
    fontSize: 16,
    paddingTop: 10,
  },
});

export default ResultModal;
