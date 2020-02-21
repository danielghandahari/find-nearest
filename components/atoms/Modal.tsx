import React, {FC, Fragment} from 'react';
import {
  Modal as ModalComponent,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {firstColor} from '../../utils/variables';
import PageView from '../views/PageView';
import Text from './Text';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: Element | Element[] | JSX.Element;
  usePageView?: boolean;
  showCancelButton?: boolean;
}

const Modal: FC<Props> = ({
  visible,
  onClose,
  children,
  usePageView = true,
  showCancelButton = true,
}: Props) => {
  const PageElement = usePageView ? PageView : Fragment;

  const renderCancelButton = () => (
    <>
      {showCancelButton && (
        <View style={styles.cancelButton}>
          <TouchableOpacity onPress={onClose}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  return (
    <ModalComponent
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        {renderCancelButton()}
        <PageElement>{children}</PageElement>
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: firstColor,
    position: 'relative',
  },
  cancelButton: {
    marginTop: 50,
    marginRight: 15,
    alignItems: 'flex-end',
  },
});

export default Modal;
