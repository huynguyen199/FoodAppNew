import React, {Component} from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthContext from '../context/AuthContext';

var {width, height} = Dimensions.get('window').width;
const slides = [
  {
    key: 'one',
    title: 'Fresh Food',
    text: 'Thức ăn tươi sạch .... ',
    image: require('../assets/images/foodApp1/1.png'),
  },
  {
    key: 'two',
    title: 'Fast Delivery',
    text: 'Giao hành nhanh ....',
    image: require('../assets/images/foodApp1/2.png'),
  },
  {
    key: 'three',
    title: 'Easy Payment',
    text: 'thanh toán với nhiều phương thức khác nhau',
    image: require('../assets/images/foodApp1/3.png'),
  },
];
//Verdana

class IntroduceScreen extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      showHomePage: false,
    };
  }
  renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <Image
          source={item.image}
          style={{
            resizeMode: 'contain',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width,
          }}
        />
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            paddingTop: 30,
            // fontFamily:'Helvetica',
            color: '#D48524',
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            marginHorizontal: 30,
            fontSize: 20,
            textAlign: 'center',
            opacity: 0.5,
            color: '#283542',
          }}>
          {item.text}
        </Text>
      </View>
    );
  };

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({showRealApp: true});
    this.context.setIsIntroduce(false);
  };

  render() {
    if (this.state.showRealApp) {
      return <IntroduceScreen />;
    } else {
      return (
        <AppIntroSlider
          data={slides}
          renderItem={this.renderItem}
          onDone={this._onDone}
          activeDotStyle={{
            backgroundColor: '#D48524',
            width: 30,
          }}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //[...]
});
export default IntroduceScreen;
