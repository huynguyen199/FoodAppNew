import React, {Component} from 'react';
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
var {height, width} = Dimensions.get('window');
import Swiper from 'react-native-swiper';

export default class HomeFoodScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBanner: [],
      dataCategories: [],
      dataFood: [],
      selectCatg: 0,
      loading: false,
      selectId: 0,
    };
  }

  //handle firebase

  componentDidMount() {
    console.log('call 1');

    database()
      .ref('/food')
      .on('value', (snapshot) => {
        console.log('value', snapshot.val());
        var listFood = [];
        snapshot.forEach((food) => {
          listFood.push({
            categorie: food.val().categorie,
            id: food.val().id,
            image: food.val().image,
            name: food.val().name,
            price: food.val().price,
            key: food.key,
          });
        });

        console.log('food', listFood);
        this.setState({dataFood: listFood});
      });

    this.getSliderAndCategories();
  }

  getSliderAndCategories() {
    database()
      .ref('/')
      .on('value', (snapshot) => {
        console.log('snap', snapshot.val());
        this.setState({
          loading: false,
          // dataFood: listFood,
          dataCategories: snapshot.child('categories').toJSON(),
          dataBanner: snapshot.child('banner').toJSON(),
        });
      });
  }

  componentWillUnmount() {
    console.log('call 2');
    return database()
      .ref('/food')
      .on('value', (snapshot) => {
        console.log('value', snapshot.val());
        var listFood = [];
        snapshot.forEach((food) => {
          listFood.push({
            categorie: food.val().categorie,
            id: food.val().id,
            image: food.val().image,
            name: food.val().name,
            price: food.val().price,
            key: food.key,
          });
        });

        console.log('food', listFood);
        this.setState({dataFood: listFood});
      });
  }

  _keyExtractor = (item, index) => item.key;
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f2f2f2'}}>
        <ScrollView showsHorizontalScrollIndicator={true}>
          <View style={{width: width, alignItems: 'center'}}>
            <Image
              style={{height: 60, width: width / 2, margin: 10}}
              resizeMode="contain"
              source={require('../assets/images/foodapp.png')} //*
            />
            <Swiper
              key={this.state.dataBanner.length} //*
              style={{height: width / 2}}
              showsButtons={false}
              autoplay={true}
              autoplayTimeout={2}>
              {this.state.dataBanner.map((itemmap, index) => {
                return (
                  <Image
                    key={index}
                    style={styles.imageBanner}
                    resizeMode="contain"
                    source={{uri: itemmap}}
                  />
                );
              })}
            </Swiper>
            <View style={{height: 20}} />
          </View>
          <View
            style={{
              width: width,
              borderRadius: 20,
              paddingVertical: 20,
              backgroundColor: 'white',
            }}>
            <Text style={styles.titleCatg}>
              Categories {this.state.selectCatg}
            </Text>
            <FlatList
              horizontal={true}
              data={this.state.dataCategories}
              renderItem={({item}) => this._renderItem(item)}
              keyExtractor={(item, index) => 'key' + index}
            />
          </View>
          <FlatList
            data={this.state.dataFood}
            renderItem={({item}) => this._renderItemFood(item)}
            keyExtractor={this._keyExtractor}
            numColumns={2}
            extraData={this.state.selectId}
          />
          <View style={{height: 20}} />
        </ScrollView>
      </SafeAreaView>
    );
  }
  //end render

  /**
   *
   * @param {*dataFood} item
   */
  _renderItemFood(item, index) {
    let catg = this.state.selectCatg;
    if (catg == 0 || catg == item.categorie) {
      return (
        <TouchableOpacity
          style={styles.divFood}
          onPress={() =>
            this.props.navigation.navigate('HomeFoodDetail', {
              foodId: item,
            })
          }>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{uri: item.image}}
          />
          <View
            style={{
              height: width / 2 - 20 - 70,
              backgroundColor: 'transparent',
              width: width / 2 - 20 - 10,
            }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}>
            {item.name}
          </Text>
          <Text style={{textAlign: 'center'}}>Descp Food and Detail</Text>
          <Text style={{fontSize: 20, color: 'green'}}>${item.price}</Text>
        </TouchableOpacity>
      );
    }
  }
  //end item food

  /**
   *
   * @param {*dataCategories} item
   */
  _renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.divCategorie, {backgroundColor: item.color}]}
        onPress={() => this.setState({selectCatg: item.id})}>
        <Image
          style={{width: 100, height: 80}}
          resizeMode="contain"
          source={{uri: item.image}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 22, textAlign: 'center'}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  titleCatg: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  divCategorie: {
    backgroundColor: 'red',
    margin: 5,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  imageFood: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
  },
  divFood: {
    width: width / 2 - 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginHorizontal: 10,
    marginBottom: 5,
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: 'white',
  },
});
