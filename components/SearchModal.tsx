import React, {FC} from 'react';
import Modal from './atoms/Modal';
import GooglePlacesInput from './GooglePlacesInput';

interface IProps {
  visible: boolean;
  onClose: () => void;
  setCurrentAddress: React.Dispatch<React.SetStateAction<string>>;
}

const SearchModal: FC<IProps> = ({
  visible,
  onClose,
  setCurrentAddress,
}: IProps) => (
  <Modal onClose={onClose} visible={visible} usePageView={false}>
    <GooglePlacesInput
      onClose={onClose}
      setCurrentAddress={setCurrentAddress}
    />
  </Modal>
);

export default SearchModal;
