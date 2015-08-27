////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Subscribe to the channels
// - Wire your app up to React Router
// - Add whatever other features you want
//   - add a message filter
//   - parse urls into links
//   - edit a message
//   - delete a message
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var sortBy = require('sort-by');
var escapeRegExp = require('./utils/escapeRegExp');
var { Router, Route, Redirect, Link } = require('react-router');
var { login, sendMessage, subscribeToChannels, subscribeToMessages, editMessage, deleteMessage } = require('./utils/ChatUtils');

/*

Subscribe to channels

```
var subscription = subscribeToChannels('general', (messages) => {
  // here are your channels as an array
});
```

Edit/delete messages:

```
editMessage(channel, message._key);
deleteMessage(channel, message._key);
```

*/
