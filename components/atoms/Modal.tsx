import React, {FC} from 'react';
import {Modal as ModalComponent} from 'react-native';
import PageView from '../views/PageView';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: Element | Element[];
}

const Modal: FC<Props> = ({visible, onClose, children}: Props) => {
  return (
    <ModalComponent
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <PageView>{children}</PageView>
    </ModalComponent>
  );
};

export default Modal;
