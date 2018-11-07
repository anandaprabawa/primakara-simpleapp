import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { withNavigation } from 'react-navigation';
import rnImage from '../assets/images/rn-image.jpeg';

class Card extends React.Component {
  handleClick = () => {
    this.props.navigation.navigate('SinglePost', { item: this.props.item });
  };

  render() {
    const { item } = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <TouchableWithoutFeedback onPress={this.handleClick}>
            <Image
              source={item.image ? { uri: item.image } : rnImage}
              resizeMode="cover"
              style={styles.image}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.bodyWrapper}>
          <Text>{item.content}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 32
  },
  imageWrapper: {
    position: 'relative',
    paddingTop: '56.25%'
  },
  image: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#eee'
  },
  bodyWrapper: {
    display: 'flex',
    paddingHorizontal: 16,
    paddingVertical: 8
  }
});

export default withNavigation(Card);
