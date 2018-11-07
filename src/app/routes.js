import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';
import BurgerMenu from '../components/BurgerMenu';
import DrawerContent from '../components/DrawerContent';

// import screens or pages
import LoadingScreen from '../screens/Loading';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import HomeScreen from '../screens/Home';
import AboutScreen from '../screens/About';
import CreateScreen from '../screens/Create';
import SinglePostScreen from '../screens/SinglePost';
import EditPostScreen from '../screens/EditPost';

// common stack navigation settings
const commonStackSettings = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#1976d2'
    },
    headerTintColor: '#fff'
  }
};

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen
  },
  { headerMode: 'none' }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerLeft: <BurgerMenu />,
        title: 'Home'
      }
    },
    Create: CreateScreen,
    SinglePost: SinglePostScreen,
    EditPost: EditPostScreen
  },
  {
    navigationOptions: {
      ...commonStackSettings.navigationOptions
    }
  }
);

const AboutStack = createStackNavigator(
  {
    About: {
      screen: AboutScreen,
      navigationOptions: {
        headerLeft: <BurgerMenu />,
        title: 'About'
      }
    }
  },
  {
    navigationOptions: {
      ...commonStackSettings.navigationOptions
    }
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Home: HomeStack,
    About: AboutStack
  },
  {
    contentComponent: DrawerContent
  }
);

export default createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  Auth: AuthStack,
  Main: DrawerStack
});
