import React from 'react';
import {
  AsyncStorage,
  FlatList,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'expo';

const isAndroid = Platform.OS === 'android';
const _viewPadding = 10;

const Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((text, i) => ({ key: i, text: text })) : []
    );
  },

  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },

  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },

  save(tasks) {
    AsyncStorage.setItem("TASK", this.convertToStringWithSeparators(tasks));
  }
};

export default class ScheduleScreen extends React.Component {
  static navigationOptions = {
    title: 'To-do list',
  };

  state = {
    tasks: [],
    text: '',
    viewPadding: 10,
  };

  _handleTextChange = text => {
    this.setState({ text: text });
  };

  _addTask = () => {
    const { tasks, text } = this.state;
    let last_key = -1;
    if (tasks.length > 0) {
      let last_idx = tasks.length - 1;
      last_key = tasks[last_idx].key;
    }

    if (text.trim().length > 0) {
      this.setState(
        {
          tasks: tasks.concat({ key: last_key + 1, text: text }),
          text: ''
        },
        () => Tasks.save(tasks)
      );
    }
  };

  _deleteTask = i => {
    const { tasks } = this.state;
    this.setState(
      { 
        tasks: tasks.filter(task => task.key !== i)
      },
      () => Tasks.save(tasks)
    );
  };

  _keyExtractor = (item, index) => index.toString();


  _renderItem = ({item, index}) => (
    <View id={item.key}>
      <View style={styles.listItemCont}>
        <Text style={styles.listItem}>
          {item.text}
        </Text>
        <TouchableOpacity onPress={() => this._deleteTask(item.key)} >
          <Icon.Ionicons 
            name={isAndroid ? 'md-close' : 'ios-close'}
            size={40}
            style={{ margin: 5, marginRight: 15 }}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.hr} />
    </View>
  );

  componentDidMount() {

    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + _viewPadding - 80 })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: _viewPadding })
    );

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  render() {
    const { tasks, text } = this.state;
    return (
      <View style={styles.container}>

        {/* Content Container */}
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <FlatList 
            style={styles.list}
            data={tasks}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </ScrollView>
        <TextInput 
          style={[styles.textInput, {marginBottom: this.state.viewPadding} ]}
          onChangeText={this._handleTextChange}
          onSubmitEditing={this._addTask}
          value={text}
          placeholer="Add Tasks"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    padding: _viewPadding,
    paddingTop: 30,
  },

  list: {
    width: "100%",
  },

  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
  },

  hr: {
    height: 1,
    backgroundColor: "gray",
  },

  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    marginRight: 10,
    marginLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
  },
});
