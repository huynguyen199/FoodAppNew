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

class EditFoodDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFood: this.props.data,
    };
  }

  updateFood() {
    console.log('key', this.props.EditKey);
    database()
      .ref(`/food/${this.props.EditKey}`)
      .update({
        categorie: this.props.EditCategories,
        id: this.props.EditId,
        image: this.props.EditImage,
        name: this.props.EditName,
        price: this.props.EditPrice,
      })
      .then(() => {
        console.log('Data updated.');
      });
  }
  render() {
    console.log('props', this.props);
    console.log('state', this.state);

    return (
      <Dialog
        visible={this.props.visible}
        title="Product Edit"
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
            editable={false}
            value={String(this.props.EditId)}
            onChangeText={(value) => this.props.setItemEdit('EditId', value)}
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
            value={String(this.props.EditName)}
            onChangeText={(value) => this.props.setItemEdit('EditName', value)}
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
            value={String(this.props.EditImage)}
            onChangeText={(value) => this.props.setItemEdit('EditImage', value)}
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
            value={String(this.props.EditPrice)}
            onChangeText={(value) => this.props.setItemEdit('EditPrice', value)}
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
            // value={this.state.Categorie}
            // onChangeText={(value) => this.setState({Categorie: value})}
            // textAlign={'center'}
            value={String(this.props.EditCategories)}
            onChangeText={(value) =>
              this.props.setItemEdit('EditCategories', value)
            }
            placeholder="categorie"
          />
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity onPress={() => this.updateFood()}>
              <View
                style={{
                  width: 70,
                  height: 35,
                  backgroundColor: '#9fd236',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Update</Text>
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

export default EditFoodDialog;
