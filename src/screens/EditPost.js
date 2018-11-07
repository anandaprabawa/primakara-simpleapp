import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import { withNavigation } from 'react-navigation';

class CreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postID: props.navigation.getParam('item').id,
      imageSource: props.navigation.getParam('item').image || null,
      content: props.navigation.getParam('item').content || '',
      isSubmitting: false
    };
  }

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  handleClickCamera = () => {
    const options = {
      quality: 1.0,
      maxWidth: 512,
      maxHeight: 512,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.data) {
        this.setState({
          imageSource: 'data:image/jpeg;base64,' + response.data
        });
      }
    });
  };

  handleClearImage = () => {
    this.setState({ imageSource: null });
  };

  handleChangeContent = e => {
    this.setState({ content: e });
  };

  handleSaveData = async () => {
    this.setState({ isSubmitting: true });
    try {
      await firebase
        .firestore()
        .collection('post')
        .doc(this.state.postID)
        .set(
          {
            image: this.state.imageSource,
            content: this.state.content
          },
          { merge: true }
        );
      this.props.navigation.goBack();
    } catch (error) {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { isSubmitting, content } = this.state;

    return (
      <View style={styles.wrapper}>
        <ScrollView style={styles.scrollView}>
          {this.state.imageSource && (
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{ uri: this.state.imageSource }}
              />
              <TouchableNativeFeedback onPress={this.handleClearImage}>
                <View style={styles.closeIcon}>
                  <Icon name="close" size={16} color="#333" />
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
          <TextInput
            placeholder="What do you think about?"
            multiline
            style={styles.inputText}
            onChangeText={this.handleChangeContent}
            value={content}
          />
        </ScrollView>
        <View style={styles.footer}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(null, true)}
            onPress={this.handleClickCamera}
          >
            <View style={styles.imageAddWrapper}>
              <Icon name="camera" size={24} />
            </View>
          </TouchableNativeFeedback>
          {!isSubmitting && (
            <TouchableNativeFeedback onPress={this.handleSaveData}>
              <View style={styles.btnSend}>
                <Text style={styles.btnSendText}>SEND</Text>
                <Icon name="send" size={24} />
              </View>
            </TouchableNativeFeedback>
          )}
          {isSubmitting && (
            <View style={styles.btnSend}>
              <ActivityIndicator size="small" color="red" />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 72,
    position: 'relative',
    height: '100%'
  },
  scrollView: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  imageWrapper: {
    position: 'relative',
    paddingTop: '75%'
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  closeIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 100,
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputText: {
    lineHeight: 24
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  imageAddWrapper: {
    padding: 2,
    borderRadius: 100
  },
  btnSend: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    padding: 8,
    marginRight: -8
  },
  btnSendText: {
    marginRight: 8
  }
});

export default withNavigation(CreateScreen);
