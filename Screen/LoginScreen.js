import React, {useState, Component, createContext, useContext} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Input from '../Components/Input';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import GeneralIds from '../assets/value/string';
import database from '@react-native-firebase/database';
import AuthContext from '../context/AuthContext';

GoogleSignin.configure({
  webClientId: GeneralIds.GOOGLE_WEB_ID,
  offlineAccess: true,
});

export default class LoginScreen extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super();
    this.state = {
      isLoading: false,
      email: 'huynguyen@gmail.com',
      password: '123123',
      data: [],
      ...props,
    };
  }
  componentDidMount() {
    const value = this.context;
    console.log('value', value);
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  componentDidMount() {
    const CurrentId = auth().currentUser;

    if (CurrentId) {
      const userId = CurrentId.uid;
      database()
        .ref(`/users/${userId}`)
        .set({
          id: userId,
          photoURL: CurrentId.photoURL,
          name: CurrentId.displayName,
          email: CurrentId.email,
        })
        .then(() => console.log('Data set.'));
    }
  }

  async onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  LoginUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!');
    } else {
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User account created & signed in!');
          this.setState({
            isLoading: false,
            email: '',
            password: '',
          });
          console.log('thành công');
          // this.props.navigation.replace('Main');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });
    }
  };

  render() {
    console.log('this', this.context);
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Login Screen</Text>
        <Input
          value={this.state.email}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          secureTextEntry={false}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.LoginUser()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            this.onFacebookButtonPress().then(
              () => this.context.setIsLogin(false),

              console.log('đăng nhập facebook thành công'),
            )
          }>
          <Text style={styles.buttonText}>Login with facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            this.onGoogleButtonPress().then(
              () => this.context.setIsLogin(false),
              console.log('Signed in with Google!'),
            )
          }>
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.navButton}>New user? Join here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },

  navButton: {
    marginTop: 15,
  },
  navButton: {
    fontSize: 14,
    color: '#6646ee',
  },
  buttonContainer: {
    marginTop: 10,
    width: width / 2,
    height: height / 15,
    backgroundColor: '#6495ed',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffff',
    textAlign: 'center',
  },
});
