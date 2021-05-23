import React, {Component} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dialog} from 'react-native-simple-dialogs';

import InsertFoodDialog from '../Components/Dialogs/InsertFoodDialog';
import EditFoodDialog from '../Components/Dialogs/EditFoodDialog';

//dialog
var {height, width} = Dimensions.get('window');

class ManagerFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFood: [],
      ListFood: [],
      //set value from item then fill data into dialog EditFood
      EditKey: '',
      EditId: '',
      EditName: '',
      EditImage: '',
      EditPrice: '',
      EditCategories: '',
      setItemEdit: (type, value) => {
        this.setState({[type]: value});
      },
    };
  }

  componentDidMount() {
    // console.log('propmanager', this.props);
    database()
      .ref('/') //doi food
      .on('value', (snapshot) => {
        let dataFood = [];
        snapshot.child('food').forEach((food) => {
          dataFood.push({
            key: food.key,
            categorie: food.val().categorie,
            id: food.val().id,
            image: food.val().image,
            name: food.val().name,
            price: food.val().price,
          });
        });
        this.setState({dataFood: dataFood});
      });
    // this.buttonUpdate;
  }
  componentWillUnmount() {
    this.onDeleteFood;
  }

  buttonUpdate(item) {
    console.log('item button', item);
    this.setState({
      EditKey: item.key,
      EditId: item.id,
      EditName: item.name,
      EditImage: item.image,
      EditPrice: item.price,
      EditCategories: item.categorie,
      dialogEditVisible: true,
    });
  }

  /**
   * Edit value from firebase:food
   */
  onChangeFood() {}
  /**
   * Delete value from firebase:food
   */
  onDeleteFood(item) {
    try {
      database()
        .ref('/food/' + item.key)
        .remove();
    } catch (e) {}
  }
  componentDidUpdate() {
    this.buttonUpdate;
  }

  /**
   * @item : Food
   */
  renderItem(item, index) {
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
          source={{uri: item.image}}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
            <Text>this is detail</Text>
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
              ${item.price}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableHighlight
            onPress={() => {
              console.log('index' + index);
              console.log('item' + item[index]);
              this.buttonUpdate(item);
            }}>
            <Icon name="edit" size={45} color={'#9fd236'} />
          </TouchableHighlight>

          <TouchableOpacity onPress={() => this.onDeleteFood(item)}>
            <Icon name="remove" size={45} color={'#9fd236'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    console.log('manager', this.state);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.managerfood}>
          <Text style={styles.textFood}>Quản lý thức ăn</Text>
        </View>
        <FlatList
          data={this.state.dataFood}
          renderItem={({item, index}) => this.renderItem(item, index)}
          keyExtractor={(item, index) => item.key}
        />
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            height: 50,
            width: 50,
            bottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 25,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
          }}>
          {/* dialog add */}
          <InsertFoodDialog
            visible={this.state.dialogVisible}
            data={this.state.dataFood}
            onTouchOutside={() => this.setState({dialogVisible: false})}
          />

          {/* dialog edit update */}
          <EditFoodDialog
            data={this.state.dataFood}
            visible={this.state.dialogEditVisible}
            {...this.state}
            onTouchOutside={() => this.setState({dialogEditVisible: false})}
          />
          <TouchableOpacity
            onPress={() => this.setState({dialogVisible: true})}>
            <MaterialIcons name="add-to-photos" size={22} color="#9fd236" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  managerfood: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9fd236',
    borderRadius: 5,
  },
  textFood: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});

export default ManagerFood;
