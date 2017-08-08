
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import AllNotes from '../screens/AllNotes';
import NewNote from '../screens/NewNote';
import NoteDetail from '../screens/NoteDetail';

export const NotesStack = StackNavigator({
  AllNotesPage: {
    screen: AllNotes,
    navigationOptions: {
      title: 'AllNotes',
    },
  },
  NoteDetailsPage: {
    screen: NoteDetail,
    navigationOptions: ({ navigation }) => ({
      title: 'Note Details',
    }),
  },
  NewNotePage: {
    screen: NewNote,
    navigationOptions: ({ navigation }) => ({
      title:'NewNote',
    }),
  },
});
