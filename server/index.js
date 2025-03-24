const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const todoItemRoute = require("../server/routes/todoitem");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', todoItemRoute);

mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("database connected"))
.catch(err => console.log(err))

const PORT = process.env.PORT || 5500;

app.listen(PORT,()=>console.log("server connected"));

