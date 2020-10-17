const Rebase = require('re-base')
const firebase = require('firebase')

var firebaseConfig = {
    apiKey: "AIzaSyA07ldLvtAl6dWL-5aaH0UJvFXdlHt2Tsw",
    authDomain: "edirect-be938.firebaseapp.com",
    databaseURL: "https://edirect-be938.firebaseio.com",
    projectId: "edirect-be938",
    storageBucket: "edirect-be938.appspot.com",
    messagingSenderId: "506590916727",
    appId: "1:506590916727:web:0dc1310ef9d859e8e75672",
    measurementId: "G-DKTEGXPKMP"
  };
  // Initialize Firebase
  
  const app = firebase.initializeApp(firebaseConfig)
  const config = Rebase.createClass(app.database())

  export const storage = app.storage()
  export const auth = app.auth()

  export default config