var express = require("express");
var cors = require("cors");
var firebase = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://app-assinaturas.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("restricted_access/database");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

var app = express();
var bodyParser = require("body-parser");
var usersRef = ref.child("users");

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//método do serviço
app.get("/", function(request, response) {
  response.send("Servidor no ar");
});

app.get("/users", function(request, response) {
  var ref = db.ref("restricted_access/database");
  ref.once("value", function(snapshot) {
    response.json(snapshot.val());
  });
});

app.post("/users", function(request, response) {
  usersRef.set({
    aline: {
      username: "aline",
      full_name: "Aline Chaves",
      password: "abc123"
    }
  });

  response.json("OK");
});

app.post("/users2", function(request, response) {
  usersRef.push({
    brubertolini: {
      username: "brubertolini",
      full_name: "Bruna Bertolini",
      password: "abc123"
    }
  });

  response.json("OK");
});

app.listen(3200, function() {
  console.log("ok");
});
