var React = require('react-native');
var { AppRegistry, Text, StyleSheet } = React;

var styles = StyleSheet.create({
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
    return React.createElement(Text, { style: styles.text }, "Hello World!");
  }
}

AppRegistry.registerComponent('TestProject', () => TestProject);
