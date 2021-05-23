import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import AuthConsumer from '../context/AuthContext';

var {height, width} = Dimensions.get('window');

class ProfileScreen extends Component {
  static contextType = AuthConsumer;

  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      picture: null,
      adminId: null,
    };
  }
  componentDidMount() {
    console.log('profile', this.context);
  }
  componentWillUnmount() {
    this.signOutUser();
  }
  signOutUser = async () => {
    try {
      await auth().currentUser.signout;
      this.context.setIsLogin(true);
      Alert.alert('Đã đăng xuất');
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    const Current = auth().currentUser;
    this.setState({userInfo: Current});
    this.setState({picture: Current.photoURL});
    database()
      .ref(`/admin/${Current.uid}`)
      .on('value', (snapshot) => {
        if (snapshot.val() !== null) {
          console.log('ton tai ' + snapshot.val().id);
          this.setState({adminId: snapshot.val().id});
        } else {
          this.setState({adminId: null});
        }
      });
  }
  ListOnclick(item) {
    console.log('test', item.key);
  }

  render() {
    const Current = auth().currentUser;
    let UserOrAdmin = null;
    let funcUser = [
      {
        icon: 'heart-outline',
        color: '#33c37d',
        title: 'Thông báo',
        route: null,
      },
      {
        icon: 'heart-outline',
        color: '#33c37d',
        title: 'cảnh báo',
        route: null,
      },
    ];
    let funcAdmin = [
      {
        icon: 'heart-outline',
        color: '#33c37d',
        title: 'Quản lý thức ăn',
        route: () => {
          this.props.navigation.navigate('ManagerFood');
        },
      },
      {
        icon: 'heart-outline',
        color: '#33c37d',
        title: 'Thống kê',
        route: null,
      },
    ];
    if (this.state.adminId == Current.uid) {
      UserOrAdmin = funcAdmin;
    } else {
      UserOrAdmin = funcUser;
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              height: height / 2 - 120,
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                backgroundColor: '#3399ff',
                width: width / 2 - 80,
                height: width / 2 - 80,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                margin: 20,
                backgroundColor: 'white',
              }}>
              <Image
                style={{
                  width: width / 2 - 85,
                  height: width / 2 - 85,
                  borderRadius: 50,
                }}
                source={{uri: this.state.picture}}
              />
            </View>
            <View
              style={{
                height: width / 2 - 70,
                marginTop: 40,
                marginLeft: -10,
              }}>
              <Text style={{fontWeight: 'bold'}}>
                {this.state.userInfo.displayName}
              </Text>
              <Text>{this.state.userInfo.email}</Text>
            </View>
          </View>
          {/* list item */}

          {UserOrAdmin.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={item.route}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 7,
                    backgroundColor: 'white',
                  }}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    color={item.color}
                    size={20}
                    style={{marginLeft: 20}}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      color: '#696969',
                      fontWeight: 'bold',
                    }}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity onPress={() => this.signOutUser()}>
          <View
            style={{
              backgroundColor: 'white',

              justifyContent: 'center',
              flexDirection: 'row',
              borderTopWidth: 1,
              borderColor: '#cccccc',
              padding: 10,
            }}>
            <MaterialCommunityIcons name="logout" color={'#cccccc'} size={20} />
            <Text
              style={{marginLeft: 10, color: '#696969', fontWeight: 'bold'}}>
              Đăng xuất
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default ProfileScreen;
