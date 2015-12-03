import invariant from 'invariant'
import Firebase from 'firebase/lib/firebase-web'

const ref = new Firebase('https://hip-react.firebaseio.com')
let serverTimeOffset = 0

ref.child('.info/serverTimeOffset').on('value', function (snapshot) {
  serverTimeOffset = snapshot.val()
})

export function login(callback) {
  const auth = ref.getAuth()
  if (auth)
    callback(null, auth)
  else
    ref.authWithOAuthPopup('github', callback)
}

export function sendMessage(channel, username, avatar, text) {
  invariant(
    channel && username && avatar && text,
    'You must provide (channel, username, avatar, text) to sendMessage'
  )

  ref.child(`channels/${channel}/messages`).push({
    timestamp: Date.now() + serverTimeOffset,
    username,
    avatar,
    text
  })
}

function subscribeToList(path, callback) {
  function handleChange(snapshot) {
    const items = []

    snapshot.forEach(function (s) {
      const item = s.val()
      item._key = s.key()
      items.push(item)
    })

    callback(items)
  }

  const child = ref.child(path).limitToLast(100)
  child.on('value', handleChange)

  return function () {
    child.off('value', handleChange)
  }
}

export function subscribeToMessages(channel, callback) {
  return subscribeToList(`channels/${channel}/messages`, callback)
}

export function subscribeToChannels(callback) {
  return subscribeToList(`channels`, callback)
}
