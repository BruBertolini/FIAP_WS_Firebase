var express = require("express");
var cors = require("cors");

// Firebase App is always required and must be first
var firebase = require("firebase/app");

// Add additional services that you want to use
require("firebase/auth");
require("firebase/database");
//require("firebase/firestore");
//require("firebase/messaging");
//require("firebase/functions");


firebase.initializeApp({
  apiKey: "AIzaSyBRuykbZ50T0JdUWFOwBrQj9HfC5VcRd7c",
  authDomain: "app-assinaturas.firebaseapp.com",
  databaseURL: "https://app-assinaturas.firebaseio.com",
  projectId: "app-assinaturas",
  storageBucket: "app-assinaturas.appspot.com",
  messagingSenderId: "567957840223"
});

var db = firebase.database();
var auth = firebase.auth();

var app = express();
var bodyParser = require("body-parser");

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

//signup
app.post("/api/signup", function(request, response) {
  console.log(request.query.username);
  console.log(request.query.password);
  auth.createUserWithEmailAndPassword(request.query.username, request.query.password).then(
    function(sucess) {
      response.json(sucess);
    } 
  )
  .catch(function(error) {
    response.status(400).send({error: error.code, msg: error.message});
  });
});

//login
app.post("/api/signin", function(request, response) {
  auth.signInWithEmailAndPassword(request.query.username, request.query.password).then(
    function(sucess) {
      response.json(sucess);
    } 
  )
  .catch(function(error) {
    response.status(401).send({error: error.code, msg: error.message});
  });
});


//Adicionar assinatura
app.post("/api/my-signatures/:userId", function(request, response) {
  var signature = {
    'data': '20/11/2019',
    'servico': 'Youtbe',
    'tempo': '1 mês'
  }
  db.ref('user/3Of94aVO9vMBys2Gz0NWE1fFywX2').push(
    signature
  ).then(function(sucess) {
    response.json(sucess);
  })
  .catch(function(error) {
    response.status(500).send({error: error.code, msg: error.message});
  });
});

app.listen(3200, function() {
  console.log("ok");
});
