import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button ,Alert} from "react-native";

import fetchNotes from "../components/fetchNotes";
import notesListArray from "../components/notesListArray";
import Utils from "../components/Utils";

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

    var that = this;

    Utils.validateNote(this.state.title,this.state.description,function(response){
      if(response.status)
      {
        fetchNotes.createNote(
          { key: that.state.title, value: that.state.description },
          function(response) {
            if (response) {
               var note = [that.state.title,that.state.description];

              that.props.navigation.state.params.updateList();

              that.props.navigation.goBack();
            }
          }
        );
      }
      else {
        Alert.alert("Note Alert",response.errorMessage, [
          {
            text: "OK",
            onPress: () => {
              console.log("error note");
            }
          }
        ]);
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;

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
  }
});
