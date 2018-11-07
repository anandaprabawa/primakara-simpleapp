import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import firebase from 'react-native-firebase';

export default class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    isSubmitting: false,
    error: null
  };

  handleNavigateSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleChangeInput = field => e => {
    this.setState({ [field]: e });
  };

  handleLogin = async () => {
    const { email, password } = this.state;

    Keyboard.dismiss();
    if (email !== '' && password !== '') {
      this.setState({ isSubmitting: true });
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        this.props.navigation.navigate('Main');
      } catch (error) {
        this.setState({
          isSubmitting: false,
          error: 'Email or password is invalid. Try again!'
        });
      }
    }
  };

  render() {
    const { isSubmitting, error } = this.state;

    return (
      <View style={styles.authWrapper}>
        <Text style={styles.title}>Simple App</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
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
            onPress={this.handleLogin}
          >
            <View style={styles.btnView}>
              {isSubmitting && (
                <ActivityIndicator color="#f5f5f5" size="small" />
              )}
              {!isSubmitting && <Text style={styles.btnText}>Login</Text>}
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.signUpSection}>
          <Text style={styles.signUpDescText}>Don't have an account?</Text>
          <TouchableWithoutFeedback onPress={this.handleNavigateSignUp}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableWithoutFeedback>
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
  },
  signUpSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32
  },
  signUpDescText: {
    color: '#f5f5f5'
  },
  signUpText: {
    color: '#f5f5f5',
    marginLeft: 8,
    fontWeight: '700'
  }
});
