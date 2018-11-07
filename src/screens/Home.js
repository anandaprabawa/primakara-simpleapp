import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Card from '../components/Card';
import FabButton from '../components/FabButton';
import firebase from 'react-native-firebase';

export default class HomeScreen extends React.Component {
  state = {
    posts: []
  };

  getPosts = async () => {
    try {
      const snap = await firebase
        .firestore()
        .collection('post')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snap => {
          let docs = [];
          snap.forEach(doc => docs.push({ ...doc.data(), id: doc.id }));
          this.setState({ posts: docs });
        });
    } catch (error) {}
  };

  renderItem = ({ item }) => <Card item={item} />;

  keyExtractor = item => item.id;

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { posts } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        <FabButton navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative'
  }
});
