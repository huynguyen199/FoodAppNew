import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screen/LoginScreen';
import RegisterScreen from '../Screen/RegisterScreen';
import MainScreen from '../Screen/MainScreen';
import {enableScreens} from 'react-native-screens';
import IntroduceScreen from '../Screen/IntroduceScreen';
import {AuthProvider} from '../context/AuthContext';
enableScreens(true);
const TAG = 'NavigationView';

const Stack = createStackNavigator();

class NavigationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      isIntroduce: true,
      setIsIntroduce: (value) => {
        this.setState({isIntroduce: value});
      },
      setIsLogin: (value) => {
        this.setState({isLogin: value});
      },
    };
  }

  render() {
    return (
      <AuthProvider
        value={{
          isLogin: this.state.isLogin,
          setIsLogin: this.state.setIsLogin,
          isIntroduce: this.state.isIntroduce,
          setIsIntroduce: this.state.setIsIntroduce,
        }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Introduce"
            screenOptions={{
              headerShown: false,
            }}>
            {this.state.isIntroduce ? (
              <Stack.Screen name="Introduce" component={IntroduceScreen} />
            ) : this.state.isLogin ? (
              <Stack.Screen
                options={{
                  fontWeight: 'bold',
                }}
                name="Login">
                {(props) => <LoginScreen {...this.state} {...props} />}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="Main" component={MainScreen} />
            )}

            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );
  }
}
export default NavigationView;
