import Firebase from 'firebase/lib/firebase-web'

const ReservedRefNameChars = /[\.#\$\[\]]/g

const escapeKey = (name) =>
  name.replace(ReservedRefNameChars, '_')

const escapeValue = (rawValue) => {
  const value = (rawValue && typeof rawValue.toJSON === 'function')
    ? rawValue.toJSON()
    : rawValue

  if (value == null)
    return null // Remove undefined values

  if (Array.isArray(value))
    return value.map(escapeValue)

  if (typeof value === 'object') {
    return Object.keys(value).reduce((memo, key) => {
      memo[escapeKey(key)] = escapeValue(value[key])
      return memo
    }, {})
  }

  return value
}

const BaseRef = new Firebase('https://hip-react.firebaseio.com')
const MessagesRef = BaseRef.child('messages')

let serverTimeOffset = 0
BaseRef.child('.info/serverTimeOffset').on('value', function (snapshot) {
  serverTimeOffset = snapshot.val()
})

const saveAuth = (auth) =>
  BaseRef.child('users/' + auth.uid).set(escapeValue(auth))

export const login = (callback) => {
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

export const sendMessage = (uid, username, avatarURL, text) => {
  MessagesRef.push({
    uid,
    timestamp: Date.now() + serverTimeOffset,
    username,
    avatarURL,
    text
  })
}

export const subscribeToMessages = (callback) => {
  function handleValue(snapshot) {
    const messages = []

    snapshot.forEach(function (s) {
      const message = s.val()
      message._key = s.key()
      messages.push(message)
    })

    callback(messages)
  }

  MessagesRef.on('value', handleValue)

  return function () {
    MessagesRef.off('value', handleValue)
  }
}
