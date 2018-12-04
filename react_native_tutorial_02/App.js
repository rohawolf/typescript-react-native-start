/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

import React, { Component } from 'react';
import { 
  Alert,
  AppRegistry,
  Button,
  Image,
  StyleSheet, 
  Text,
  TextInput, 
  View 
} from 'react-native';

class Description extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>{this.props.text}!</Text>
      </View>
    );
  }
}

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingText: true
    };

    // Toggle the state every second
    setInterval(() => (
      this.setState(prevState => (
        { isShowingText: !prevState.isShowingText }
      ))
    ), 1000);
  }

  render() {
    return this.state.isShowingText ? <Text>{this.props.text}</Text> : null;
  }
}

class Pizzamaker extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  _handleChange = (text) => this.setState({text})

  render() {
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here something!"
          onChangeText={this._handleChange}
        />
        <Text style={{ padding: 10, fontSize: 42 }}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    )
  }
}

class ButtonBasics extends Component {
  _onPressButton = () => {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button 
          onPress={this._onPressButton}
          title="Press me"
        />
        <Button 
          onPress={this._onPressButton}
          title="Press me"
          color="#841584"
        />
      </View>
    )
  }
}

export default class App extends Component {
  render() {
    const pic = {
      uri: 'https://avatars2.githubusercontent.com/u/38709589?s=460&v=4'
    };
    return (
      <View style={styles.container}>
        {/* My Bio */}
        <Text>Hello world!</Text>
        <Image 
          source={pic}
          style={{ width: 200, height: 200 }}
        />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.red}>2016 Summer Vacation</Text> 
          <Text style={styles.bigblue}>at Hong Kong</Text>
          <Text style={[styles.bigblue, styles.red]}>Viel Spaß!</Text>
        </View>

        {/* Fixed Dimensions boxes 
        <View>
          <View style={{ width: 15, height: 15, backgroundColor: 'powderblue' }} />
          <View style={{ width: 30, height: 30, backgroundColor: 'skyblue' }} />
          <View style={{ width: 45, height: 45, backgroundColor: 'steelblue' }} />
        </View>
        */}
        
        {/* Flex Dimensions boxes */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, height: 10, backgroundColor: 'powderblue' }} />
          <View style={{ flex: 2, height: 10, backgroundColor: 'skyblue' }} />
          <View style={{ flex: 3, height: 10, backgroundColor: 'steelblue' }} />
        </View>

        {/* <Pizzamaker /> */}
        {/* Buttons */}
        <ButtonBasics />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  buttonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});