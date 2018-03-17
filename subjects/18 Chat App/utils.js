import Firebase from "firebase/lib/firebase-web";

const baseRef = new Firebase("https://hip-react.firebaseio.com");
const messagesRef = baseRef.child("messages");
const usersRef = baseRef.child("users");

const reservedRefNameChars = /[\.#\$\[\]]/g;

function escapeKey(name) {
  return name.replace(reservedRefNameChars, "_");
}

function escapeValue(rawValue) {
  const value =
    rawValue && typeof rawValue.toJSON === "function"
      ? rawValue.toJSON()
      : rawValue;

  if (value == null) return null; // Remove undefined values

  if (Array.isArray(value)) return value.map(escapeValue);

  if (typeof value === "object") {
    return Object.keys(value).reduce((memo, key) => {
      memo[escapeKey(key)] = escapeValue(value[key]);
      return memo;
    }, {});
  }

  return value;
}

function saveAuth(auth) {
  usersRef.child(auth.uid).set(escapeValue(auth));
}

export function login(callback) {
  const auth = baseRef.getAuth();

  if (auth) {
    saveAuth(auth);
    callback(null, auth);
  } else {
    baseRef.authWithOAuthPopup("github", (error, auth) => {
      if (auth) saveAuth(auth);
      callback(error, auth);
    });
  }
}

export function subscribeToMessages(callback) {
  const handleValue = snapshot => {
    const messages = [];

    snapshot.forEach(s => {
      const message = s.val();
      message._key = s.key();
      messages.push(message);
    });

    callback(messages);
  };

  messagesRef.on("value", handleValue);

  return () => {
    messagesRef.off("value", handleValue);
  };
}

let serverTimeOffset = 0;
baseRef.child(".info/serverTimeOffset").on("value", s => {
  serverTimeOffset = s.val();
});

export function sendMessage(uid, username, avatarURL, text) {
  messagesRef.push({
    uid,
    timestamp: Date.now() + serverTimeOffset,
    username,
    avatarURL,
    text
  });
}
