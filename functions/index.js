// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// [START import]
const express = require("express");
const app = express();
// [END import]

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Since this code will be running in the Cloud Functions environment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore();

exports.hello = functions.https.onRequest((request, response) => {
  const userStatusFirestoreRef = firestore.doc(`status/${context.params.uid}`);
  userStatusFirestoreRef.set({ date: Date.now() }).then(e => {
    response.send("Hello from Firebase!");
  });
});
// Create a new function which is triggered on changes to /status/{uid}
// Note: This is a Realtime Database trigger, *not* Cloud Firestore.
// exports.onUserStatusChanged = functions.database
//   .ref("/status/{uid}")
//   .onUpdate(async (change, context) => {
//     // Get the data written to Realtime Database
//     const eventStatus = change.after.val();
//
//     // Then use other event data to create a reference to the
//     // corresponding Firestore document.
//
//     // It is likely that the Realtime Database change that triggered
//     // this event has already been overwritten by a fast change in
//     // online / offline status, so we'll re-read the current data
//     // and compare the timestamps.
//     const statusSnapshot = await change.after.ref.once("value");
//     const status = statusSnapshot.val();
//     console.log(status, eventStatus);
//     // If the current timestamp for this data is newer than
//     // the data that triggered this event, we exit this function.
//     if (status.last_changed > eventStatus.last_changed) {
//       return null;
//     }
//
//     // Otherwise, we convert the last_changed field to a Date
//     eventStatus.last_changed = new Date(eventStatus.last_changed);
//
//     // ... and write it to Firestore.
//     return userStatusFirestoreRef;
//   });

exports.bigben = functions.https.onRequest((req, res) => {
  const hours = (new Date().getHours() % 12) + 1; // London is UTC + 1hr;
  const userStatusFirestoreRef = firestore.collection("statttt").doc(`status`);
  userStatusFirestoreRef.set({ date: Date.now() }).then(e => {
    res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
      ${"BONG ".repeat(hours)}
    </body>
  </html>`);
    response.send("Hello from Firebase!");
  });
});

// [START middleware]
const cors = require("cors")({ origin: true });
app.use(cors);
// [END middleware]

// [START index]
// This endpoint provides displays the index page.
app.get("/", (req, res) => {
  const date = new Date();
  const hours = (date.getHours() % 12) + 1; // London is UTC + 1hr;
  // [START_EXCLUDE silent]
  res.set(
    "Cache-Control",
    `public, max-age=${secondsLeftBeforeEndOfHour(date)}`
  );
  // [END_EXCLUDE silent]
  res.send(`
  <!doctype html>
    <head>
      <title>Time</title>
      <link rel="stylesheet" href="/style.css">
      <script src="/script.js"></script>
    </head>
    <body>
      <p>In London, the clock strikes: <span id="bongs">${"BONG ".repeat(
        hours
      )}</span></p>
      <button onClick="refresh(this)">Refresh</button>
    </body>
  </html>`);
});
// [END index]

// [START api]
// This endpoint is the BONG API. It returns the bongs as an API.
app.get("/api", (req, res) => {
  const date = new Date();
  const hours = (date.getHours() % 12) + 1; // London is UTC + 1hr;
  // [START_EXCLUDE silent]
  // [START cache]
  res.set(
    "Cache-Control",
    `public, max-age=${secondsLeftBeforeEndOfHour(date)}`
  );
  // [END cache]
  // [END_EXCLUDE silent]
  res.json({ bongs: "BONG ".repeat(hours) });
});
// [END api]

// [START seconds_left]
// Returns the number of seconds left before the next hour starts.
function secondsLeftBeforeEndOfHour(date) {
  const m = date.getMinutes();
  const s = date.getSeconds();
  return 3600 - m * 60 - s;
}
// [END seconds_left]

// [START export]
// Export the express app as an HTTP Cloud Function
exports.app = functions.https.onRequest(app);
// [END export]
