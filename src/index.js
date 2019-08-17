import axios from "axios";
import firebase from "@firebase/app";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyCI8KsgKqVFAud6y_L1qlYK2cJanpk4WRc",
  authDomain: "test123-2d56d.firebaseapp.com",
  databaseURL: "https://test123-2d56d.firebaseio.com",
  projectId: "test123-2d56d",
  storageBucket: "test123-2d56d.appspot.com",
  messagingSenderId: "349985493175",
  appId: "1:349985493175:web:7b3be0d58159724c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

(async () => {
  // const res = await axios.get("https://test123-2d56d.firebaseapp.com/hello");
  // console.warn("-- Console RES", res);

  db.collection("stattt")
    .doc("doc")
    .set({ date: Date.now() + "" });
})();

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
