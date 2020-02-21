/* eslint-disable jsx-a11y/accessible-emoji */
import React, {FC} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
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
}

const ResultModal: FC<IProps> = ({visible, onClose, result}: IProps) => {
  const {data, errorMsg} = result;

  const renderErrorMsg = () => (
    <View style={styles.errorContainer}>
      <LargeText style={styles.error}>{errorMsg}</LargeText>
    </View>
  );

  const renderResult = () => (
    <ScrollView style={styles.resultContainer}>
      <LargeText style={styles.resultTitle}>
        Here are the nearest subways 🚂🤩
      </LargeText>
      {data.map((s: any, i: number) => {
        const isFirst = i === 0;
        const isFirstStyle = isFirst ? {color: thirdColor} : {};

        return (
          <Text style={{...styles.result, ...isFirstStyle}} key={s.name}>{`${
            trim(s.name, 15).formattedStr
          }: ${s.distanceTextRepr}`}</Text>
        );
      })}
    </ScrollView>
  );

  return (
    <Modal onClose={onClose} visible={visible}>
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
    paddingTop: 5,
  },
});

export default ResultModal;
