const Firebase = require('firebase/lib/firebase-web');

const ref = new Firebase('https://hip-react.firebaseio.com');

let serverTimeOffset = 0;

ref.child('.info/serverTimeOffset').on('value', function (snapshot) {
  serverTimeOffset = snapshot.val();
});

export function login(callback) {
  ref.authWithOAuthPopup('github', callback);
}

export function sendMessage(channel, username, avatar, text) {
  ref.child(`channels/${channel}/messages`).push({
    timestamp: Date.now() + serverTimeOffset,
    username,
    avatar,
    text
  });
}

export function deleteMessage(channel, key) {
  console.log(channel, key);
  ref.child(`channels/${channel}/messages/${key}`).set(null);
}

export function editMessage(channel, key, text) {
  ref.child(`channels/${channel}/messages/${key}/text`).set(text);
}

function subscribeToList(path, callback) {
  const child = ref.child(path).limitToLast(100);
  const onChange = child.on('value', (snapshot) => {
    const items = [];

    snapshot.forEach(function (s, k) {
      const item = s.val();
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
