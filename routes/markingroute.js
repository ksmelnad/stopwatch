const express = require('express')
const router = express.Router()

const client = require("../db/conn")
// let collection = client.db("audiomarking").collection("markings")

const ObjectId = require("mongodb").ObjectId;

// Show user's all data
router.post("/marking", function (req, res) {
  let googleId = req.body.googleId;
  let db_connect = client.db("audiomarking");
  db_connect
    .collection("markings")
    .find({ googleId: googleId })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Show all public data
router.get("/public", function(req, res){
  let db_connect = client.db('audiomarking')
  db_connect.collection("markings").find({}).toArray(function(err, result){
    if (err) throw err;
    res.json(result)
  })
})

// Add one data
router.post("/marking/add", function(req, res){
  // console.log(req)
  let myobj = {
    title: req.body.title,
    content: req.body.content,
    googleId: req.body.googleId,
    username: req.body.username,
    date: Date()
  };
  let db_connect = client.db('audiomarking')
  db_connect.collection("markings").insertOne(myobj, function(err, result){
    if (err) throw err;
    console.log("1 document added")
    res.json(result)
  })
})

// Show one data
router.post("/marking/:id", function(req, res){
  // console.log(req.params.id)
  let myquery = {_id: ObjectId(req.params.id)};
  let db_connect = client.db('audiomarking')
  db_connect.collection("markings").findOne(myquery, function(err, result){
    if (err) throw err;
    res.json(result)
  })
})

// Add one data


// Delete one data
router.delete("/marking/:id", function(req, res){
  let myquery = {_id: ObjectId(req.params.id)}
  // console.log(req.params.id)
  let db_connect = client.db('audiomarking')
  db_connect.collection("markings").deleteOne(myquery, function(err, result){
    if(err) throw err;
    console.log("1 document deleted");
    res.json(result)
  })
})

module.exports = router