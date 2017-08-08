import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import fetchNotes from "../components/fetchNotes";

export default class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }

  onSave() {
    console.log(this.state.title);
    console.log(this.state.description);

    that = this;

    fetchNotes.createNote(
      { key: that.state.title, value: that.state.description },
      function(response) {
        if (response) {
          that.props.navigation.goBack();
        }
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref="title"
          style={{
            width: 300,
            marginTop: 6,
            marginBottom: 20,
            padding: 10,
            marginLeft: 5,
            marginRight: 5,
            fontSize: 20,
            fontWeight: "bold"
          }}
          placeholder="Type note title here"
          placeholderTextColor="black"
          multiline={true}
          returnKeyType={"next"}
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={text => {
            this.setState({ title: text });
          }}
          onSubmitEditing={event => {
            this.refs.description.focus();
          }}
        />
        <TextInput
          ref="description"
          style={{
            width: 300,
            marginTop: 6,
            marginBottom: 20,
            padding: 10,
            marginLeft: 5,
            marginRight: 5,
            fontSize: 18
          }}
          placeholder="Type your note description here"
          multiline={true}
          numberOfLines={10}
          editable={true}
          placeholderTextColor="black"
          returnKeyType={"done"}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={text => {
            this.setState({ description: text });
          }}
          value={this.state.description}
          onSubmitEditing={event => {}}
        />
        <Button
          style={{ marginTop: 50 }}
          title="Save"
          onPress={this.onSave.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffaf0"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
