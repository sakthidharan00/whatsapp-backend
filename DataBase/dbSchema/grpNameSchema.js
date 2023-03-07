const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    grpName: String,    

},
    { timestamps: true })

const groupName = mongoose.model("groupName", schema);

module.exports = groupName;




