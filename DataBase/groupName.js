const express = require("express");
const route = express.Router();
const groupNameCollection = require("./dbSchema/grpNameSchema");
const mongoose = require("mongoose");




//update grpName to client


route.get("/get/allGroupName", (req, res) => {

    groupNameCollection.find((err, doc) => {
        res.send(doc)

    })
})

route.post("/post/Create/groupName", (req, res) => {

    groupNameCollection.create({ grpName: req.body.grpName }).then((value) => { res.send(value) });


})

route.get("/get/group/:id", (req, res) => {
   
    groupNameCollection.findById(req.params.id).then((doc)=>{res.send(doc)}).catch((e)=>console.log(e.messgae))






})


module.exports = route;
