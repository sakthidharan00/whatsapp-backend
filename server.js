const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors( {
        origin:["http://localhost:3000","https://whatsapp-2n58.onrender.com"]
}));

const dotEnv = require("dotenv")
dotEnv.config();
const mangoose = require("mongoose");
const grpName = require("./DataBase/dbSchema/grpNameSchema");
const router = require("./DataBase/groupName.js");
const msgRouter = require("./DataBase/message");
const { default: mongoose } = require("mongoose");
app.use(express.json());






const Pusher = require("pusher")
const pusher = new Pusher({
        appId: "1559608",
        key: "da9a1517b43cca322478",
        secret: "fba6fe46f3138e9d59a1",
        cluster: "ap2",
        useTLS: true
});



app.use("/whatsappClone", router);
app.use("/whatsappClone", msgRouter)

//mango db


mangoose.connect(process.env.dbUrl);

const db = mongoose.connection;


db.once("open", () => {
        console.log("db conccected")

        //pusher for group Name
        const grpCollection = db.collection('groupnames');
        const ChangeGrpCollection = grpCollection.watch();
        ChangeGrpCollection.on('change', (value) => {
                if (value.operationType === "insert") {
                        console.log("group event triggered ");
                        const grpDetails = value.fullDocument;
                        pusher.trigger("GroupName", "GrpInserted", grpDetails);
                }
        }
        )

        //pusher for new messages
        const msgCollection = db.collection('messages');
        const ChangeMsgCollection = msgCollection.watch();
        ChangeMsgCollection.on('change', (value) => {

                if (value.operationType === "insert") {
                        console.log("Message event triggered ");
                        const msgDetails = value.fullDocument;
                        pusher.trigger("newMessages", "msgInserted", msgDetails);
                }
        }
        )



})




app.listen(8080, () => { console.log("Server is started at 8000 port") })
