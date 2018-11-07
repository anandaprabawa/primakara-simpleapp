import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  Modal,
  ActivityIndicator
} from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';
import rnImage from '../assets/images/rn-image.jpeg';

class SinglePost extends React.Component {
  state = {
    item: null,
    modal: false,
    isSubmitting: false
  };

  handleClickEdit = () => {
    this.props.navigation.navigate('EditPost', {
      item: this.state.item
    });
  };

  handleOpenModal = () => {
    this.setState({ modal: true });
  };

  handleCloseModal = () => {
    this.setState({ modal: false });
  };

  handleDeletePost = async () => {
    this.setState({ isSubmitting: true });
    try {
      await firebase
        .firestore()
        .collection('post')
        .doc(this.state.item.id)
        .delete();
      this.props.navigation.navigate('Home');
    } catch (error) {
      this.handleCloseModal();
      this.setState({ isSubmitting: false });
    }
  };

  componentDidMount() {
    const postID = this.props.navigation.getParam('item').id;
    firebase
      .firestore()
      .collection('post')
      .doc(postID)
      .onSnapshot(snap => {
        this.setState({ item: { ...snap.data(), id: snap.id } });
      });
  }

  render() {
    const { item, modal, isSubmitting } = this.state;

    return (
      <View style={styles.wrapper}>
        {item && (
          <>
            <View style={styles.imageWrapper}>
              <Image
                source={item.image ? { uri: item.image } : rnImage}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <View style={styles.bodyWrapper}>
              <Text>{item.content}</Text>
            </View>
            <View style={styles.footer}>
              <TouchableNativeFeedback onPress={this.handleClickEdit}>
                <Text style={styles.btnAction}>Edit</Text>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={this.handleOpenModal}>
                <Text style={styles.btnAction}>Delete</Text>
              </TouchableNativeFeedback>
            </View>
            <Modal
              visible={modal}
              onRequestClose={this.handleCloseModal}
              onDismiss={this.handleCloseModal}
              animationType="fade"
              transparent={true}
            >
              <View style={styles.modalContainer}>
                <View style={styles.dialogDelete}>
                  <Text style={styles.dialogText}>Delete Post? </Text>
                  {!isSubmitting && (
                    <View style={styles.dialogBtnWrapper}>
                      <TouchableNativeFeedback onPress={this.handleDeletePost}>
                        <Text style={styles.dialogBtnText}>Yes</Text>
                      </TouchableNativeFeedback>
                      <TouchableNativeFeedback onPress={this.handleCloseModal}>
                        <Text style={styles.dialogBtnText}>No</Text>
                      </TouchableNativeFeedback>
                    </View>
                  )}
                  {isSubmitting && (
                    <ActivityIndicator size="large" color="blue" />
                  )}
                </View>
              </View>
            </Modal>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
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
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  btnAction: {
    padding: 16
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 24
  },
  dialogDelete: {
    backgroundColor: '#fff',
    display: 'flex',
    width: '100%',
    padding: 16,
    borderRadius: 5
  },
  dialogText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  dialogBtnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32
  },
  dialogBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    flex: 1,
    textAlign: 'center'
  }
});

export default withNavigation(SinglePost);
