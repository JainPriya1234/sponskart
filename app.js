const cors = require('cors');
const dotenv = require('dotenv');
const express = require("express");
const mongoose = require('mongoose');
const router = require("./routes/auth.routes");

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Load environment variables
dotenv.config();

// Create Express server
const app = express();

// CORS configuration
// CORS configuration
app.use(cors(corsOptions));
app.options("*", cors);


// Express configuration
app.use(express.json());


app.use(express.urlencoded({ extended: true, limit: "5mb" }));

//app.options("*", cors);

// ADD THIS IS YOUR CONNECTION FILE
mongoose.set('strictQuery', true);

// Connecting Database
const connectDB = mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(console.log("DB Connected Succesfully...."))
.catch((err)=>{
    console.log("DB Connection Failed!")
    process.exit(1)
});


app.use(router);
app.get('/', (req,res)=>{
    console.log(1);
    res.json("2323");
})
app.listen(3000,()=>{
    console.log("App is running at http://localhost:%d ",3000);
});


module.exports = app;
