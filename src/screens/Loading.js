import React from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import firebase from 'react-native-firebase';

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    // setting status bar color
    StatusBar.setBackgroundColor('#004ba0');

    firebase.auth().onAuthStateChanged(async user => {
      setTimeout(() => {
        if (user) {
          this.props.navigation.navigate('Main');
        } else {
          this.props.navigation.navigate('Auth');
        }
      }, 1000);
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>Simple App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#1976d2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#f5f5f5'
  }
});
