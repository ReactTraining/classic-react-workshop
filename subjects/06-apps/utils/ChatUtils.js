var Firebase = require('firebase/lib/firebase-web');

var ref = new Firebase('https://hip-react.firebaseio.com');
window.ref = ref;

var serverTimeOffset = 0;

ref.child('.info/serverTimeOffset').on('value', function (snapshot) {
  serverTimeOffset = snapshot.val();
});

export function login(callback) {
  ref.authWithOAuthPopup('github', callback);
}

export function sendMessage(channel, username, text) {
  ref.child(`channels/${channel}/messages`).push({
    timestamp: Date.now() + serverTimeOffset,
    username,
    text
  });
}

function subscribeToList(path, callback) {
  var child = ref.child(path).limitToLast(100);
  var onChange = child.on('value', (snapshot) => {
    var items = [];

    snapshot.forEach(function (s, k) {
      var item = s.val();
      item._key = s.key();
      items.push(item);
    });

    callback(items);
  });

  return {
    dispose() {
      child.off('value', onChange);
    }
  };
}

export function subscribeToMessages(channel, callback) {
  return subscribeToList(`channels/${channel}/messages`, callback);
}

export function subscribeToChannels(callback) {
  return subscribeToList(`channels`, callback);
}
