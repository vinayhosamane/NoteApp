import React, { Component } from "react";
import {
  StyleSheet,
   Text,
   View ,
   TouchableHighlight
} from "react-native";

export default class NoteDetail extends Component {


editPress(){
  console.log('Edit pressed');
}

deletePress(){
  console.log('delete pressed');
}

  render() {
var that = this;

    console.log(that.props.navigation.state.params);
    var noteTitle = that.props.navigation.state.params.note[0];
    var noteDescription = that.props.navigation.state.params.note[1];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {noteTitle}
        </Text>
        <Text style={styles.description}>
          {noteDescription}
        </Text>

        <View style={styles.buttonsView}>
        <TouchableHighlight
          onPress = {this.editPress.bind(this)}
           underlayColor="gray" >
          <Text style={{padding:50,fontSize:20,color:'blue'}}> EditNote </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress = {this.deletePress.bind(this)}
           underlayColor="gray" >
          <Text style={{padding:50,fontSize:20,color:'blue'}}> Delete Note </Text>
        </TouchableHighlight>
        </View>
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
  title: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    marginTop:50,
    fontWeight:'bold'
  },
  description: {
    textAlign: "center",
    color: "#333333",
    marginTop:20,
    marginBottom: 5,
    marginLeft:20,
    marginRight:20,
    fontSize : 20
  },
  buttonsView: {
    flex:0.2,
    flexDirection:'row',
    marginTop:50,
    marginLeft:40,
    marginRight:40,
    alignItems:'center',
    justifyContent:'space-around'
  }
});
