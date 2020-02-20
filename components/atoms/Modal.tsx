import React, {FC, Fragment} from 'react';
import {Modal as ModalComponent} from 'react-native';
import PageView from '../views/PageView';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: Element | Element[] | JSX.Element;
  usePageView?: boolean;
}

const Modal: FC<Props> = ({
  visible,
  onClose,
  children,
  usePageView = true,
}: Props) => {
  const PageElement = usePageView ? PageView : Fragment;

  return (
    <ModalComponent
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <PageElement>{children}</PageElement>
    </ModalComponent>
  );
};

export default Modal;
