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

export function sendMessage(username, text) {
  ref.child('messages').push({
    timestamp: Date.now() + serverTimeOffset,
    username,
    text
  });
}

export function subscribeToMessages(callback) {
  ref.child('messages').limitToLast(100).on('value', (snapshot) => {
    var messages = [];

    snapshot.forEach(function (s) {
      messages.push(s.val());
    });

    callback(messages);
  });
}
