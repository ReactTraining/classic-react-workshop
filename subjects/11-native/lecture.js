/*

"Learn once, write anywhere"

Install Xcode, watchman, and react-native, create a new test project, and start
the dev server:

$ brew install watchman
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
  - Put in the contents of HelloWorld.js

- Build and run!
  - Note how we can change things and use cmd+R for refresh

- Put the contents of Navigation.js in index.ios.js
  - Note how we can pass the underlayColor and onPress props to the <TouchableHighlight> component
  - This is a React component that renders a <View>
    - https://github.com/facebook/react-native/blob/master/Libraries/Components/Touchable/TouchableHighlight.js

*/
