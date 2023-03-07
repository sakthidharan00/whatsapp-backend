const express = require("express");
const msgRoute = express.Router();
const messageCollection = require("./dbSchema/messageSchema");
const mongoose = require("mongoose")

//storing new message to database
msgRoute.post("/post/send/message", (req, res) => {
  
    messageCollection.create(req.body).then((doc) => {
        res.send(doc)
    })

})

//geting old message in databasae
msgRoute.get("/get/old/message/:id",(req,res)=>{

    messageCollection.find({groupId:req.params.id}).then((doc)=>{
        res.send(doc)
    })
})


module.exports = msgRoute;
