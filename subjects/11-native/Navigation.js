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
      <TouchableHighlight underlayColor="white" onPress={this.handlePress}>
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
        initialRoute={MasterRoute} />
    );
  }
}

AppRegistry.registerComponent('TestProject', () => TestProject);
