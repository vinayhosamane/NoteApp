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

   that = this;

   fetchNotes.getAllNotes(function(response){
     if(response)
     {
       notesListArray.push(response);
       that.setState({dataSource: that.state.dataSource.cloneWithRows(response),
       notes:response});
     }
   });
 }

  componentDidMount()
  {
    console.log(this.props.navigation);

    that = this;

    fetchNotes.getAllNotes(function(response){
      if(response)
      {
        that.setState({dataSource: that.state.dataSource.cloneWithRows(response),
        notes:response});
      }
    });

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
}

renderRow = (rowData) => {
   return (
     <TouchableHighlight onPress={this._onPressRow.bind(this,rowData)}>
     <View>
          <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'blue',fontWeight: "bold"}}>{rowData[0]}</Text>
    </View>
    </TouchableHighlight>
  );
}

  render() {

  //  var notesFromNavigationProp = this.props.navigation.state.params;
  //  that = this;
  //  if(notesFromNavigationProp)
  //  {
  //    that.setState({dataSource: that.state.dataSource.cloneWithRows(notesFromNavigationProp),
  //    notes:notesFromNavigationProp});
  //  }

     const { navigate } = this.props.navigation;
console.log(navigate);

    return (

      <View style={styles.container}>

      <ListView dataSource={this.state.dataSource}
                renderRow= {this.renderRow}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} />
        <Button
          title = "Add Note"
          onPress = {this.onPress.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf0'
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
  separator: {
      flex: 1,
      height: 4,
      backgroundColor: '#8E8E8E',
      marginTop: 10,
  },
});
