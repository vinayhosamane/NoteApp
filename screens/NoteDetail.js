import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  TextInput,
  ScrollView
} from "react-native";

import fetchNotes from "../components/fetchNotes";
import Utils from "../components/Utils";

export default class NoteDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentNoteTitle: this.props.navigation.state.params.note[0],
      currentNoteDescription: this.props.navigation.state.params.note[1],
      editNote: false,
      editedTitle: this.props.navigation.state.params.note[0],
      editedDescription: this.props.navigation.state.params.note[1],
      editTextValue : 'EditNote'
    };
  }

  editPress() {
    console.log("Edit pressed");

    if (this.state.editTextValue=='EditNote') {
      this.setState({
        editNote: true,
        editTextValue : 'Cancel Edit'
      });
    }
    else {
      this.setState({
        editNote: false,
        editTextValue : 'EditNote'
      });
    }

    this.refs.title.focus();
  }

  savePress() {
    console.log("save pressed");

    var that = this;

    that.setState({
      editNote: false
    });

    Alert.alert("Note Alert", "Your edit on existing note saved succefully", [
      {
        text: "OK",
        onPress: () => {
          Utils.validateNote(
            this.state.currentNoteTitle,
            this.state.currentNoteDescription,
            function(response) {
              if (response) {
                fetchNotes.EditNote(
                  {
                    oldkey: that.state.currentNoteTitle,
                    newkey: that.state.editedTitle,
                    value: that.state.editedDescription
                  },
                  function(response) {
                    if (response) {
                      that.props.navigation.state.params.updateList();
                      that.props.navigation.goBack();
                    }
                  }
                );
              } else {
                Alert.alert("Note Alert", response.errorMessage, [
                  {
                    text: "OK",
                    onPress: () => {
                      console.log("error note");
                    }
                  }
                ]);
              }
            }
          );
        }
      }
    ]);
  }

  deletePress() {
    var that = this;
    console.log("delete pressed");

    Alert.alert("Note Alert", "Do you want to delete this note?", [
      {
        text: "OK",
        onPress: () => {
          fetchNotes.deleteNote(that.state.currentNoteTitle, function(response) {
            Alert.alert("Note Alert", "Note is succefully deleted", [
              {
                text: "OK",
                onPress: () => {
                  that.props.navigation.state.params.updateList();
                  that.props.navigation.goBack();
                }
              }
            ]);
          });
        }
      },
      {
        text:"Cancel",
        onPress: ()=> {

        }
      }
    ]);
  }

  render() {
    var that = this;

    console.log(that.props.navigation.state.params);
    var noteTitle = that.props.navigation.state.params.note[0];
    var noteDescription = that.props.navigation.state.params.note[1];

    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            ref="title"
            style={styles.title}
            value={this.state.editedTitle}
            multiline={true}
            editable={this.state.editNote}
            returnKeyType={"next"}
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            onChangeText={text => {
              this.setState({ editedTitle: text });
            }}
            onSubmitEditing={event => {
              this.refs.description.focus();
            }}
          />
          <TextInput
            ref="description"
            style={styles.description}
            value={this.state.editedDescription}
            multiline={true}
            editable={this.state.editNote}
            numberOfLines={10}
            placeholderTextColor="black"
            returnKeyType={"done"}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            onChangeText={text => {
              this.setState({ editedDescription: text });
            }}
            onSubmitEditing={event => {}}
          />

          <View style={styles.buttonsView}>
            {this.state.editNote &&
              <TouchableHighlight
                onPress={this.savePress.bind(this)}
                underlayColor="gray"
              >
                <Text style={{ fontSize: 20, color: "blue" }}> SaveNote </Text>
              </TouchableHighlight>
            }
            <TouchableHighlight
              onPress={this.editPress.bind(this)}
              underlayColor="gray"
            >
              <Text style={{ fontSize: 20, color: "blue" }}> {this.state.editTextValue} </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.deletePress.bind(this)}
              underlayColor="gray"
            >
              <Text style={{ fontSize: 20, color: "blue" }}> Delete Note </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffaf0"
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    marginTop: 50,
    fontWeight: "bold"
  },
  description: {
    textAlign: "center",
    color: "#333333",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    width: 300,
    height: 300
  },
  buttonsView: {
    flex: 1,
    flexDirection: "row",
    marginTop: 50,
    marginLeft: 40,
    marginRight: 40,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 30
  }
});
