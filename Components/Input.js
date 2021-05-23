import React from 'react';
import {TextInput, StyleSheet, Dimensions} from 'react-native';

const Input = (props) => {
  return <TextInput {...props} style={{...styles.input, ...props.style}} />;
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 5,
    width: width / 1.4,
    height: height / 12,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default Input;
