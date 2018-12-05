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
  convertJSONToObject(tasks, callback) {
    const convertedObject = JSON.parse(tasks);
    console.log(`JSON -> Object : ${convertedObject}`);
    return callback(
      tasks ? convertedObject : []
    );
  },

  convertObjectToJSON(tasks) {
    const convertedJSON = JSON.stringify(tasks);
    console.log(`Object -> JSON : ${convertedJSON}`);
    return convertedJSON;
  },

  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertJSONToObject(tasks, callback)
    );
  },

  save(tasks) {
    AsyncStorage.setItem("TASK", this.convertObjectToJSON(tasks));
  }
};

export default class ScheduleScreen extends React.Component {
  static navigationOptions = {
    title: 'To-do list',
  };

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      text: '',
      viewPadding: 10,
    };
  }

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
      const newTasks = tasks.concat({ key: last_key + 1, text: text, checked: false });
      this.setState({
        tasks: newTasks,
        text: ''
      });
      // Tasks.save(this.state.tasks);
      // console.log(newTasks);
    }
  };

  _toggleTask = i => {
    const { tasks } = this.state;
    const newTasks = tasks.slice();
    for (let task of newTasks) {
      if (task.key === i) {
        task.checked = !task.checked;
      }
    }
    
    this.setState({
      tasks: newTasks
    });
    // Tasks.save(this.state.tasks);
    // console.log(newTasks);
  }

  _deleteTask = i => {
    const { tasks } = this.state;
    const newTasks = tasks.filter(task => task.key !== i);
    this.setState({ 
      tasks: newTasks
    });
    // Tasks.save(this.state.tasks);
    // console.log(newTasks);
  };

  _keyExtractor = (item, index) => index.toString();


  _renderItem = ({item, index}) => (
    <View id={item.key}>
      <View style={[styles.listItemCont, { backgroundColor: `${item.checked ? '#eee' : '#fff'}`}]}>
        <TouchableOpacity onPressOut={() => this._toggleTask(item.key)} >
          <Icon.Ionicons 
            name={`${isAndroid ? 'md': 'ios'}-${item.checked ? 'undo' : 'checkmark'}`}
            size={ item.checked ? 20 : 40 }
            style={{ margin: 5, marginLeft: 15 }}
            color="blue"
          />
        </TouchableOpacity>

        <Text 
          style={[styles.listItem, { color: `${item.checked ? 'gray': 'black'}`, textDecorationLine: `${item.checked ? 'line-through' : 'none'}`}]}
        >
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

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.tasks !== this.state.tasks ||
      nextState.text !== this.state.text ||
      nextState.viewPadding !== this.state.viewPadding
    ) {
      // console.log(` next tasks : ${JSON.stringify(nextState.tasks)}, now tasks: ${JSON.stringify(this.state.tasks)}`);
      return true;
    }
    return false;
  }

  componentDidMount() {

    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + _viewPadding - 80 })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: _viewPadding })
    );

    // Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
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
          placeholder="할 일 적기"
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
