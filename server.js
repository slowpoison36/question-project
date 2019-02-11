const express = require("express");
const env = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

const questionRoute = require("./routes/question");
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public","dist","ng-icecream")));
const PORT = process.env.PORT || 3000;



mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true },(err)=>{
     if(!err){
          console.log("Connected to database");
     }
})


app.use("/api",questionRoute);


app.get("*",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"public","dist","ng-icecream","index.html"));
})


app.listen(PORT,()=>console.log("Server Started in Port " + PORT));




