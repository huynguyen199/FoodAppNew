import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import database from '@react-native-firebase/database';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

const renderItem = (item, index) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#cccccc',
        backgroundColor: 'white',
        margin: 2,
        borderRadius: 10,
      }}>
      <Image
        style={{width: width / 3, height: width / 3, resizeMode: 'contain'}}
        source={{uri: item.hinh}}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
          <Text>{item.ten}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#33c37d',
              fontSize: 20,
            }}>
            ${item.gia}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableHighlight>
          <Icon name="edit" size={45} color={'#9fd236'} />
        </TouchableHighlight>

        <TouchableOpacity onPress={() => onDeleteCar(item)}>
          <Icon name="remove" size={45} color={'#9fd236'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const onDeleteCar = (item) => {
  database()
    .ref('/Xe/' + item.key)
    .remove();
};
const FlatlistExample = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    database()
      .ref('/') //doi food
      .once('value', (snapshot) => {
        let dataFood = [];
        snapshot.child('Xe').forEach((xe) => {
          dataFood.push({
            key: xe.key,
            gia: xe.val().gia,
            hinh: xe.val().hinh,
            id: xe.val().id,
            ten: xe.val().ten,
          });
        });
        setData(dataFood);
      });
  }, [data]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => index + 'key'}
      />
    </SafeAreaView>
  );
};

export default FlatlistExample;
