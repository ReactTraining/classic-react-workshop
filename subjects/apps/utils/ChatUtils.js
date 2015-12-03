import Firebase from 'firebase/lib/firebase-web'

const BaseRef = new Firebase('https://hip-react.firebaseio.com')

let serverTimeOffset = 0
BaseRef.child('.info/serverTimeOffset').on('value', function (snapshot) {
  serverTimeOffset = snapshot.val()
})

function saveAuth(auth) {
  BaseRef.child('users/' + auth.uid).set(auth)
}

export function login(callback) {
  const auth = BaseRef.getAuth()

  if (auth) {
    saveAuth(auth)
    callback(null, auth)
  } else {
    BaseRef.authWithOAuthPopup('github', function (error, auth) {
      if (auth)
        saveAuth(auth)

      callback(error, auth)
    })
  }
}

export function sendMessage(uid, username, avatarURL, text) {
  BaseRef.child('messages').push({
    uid,
    timestamp: Date.now() + serverTimeOffset,
    username,
    avatarURL,
    text
  })
}

export function subscribeToMessages(callback) {
  function handleValue(snapshot) {
    const messages = []

    snapshot.forEach(function (s) {
      const message = s.val()
      message._key = s.key()
      messages.push(message)
    })

    callback(messages)
  }

  const messagesRef = BaseRef.child('messages').limitToLast(100)
  messagesRef.on('value', handleValue)

  return function () {
    messagesRef.off('value', handleValue)
  }
}
