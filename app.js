const express = require('express')
const app = express()
const port = 3001

const firebaseConfig = {
    "type": "service_account",
    "project_id": "test-query-1e735",
    "private_key_id": "----------------------",
    "private_key": "-----BEGIN PRIVATE KEY-----\==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-4c4pb@test-query-1e735.iam.gserviceaccount.com",
    "client_id": "_________________",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4c4pb%40test-query-1e735.iam.gserviceaccount.com"
  };  

  const functions = require('firebase-functions');
  // The Firebase Admin SDK to access Firestore.
  const admin = require('firebase-admin');
  const { getFirestore } = require("firebase-admin/firestore");

  admin.initializeApp(
    {
    credential:  admin.credential.cert(firebaseConfig),
    databaseURL: "https://test-query-1e735-default-rtdb.firebaseio.com"
    }
    );

    const db = getFirestore();

app.get('/', async (req, res) => {
  
    let ref = admin.database().ref(`/TestChatHistory/268/`).limitToLast(2);
    ref.orderByChild("timestamp").on("value", function(data) {
        data.forEach(function(data) {
           console.log("The " + data.key + " rating is " + JSON.stringify(data.val()["timestamp"]));
        })

    })


    // let ref = admin.database().ref(`/TestChatHistory/268/`).limitToFirst(2);

    // ref.orderByChild("timestamp").startAfter(1680604052348).on("value", function(data) {
    //     data.forEach(function(data) {
    //        console.log("The " + data.key + " rating is " + JSON.stringify(new Date(data.val()["timestamp"])));
    //     })
    // })

    })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



