import React from 'react';
import Routes from './routes';
import OneSignal from 'react-native-onesignal';

export default class App extends React.Component {
  componentDidMount() {
    OneSignal.init('7a79118d-fcdc-4a76-acd6-512b0ebf64be');
    // Example, always display notification in shade.
    OneSignal.inFocusDisplaying(2);
  }

  render() {
    return <Routes />;
  }
}
