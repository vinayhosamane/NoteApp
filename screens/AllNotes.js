import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class AllNotes extends Component {

  componentWillMount()
  {
    console.log(this.props.navigation);
  }

onPress()
{
  console.log("next page");
  this.props.navigation.navigate('NoteDetailsPage',"i am props");
}

  render() {

     const { navigate } = this.props.navigation;
console.log(navigate);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Navigation Sample!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Button
          title = "go to next page"
          onPress = {this.onPress.bind(this)}
        />
      </View>
    );
  }
}
