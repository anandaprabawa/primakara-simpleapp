import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import firebase from 'react-native-firebase';

export default class SignUpScreen extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    isSubmitting: false,
    error: null
  };

  handleChangeInput = field => e => {
    this.setState({ [field]: e });
  };

  saveUserToFirestore = ({ name, email }) => {
    return new Promise(async resolve => {
      try {
        await firebase
          .firestore()
          .collection('user')
          .add({ name, email });
        resolve();
      } catch (error) {
        reject();
      }
    });
  };

  handleSignUp = async () => {
    const { name, email, password } = this.state;

    Keyboard.dismiss();

    if (name !== '' && email !== '' && password !== '') {
      this.setState({ isSubmitting: true });
      try {
        const credential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (credential.additionalUserInfo.isNewUser) {
          try {
            await this.saveUserToFirestore({ name, email });
            this.props.navigation.navigate('Main');
          } catch (error) {
            throw error;
          }
        }
      } catch (error) {
        this.setState({
          isSubmitting: false,
          error: 'Sign up failed. Try again!'
        });
      }
    }
  };

  render() {
    const { isSubmitting, error } = this.state;

    return (
      <View style={styles.authWrapper}>
        <Text style={styles.title}>Create Account</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            textContentType="name"
            returnKeyType="next"
            autoCapitalize="words"
            onChangeText={this.handleChangeInput('name')}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            textContentType="emailAddress"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={this.handleChangeInput('email')}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            textContentType="password"
            returnKeyType="send"
            secureTextEntry
            onChangeText={this.handleChangeInput('password')}
          />
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple()}
            onPress={this.handleSignUp}
            disabled={isSubmitting}
          >
            <View style={styles.btnView}>
              {!isSubmitting && <Text style={styles.btnText}>Sign Up</Text>}
              {isSubmitting && (
                <ActivityIndicator size="small" color="#f5f5f5" />
              )}
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  authWrapper: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    padding: 16
  },
  title: {
    color: '#f5f5f5',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 32
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 16
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: -16
  },
  btnView: {
    backgroundColor: '#f57c00',
    width: '100%',
    height: 48,
    borderRadius: 5,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  btnText: {
    color: '#f5f5f5',
    fontWeight: '700',
    fontSize: 16
  }
});
