import React, {FC} from 'react';
import {Picker as PickerComponent, StyleSheet} from 'react-native';
import {grey} from '../../utils/variables';

export interface IPickerItem {
  label: string;
  value: string;
}

interface Props {
  selectedValue: string;
  setValue: (value: any) => void;
  pickerItems: ReadonlyArray<IPickerItem>;
}

const Picker: FC<Props> = ({setValue, selectedValue, pickerItems}) => (
  <PickerComponent
    style={styles.picker}
    selectedValue={selectedValue}
    onValueChange={(itemValue: any, itemIndex: any) => setValue(itemValue)}
    itemStyle={styles.pickerItem}>
    {pickerItems.map((pi, i) => {
      return <PickerComponent.Item key={i} label={pi.label} value={pi.value} />;
    })}
  </PickerComponent>
);

const styles = StyleSheet.create({
  picker: {
    height: 120,
    width: 120,
    marginBottom: 100,
  },
  pickerItem: {
    fontSize: 18,
    fontFamily: 'Muli-SemiBold',
    color: grey,
  },
});

export default Picker;
