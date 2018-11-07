import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class AboutScreen extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.para}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus sit
          quo, reprehenderit debitis provident amet nam ipsum molestiae minima.
          Mollitia magnam libero iusto aut, consectetur aliquam voluptatum hic
          saepe cumque.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 24
  },
  para: {
    textAlign: 'center',
    lineHeight: 24
  }
});
