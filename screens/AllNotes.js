import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
   ListView,
   ScrollView,
   TouchableHighlight
} from 'react-native';

import fetchNotes from "../components/fetchNotes";
import notesListArray from "../components/notesListArray";
import Icon from 'react-native-vector-icons/Ionicons';

const list = [
  {
    name: 'Amy Farha Vinay Hosamane',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    subtitle: 'Vice Chairman'
  }
];

export default class AllNotes extends Component {

  constructor(props) {
   super(props)
   const ds = new ListView.DataSource({
     rowHasChanged: (r1, r2) => r1 !== r2
   });
   this.state = {
       notes : [],
      dataSource: ds.cloneWithRows(list),
      isLoading : false
    };
 }

 componentWillMount()
 {
   console.log(this.props.navigation);

   this.updateListView();
 }

  updateListView = ()=>{

    that = this;

    fetchNotes.getAllNotes(function(response){
      if(response)
      {
        that.setState({dataSource: that.state.dataSource.cloneWithRows(response),
        notes:response});
      }
    });
  }


onPress()
{
  console.log("next page");
  this.props.navigation.navigate('NewNotePage',{updateList:this.updateListView.bind(this)});
}

_onPressRow(rowData) {

    console.log(rowData);

    this.props.navigation.navigate('NoteDetailsPage',{note:rowData,updateList:this.updateListView.bind(this)});
}

renderRow = (rowData) => {
   return (
     <TouchableHighlight onPress={this._onPressRow.bind(this,rowData)}  underlayColor="gray">
     <View>
          <Text style={{textAlign: 'center', marginTop:10, fontSize:27,color:'blue',fontWeight: "bold",underlayColor:'#fffaf0'}}>{rowData[0]}</Text>
    </View>
    </TouchableHighlight>
  );
}

  render() {

     const { navigate } = this.props.navigation;
console.log(navigate);

    return (
      <View style={styles.container}>
      <View style={{alignItems:"flex-end",marginRight:20}}>
      <TouchableHighlight
        onPress = {this.onPress.bind(this)}
         underlayColor="gray" >
        <Text style={{fontSize:25 , alignItems:"center",marginBottom:10,marginTop:10}}> Add Note </Text>
      </TouchableHighlight>
      </View>

      <ListView dataSource={this.state.dataSource}
                renderRow= {this.renderRow}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} />
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf0'
  },
  separator: {
      flex: 1,
      height: 1,
      backgroundColor: '#8E8E8E',
      marginTop: 10,
  },
});
