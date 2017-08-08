import {AsyncStorage} from 'react-native';

let fetchNotes = {};

var notesList = [];

fetchNotes.getAllNotes = (callback)=>{
  try{
    AsyncStorage.getAllKeys((err, keys) => {
  AsyncStorage.multiGet(keys, (err, stores) => {
  stores.map((result, i, store) => {
  // get at each store's key/value so you can work with it
  let key = store[i][0];
  let value = store[i][1];
  var temp = [];
  temp.push(key);
  temp.push(value);

  notesList.push(temp);

  });
  callback(notesList);
  });
  });
  }
  catch(e){
      console.log('caught error', e);
  }
}

fetchNotes.getNote = (key,callback)=>{
  try{
      let value = AsyncStorage.getItem(key);
      if (value != null){
          callback(value);
      }
      else {
          callback(null);
      }
  }
  catch(e){
      console.log('caught error', e);
  }
}

fetchNotes.EditNote = (object,callback)=>
{
  try {
  AsyncStorage.setItem(object.key,object.value);
  callback(true);
} catch (error) {
  // Error saving data
  console.log(error);
}
}

fetchNotes.createNote = (object,callback)=>
{
  try {
  AsyncStorage.setItem(object.key,object.value);
  callback(true);
} catch (error) {
  // Error saving data
  console.log(error);
}
}

fetchNotes.deleteNote = (key,callback)=>
{
  try {
  AsyncStorage.removeItem(key);
  callback(true);
} catch (error) {
  // Error saving data
  console.log(error);
}
}

module.exports = fetchNotes;
