import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';

const insertXe = () => {
  const [name, setName] = useState('');
  const [gia, setGia] = useState('');
  const [Id, setId] = useState('');
  const [hinh, setHinh] = useState('');

  const insert = () => {
    database()
      .ref('/Xe')
      .push()
      .set({
        gia: gia,
        hinh: hinh,
        id: Id,
        ten: name,
      })
      .then(() => console.log('Data set.'));
  };
  return (
    <View style={{flex: 1}}>
      <Text>dsad</Text>
      <TextInput
        style={{backgroundColor: 'white'}}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{backgroundColor: 'white'}}
        value={gia}
        onChangeText={(text) => setGia(text)}
      />
      <TextInput
        style={{backgroundColor: 'white'}}
        value={Id}
        onChangeText={(text) => setId(text)}
      />
      <TextInput
        style={{backgroundColor: 'white'}}
        value={hinh}
        onChangeText={(text) => setHinh(text)}
      />
      <TouchableOpacity onPress={() => insert()}>
        <Text>add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default insertXe;
