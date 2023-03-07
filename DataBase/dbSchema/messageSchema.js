const mongoose=require("mongoose");

const msgSchema= new mongoose.Schema({
    uid:String,
    userName:String,
    message:String,
    time:String,
    groupId:String
})


const messageCollection= mongoose.model("message",msgSchema);

module.exports =messageCollection;