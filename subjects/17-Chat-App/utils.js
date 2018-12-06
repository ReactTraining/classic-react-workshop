import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import invariant from "invariant";

firebase.initializeApp({
  apiKey: "AIzaSyAT4OaC1A_Soy0f4x-YugeDrBgD6Nt7ZyE",
  authDomain: "hip-react.firebaseapp.com",
  databaseURL: "https://hip-react.firebaseio.com"
});

export function login(callback) {
  let alreadyLoggedIn = false;

  firebase.auth().onAuthStateChanged(data => {
    if (data) {
      alreadyLoggedIn = true;

      const providerData = data.providerData[0];

      callback({
        id: data.uid,
        name: providerData.displayName,
        email: providerData.email,
        photoURL: providerData.photoURL
      });
    } else if (!alreadyLoggedIn) {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GithubAuthProvider());
    }
  });
}

const messagesRef = firebase.database().ref("messages");

export function subscribeToMessages(callback) {
  function emitMessages(snapshot) {
    const messages = [];

    snapshot.forEach(s => {
      const message = s.val();
      message.id = s.key;
      messages.push(message);
    });

    callback(messages);
  }

  messagesRef.on("value", emitMessages);

  return () => {
    messagesRef.off("value", emitMessages);
  };
}

export function sendMessage({ userId, photoURL, text }) {
  invariant(
    typeof userId === "string",
    "New messages must have a userId"
  );

  invariant(
    typeof photoURL === "string",
    "New messages must have a photoURL"
  );

  invariant(
    typeof text === "string",
    "New messages must have some text"
  );

  if (text) {
    messagesRef.push({
      timestamp: Date.now(),
      userId,
      photoURL,
      text
    });
  }
}
