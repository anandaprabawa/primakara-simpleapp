import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class BurgerMenu extends React.Component {
  handleNavigate = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableNativeFeedback
          onPress={this.handleNavigate}
          background={TouchableNativeFeedback.Ripple(null, true)}
        >
          <View style={styles.icon}>
            <Icon name="menu" color="#f5f5f5" size={24} />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 100,
    marginLeft: 14,
    position: 'relative'
  },
  icon: {
    padding: 2
  }
});

export default withNavigation(BurgerMenu);
