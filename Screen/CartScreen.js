import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
var {height, width} = Dimensions.get('window');
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

// lần sau làm đại thêm hết thông tin food

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
      foodId: [],
    };
  }

  /**
   * fetch data firebase from cart
   */
  componentDidMount() {
    const uid = auth().currentUser.uid;
    /**
     * fetching data of list @food
     * fetching data of @dataCart
     * */
    database()
      .ref(`/Cart/${uid}`)
      .on('value', (snapshot) => {
        if (snapshot.val() != null) {
          var li = [];
          var listFood = [];
          snapshot.forEach((child) => {
            listFood.push(child.val().foodId);

            li.push({
              key: child.ref.key,
              food: child.val().food,
              quantity: child.val().quantity,
            });
          });
          this.setState({foodId: listFood});
          this.setState({dataCart: li});
        }

        // const FoodsToFetch = this.state.foodId;

        // let Food = [];
        // FoodsToFetch.map((id) => {
        //   database()
        //     .ref('/food')
        //     .orderByChild('id')
        //     .equalTo(id)
        //     .on('value', (snapshot) => {
        //       snapshot.forEach(function (child) {
        //         Food.push(child.val());
        //       });
        //       this.setState({dataFood: Food});
        //     });
        // });
      });
    console.log('component');
  }

  /**
   * change Quantity
   */
  // onChangeQual(index, type, data) {
  //   const uid = auth().currentUser.uid;

  //   const dataCar = this.state.dataCart;
  //   let cantd = dataCar[index].quantity;

  //   if (type) {
  //     cantd = cantd + 1;
  //     dataCar[index].quantity = cantd;
  //     this.setState({dataCart: dataCar});
  //   } else if (type == false && cantd >= 2) {
  //     cantd = cantd - 1;
  //     dataCar[index].quantity = cantd;
  //     this.setState({dataCart: dataCar});
  //   } else if (type == false && cantd == 1) {
  //     // dataCar.splice(index, 1);
  //     this.setState({dataCart: dataCar});
  //   }
  // }

  /**
   *
   * @param {*dataCart} item
   * @param {*dataCart} index
   */
  _renderItemCart(item, index) {
    const uid = auth().currentUser.uid;
    // console.log('item', item);

    return (
      <View
        style={{
          width: width - 20,
          flexDirection: 'row',
          borderBottomWidth: 2,
          borderColor: '#cccccc',
        }}>
        <Image
          style={{width: width / 3, height: width / 3, resizeMode: 'contain'}}
          source={{
            uri: item.food.image,
          }}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {item.food.name}
            </Text>
            <Text>sda</Text>
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
              ${item.food.price}
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  database()
                    .ref(`/Cart/${uid}/` + item.key)
                    .update({quantity: (item.quantity -= 1)});
                }}>
                <Icon name="ios-remove-circle" size={30} color={'#9fd236'} />
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingHorizontal: 8,
                }}>
                {item.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  database()
                    .ref(`/Cart/${uid}/` + item.key)
                    .update({quantity: (item.quantity += 1)});
                }}>
                <Icon name="ios-add-circle" size={30} color={'#9fd236'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  _keyExtractor = (item, index) => 'key' + index;

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{height: 20}} />
        <Text style={{fontSize: 28, color: 'gray', fontWeight: 'bold'}}>
          Cart food
        </Text>
        <View style={{height: 10}} />

        <View style={{backgroundColor: 'transparent', flex: 1}}>
          <FlatList
            data={this.state.dataCart}
            renderItem={({item, index}) => this._renderItemCart(item, index)}
            keyExtractor={this._keyExtractor}
            extraData={this.state.dataCart}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#9fd236',
            width: width - 40,
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Thanh Toán
          </Text>
        </TouchableOpacity>
        <View style={{height: 10}} />
      </View>
    );
  }
}

export default CartScreen;
