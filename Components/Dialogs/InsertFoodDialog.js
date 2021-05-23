import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import database from '@react-native-firebase/database';

class InsertFoodDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FoodId: null,
      FoodName: 'burger aa',
      LinkImage:
        'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/2KL6JYQYH4I6REYMIWBYVUGXPI.jpg&w=916',
      Price: '12',
      Categorie: '1',
      dataFood: this.props.data,
    };
  }

  /**
   * insert Food
   */
  insertFood() {
    let dataFood = this.state.dataFood;
    var Duplicate = dataFood.find((food) => food.id == this.state.FoodId);
    if (typeof Duplicate === 'undefined') {
      database()
        .ref('/food/')
        .push()
        .set({
          id: parseInt(this.state.FoodId),
          name: this.state.FoodName,
          image: this.state.LinkImage,
          price: parseInt(this.state.Price),
          categorie: parseInt(this.state.Categorie),
        });
      return;
    } else {
      if (JSON.stringify(Duplicate).length > 0) {
        Alert.alert('Vui lòng nhập id khác nhau');

        return;
      }
    }
  }

  render() {
    console.log('av', this.state.FoodId);
    return (
      <Dialog
        visible={this.props.visible}
        title="Add Products"
        dialogStyle={{
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
        }}
        titleStyle={{textAlign: 'center', fontWeight: 'bold'}}
        onTouchOutside={this.props.onTouchOutside}>
        <View>
          <TextInput
            style={{
              height: 40,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#9fd236',
            }}
            value={this.state.FoodId}
            onChangeText={(value) => this.setState({FoodId: value})}
            // textAlign={'center'}
            placeholder="id"
          />
          <TextInput
            style={{
              height: 40,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#9fd236',
              marginTop: 10,
            }}
            value={this.state.FoodName}
            onChangeText={(value) => this.setState({FoodName: value})}
            // textAlign={'center'}
            placeholder="Name"
          />
          <TextInput
            style={{
              height: 40,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#9fd236',
              marginTop: 10,
            }}
            value={this.state.LinkImage}
            onChangeText={(value) => this.setState({LinkImage: value})}
            // textAlign={'center'}
            placeholder="link image"
          />
          <TextInput
            style={{
              height: 40,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#9fd236',
              marginTop: 10,
            }}
            value={this.state.Price}
            onChangeText={(value) => this.setState({Price: value})}
            // textAlign={'center'}
            placeholder="price"
          />
          <TextInput
            style={{
              height: 40,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#9fd236',
              marginTop: 10,
            }}
            value={this.state.Categorie}
            onChangeText={(value) => this.setState({Categorie: value})}
            // textAlign={'center'}
            placeholder="categorie"
          />
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity onPress={() => this.insertFood()}>
              <View
                style={{
                  width: 70,
                  height: 35,
                  backgroundColor: '#9fd236',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Add</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.onTouchOutside}>
              <View
                style={{
                  width: 70,
                  height: 35,
                  backgroundColor: '#9fd236',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
    );
  }
}

export default InsertFoodDialog;
