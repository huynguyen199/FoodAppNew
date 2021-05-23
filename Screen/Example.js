import React, {Component, createRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.modalizeRef = createRef(null);
  }
  onOpen = () => {
    this.modalizeRef.current?.open();
  };
  render() {
    return (
      <>
        <TouchableOpacity onPress={this.onOpen}>
          <Text>Open the modal</Text>
        </TouchableOpacity>

        <Modalize ref={this.modalizeRef} snapPoint={180}>
          <Text>sdas</Text>
        </Modalize>
      </>
    );
  }
}

/* import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
const Example = () => {
  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalizeRef} snapPoint={0}>
        <Text>sdas</Text>
      </Modalize>
    </>
  );
};

export default Example; */
