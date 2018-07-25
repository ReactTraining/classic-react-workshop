import invariant from "invariant";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyAT4OaC1A_Soy0f4x-YugeDrBgD6Nt7ZyE",
  authDomain: "hip-react.firebaseapp.com",
  databaseURL: "https://hip-react.firebaseio.com"
});

const messagesRef = firebase.database().ref("messages");

export function login(callback) {
  let loggedInYet = false;

  firebase.auth().onAuthStateChanged(data => {
    if (data) {
      loggedInYet = true;

      const providerData = data.providerData[0];

      callback({
        id: data.uid,
        name: providerData.displayName,
        email: providerData.email,
        photoURL: providerData.photoURL
      });
    } else if (!loggedInYet) {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GithubAuthProvider());
    }
  });
}

export function sendMessage({ userId, photoURL, text }) {
  invariant(
    typeof userId === "string",
    "The first argument to sendMessage must be a string user ID"
  );

  invariant(
    typeof photoURL === "string",
    "The 2nd argument to sendMessage must be a string photo URL"
  );

  invariant(
    typeof text === "string",
    "The 3rd argument to sendMessage must be a string of text"
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
