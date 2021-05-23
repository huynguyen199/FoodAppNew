import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  Component,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const TAG = 'LoginScreen';

const RegisterScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Confirmed, setConfirmed] = useState(false);

  const signUpEmail = (email, password) => {
    console.log('click');
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setEmail(null);
        setPassword(null);
        setConfirmed(true);
        Alert.alert('Đăng ký thành công');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Địa chỉ Email đã được sử dụng');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Địa chỉ Email không hợp lệ');
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register Screen</Text>
      <Text>Already have an account</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        secureTextEntry={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}></TextInput>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => signUpEmail(email, password)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => props.navigation.pop()}>
        <Text style={styles.navButton}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

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

  input: {
    padding: 10,
    marginTop: 5,
    width: width / 1.4,
    height: height / 12,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
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
  },
});

export default RegisterScreen;
