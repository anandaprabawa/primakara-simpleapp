import React from 'react';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback
} from 'react-native';
import firebase from 'react-native-firebase';
import { withNavigation } from 'react-navigation';

class DrawerContent extends React.Component {
  handleLogout = async () => {
    await firebase.auth().signOut();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <DrawerItems {...this.props} />
          <View style={styles.divider} />
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={this.handleLogout}
          >
            <View style={styles.logoutBtn}>
              <Text style={styles.logoutBtnText}>Logout</Text>
            </View>
          </TouchableNativeFeedback>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  divider: {
    marginVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  logoutBtn: {
    padding: 16
  },
  logoutBtnText: {
    fontWeight: '700'
  }
});

export default withNavigation(DrawerContent);
