import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class FabButton extends React.Component {
  handleClickFab = () => {
    this.props.navigation.navigate('Create');
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(null, true)}
          onPress={this.handleClickFab}
        >
          <View style={styles.iconWrapper}>
            <Icon name="plus" size={24} color="#f5f5f5" />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    position: 'absolute',
    bottom: 16,
    right: 16,
    elevation: 8,
    borderRadius: 100,
    backgroundColor: '#f57c00'
  },
  iconWrapper: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withNavigation(FabButton);
