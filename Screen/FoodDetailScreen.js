import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
var {height, width} = Dimensions.get('window');
import {ScrollView} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class FoodDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      foodDetail: props.route.params.foodId,
      UserId: null,
    };
  }
  addQuantity = () => {
    this.setState({quantity: this.state.quantity + 1});
    console.log('dataclone', this.state.foodDetail);
  };
  subtractQuantity = () => {
    if (this.state.quantity > 0) {
      this.setState({quantity: this.state.quantity - 1});
    }
  };
  componentDidMount() {
    const uid = auth().currentUser.uid;
    this.setState({UserId: uid});
  }
  //add cart
  onClickAddCart(food, quantity) {
    console.log('detail', food);
    const uid = this.state.UserId;
    database()
      .ref(`/Cart/${uid}`)
      .push()
      .set({
        food,
        quantity: quantity,
      })
      .then(() => console.log('Data set.'));
  }

  render() {
    const food = this.state.foodDetail;
    const quantity = this.state.quantity;
    return (
      <View style={{backgroundColor: 'white'}}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginHorizontal: 20,
            }}>
            <View style={{width: '10%'}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image source={require('../assets/images/2.png')} />
              </TouchableOpacity>
            </View>
            <View style={{width: '10%'}}>
              <Icon name="heart" size={22} style={{left: 220}} />
            </View>
          </View>

          {/* header */}

          <Image
            source={{uri: this.state.foodDetail.image}}
            resizeMode="contain"
            style={{
              height: 300,
              width: width,

              alignSelf: 'center',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: '#f6f3fb',
              paddingHorizontal: 20,
              paddingHorizontal: 8,
              borderRadius: 20,
            }}>
            <TouchableOpacity onPress={this.addQuantity}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                +
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                paddingHorizontal: 20,
              }}>
              {this.state.quantity}
            </Text>
            <TouchableOpacity onPress={this.subtractQuantity}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                -
              </Text>
            </TouchableOpacity>
          </View>
          {/* end amount */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 30,
            }}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                }}>
                {this.state.foodDetail.name}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: '#a4a4a9',
                }}>
                Beef burger
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24,
                  textAlign: 'right',
                  paddingHorizontal: 20,
                }}>
                ${this.state.foodDetail.price}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 30,
              marginHorizontal: 20,
            }}>
            Details
          </Text>
          <Text
            style={{
              color: '#a4a4a9',
              fontWeight: 'bold',
              fontSize: 15,
              marginTop: 10,
              marginHorizontal: 20,
              textAlign: 'justify',
            }}>
            The most unique fire grilled patty, flame grilled, charred, seared,
            well-done All natural beef, grass-feed beef, Fiery, juicy, greacy.
            delicous moist The most unique fire grilled patty, flame grilled,
            charred, seared, well-done All natural beef, grass-feed beef, Fiery,
            juicy, greacy. delicous moist
          </Text>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#000',
            height: 50,
            width: 50,
            bottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 25,
          }}>
          <TouchableOpacity onPress={() => this.onClickAddCart(food, quantity)}>
            <Icon name="shopping-cart" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default FoodDetailScreen;
