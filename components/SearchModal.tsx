import React, {FC} from 'react';
import Modal from './atoms/Modal';
import GooglePlacesInput from './GooglePlacesInput';

interface IProps {
  visible: boolean;
  onClose: () => void;
  setCurrentAddress: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (arg: any) => void;
}

const SearchModal: FC<IProps> = ({
  visible,
  onClose,
  setCurrentAddress,
  onSearch,
}: IProps) => (
  <Modal
    onClose={onClose}
    visible={visible}
    usePageView={false}
    showCancelButton={false}>
    <GooglePlacesInput
      onClose={onClose}
      setCurrentAddress={setCurrentAddress}
      onSearch={onSearch}
    />
  </Modal>
);

export default SearchModal;
