const express = require("express");
const cors=require('cors')
const dotenv=require('dotenv')
const {connection}=require('./db');
const {userRouter}=require("./routes/user.routes");
const {taskRouter}=require("./routes/task.routes");

const app = express();

dotenv.config({path: "./config.env"});

// {
//     methods:["GET","POST","PATCH","DELETE"],
//     credentials: true,
// }
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/users",userRouter)
app.use("/tasks",taskRouter)

connection();

app.listen(process.env.PORT, () => {
   
        console.log(`server running at port ${process.env.PORT}`)
   
})