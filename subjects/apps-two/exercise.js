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
import React from 'react'
import sortBy from 'sort-by'
import { Router, Route, Redirect, Link } from 'react-router'
import { login, sendMessage, subscribeToChannels, subscribeToMessages, editMessage, deleteMessage } from './utils/ChatUtils'

/*
Subscribe to channels

```
const subscription = subscribeToChannels('general', (messages) => {
  // here are your channels as an array
});
```

Edit/delete messages:

```
editMessage(channel, message._key);
deleteMessage(channel, message._key);
```
*/
