/*

"Learn once, write anywhere"

Install react-native, create a new test project, and start
the dev server:

$ npm install -g react-native-cli
$ react-native init TestProject
$ cd TestProject
$ npm start

In a new tab:

$ open TestProject.xcodeproj

In Xcode:

- Build and run

- Open TestProject/AppDelegate.m
  - Note how it loads the js file from your dev server

- Open index.ios.js
  - Delete everything!
  - Put this in:

var React = require('react-native');

var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 30,
    margin: 80
  }
});

class TestProject extends React.Component {
  render() {
    return React.createElement(React.Text, {style: styles.text}, "Hello World!");
  }
}

React.AppRegistry.registerComponent('TestProject', () => TestProject);

- Build and run!
- Delete everything again and paste in the following!

var React = require('react-native');
var { AppRegistry, NavigatorIOS, StyleSheet, Text, View, TouchableHighlight } = React;

var styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  },
  description: {
    paddingTop: 100,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  }
});

class Master extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.navigator.push(DetailRoute);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.handlePress}>
        <View style={styles.container}>
          <Text style={styles.description}>Tap me!</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class Detail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>{this.props.message}</Text>
      </View>
    );
  }
}

var MasterRoute = {
  title: 'Test Project',
  component: Master
};

var DetailRoute = {
  title: 'Secret Message',
  component: Detail,
  passProps: {
    message: 'Hello world!'
  }
};

class TestProject extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={MasterRoute}/>
    );
  }
}

AppRegistry.registerComponent('TestProject', () => TestProject);

*/
