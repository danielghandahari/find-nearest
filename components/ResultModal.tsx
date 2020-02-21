import React, {FC} from 'react';
import Modal from './atoms/Modal';
import Text from './atoms/Text';
import {Result} from '../custom-types';

interface IProps {
  visible: boolean;
  onClose: () => void;
  result: Result;
}

const ResultModal: FC<IProps> = ({visible, onClose, result}: IProps) => {
  const {data, errorMsg} = result;

  return (
    <Modal onClose={onClose} visible={visible}>
      <Text>Hello from res!</Text>
      {errorMsg === '' && data ? (
        data.map((s: any) => <Text>{s.name}</Text>)
      ) : (
        <Text>{errorMsg}</Text>
      )}
    </Modal>
  );
};

export default ResultModal;
