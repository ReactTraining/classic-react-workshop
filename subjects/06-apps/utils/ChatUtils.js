var invariant = require('invariant');
var Firebase = require('firebase/lib/firebase-web');

var ref = new Firebase('https://hip-react.firebaseio.com');
var serverTimeOffset = 0;

ref.child('.info/serverTimeOffset').on('value', function (snapshot) {
  serverTimeOffset = snapshot.val();
});

export function login(callback) {
  ref.authWithOAuthPopup('github', callback);
}

export function sendMessage(channel, username, avatar, text) {
  invariant(
    channel && username && avatar && text,
    'You must provide (channel, username, avatar, text) to sendMessage'
  );

  ref.child(`channels/${channel}/messages`).push({
    timestamp: Date.now() + serverTimeOffset,
    username,
    avatar,
    text
  });
}

function subscribeToList(path, callback) {
  function handleChange(snapshot) {
    var items = [];

    snapshot.forEach(function (s) {
      var item = s.val();
      item._key = s.key();
      items.push(item);
    });

    callback(items);
  }

  var child = ref.child(path).limitToLast(100);
  child.on('value', handleChange);

  return function () {
    child.off('value', handleChange);
  };
}

export function subscribeToMessages(channel, callback) {
  return subscribeToList(`channels/${channel}/messages`, callback);
}

export function subscribeToChannels(callback) {
  return subscribeToList(`channels`, callback);
}
