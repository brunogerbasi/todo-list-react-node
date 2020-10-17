const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://edirect-be938.firebaseio.com"
  });

//# ROUTES
app.use('/', require('./routes/index'));


//Listen
// app.listen(port, () => {
//     console.log(`Server running on port: ${port}`);
// });

exports.app = functions.https.onRequest(app);