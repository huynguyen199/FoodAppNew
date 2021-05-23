import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import database from '@react-native-firebase/database';

//screen start
import HomeFoodScreen from './HomeFoodScreen';
import CartScreen from './CartScreen';
import FoodDetailScreen from './FoodDetailScreen';
import ProfileScreen from './ProfileScreen';
import ManagerFood from './ManagerFood';
/**
 * Screen
 */

const HomeStack = createStackNavigator();
const CartStack = createStackNavigator();
const SearchStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Favorite() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Favorite!</Text>
    </View>
  );
}
function FavoriteDetail() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Favorite!</Text>
    </View>
  );
}

/**
 * BASE TAB HOME
 */

function HomeScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="HomeFood" component={HomeFoodScreen} />
      <HomeStack.Screen name="HomeFoodDetail" component={FoodDetailScreen} />
    </HomeStack.Navigator>
  );
}

/**
 * BASE TAB CART
 */

function CartScreens() {
  return (
    <CartStack.Navigator
      initialRouteName="Cart"
      screenOptions={{
        headerShown: false,
      }}>
      <CartStack.Screen name="Cart" component={CartScreen} />
    </CartStack.Navigator>
  );
}

/**
 * BASE TAB FAVORTIE
 */

function SearchScreen() {
  return (
    <SearchStack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}>
      <SearchStack.Screen name="Search" component={Favorite} />
      <SearchStack.Screen name="SearchDetail" component={FavoriteDetail} />
    </SearchStack.Navigator>
  );
}

/**
 * BASE TAB FAVORTIE
 */
function ProfileScreens() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="ManagerFood" component={ManagerFood} />
    </ProfileStack.Navigator>
  );
}

/**
 * BASE BOTTOM
 */
const MainScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="storefront-outline"
              color={color.replace(color, '#33c37d')}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreens}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="cart-outline"
              color={color.replace(color, '#33c37d')}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="feature-search-outline"
              color={color.replace(color, '#33c37d')}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreens}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="heart-outline"
              color={color.replace(color, '#33c37d')}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
