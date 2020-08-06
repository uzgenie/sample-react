import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDuVQvz6du8eg_znRgcf5UitnHRhxhp0PM",
  authDomain: "heroic-gantry-254518.firebaseapp.com",
  databaseURL: "https://heroic-gantry-254518.firebaseio.com",
  projectId: "heroic-gantry-254518",
  storageBucket: "heroic-gantry-254518.appspot.com",
  messagingSenderId: "503987400170",
  appId: "1:503987400170:web:8701317b37629caaa99693",
  measurementId: "G-XJXK4HW79R"
});

export const messaging = initializedFirebaseApp.messaging();
// messaging.usePublicVapidKey(
//   // Project Settings => Cloud Messaging => Web Push certificates
//   "BD6n7ebJqtOxaBS8M7xtBwSxgeZwX1gdS...6HkTM-cpLm8007IAzz...QoIajea2WnP8rP-ytiqlsj4AcNNeQcbes"
// );
// const messVar = { messaging };
// export messaging;export
