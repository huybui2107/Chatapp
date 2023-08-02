const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');
const cookie_parser = require('cookie-parser');
const userRoute = require('./routes/User');
const messageRoute = require('./routes/Message');
require('dotenv').config({ path: path.join(__dirname, '.env') });







app.use(express.json());
app.use(cookie_parser());
app.use(cors());
// app.options("*", cors());

app.use('/user',userRoute);
app.use('/msg',messageRoute)



mongoose  
  .connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
  })
  .then(result => {
    console.log("database connection ")
  })
  .catch(err =>{
    console.log(err);
  })

const server = app.listen(process.env.PORT,()=>{
    console.log(`Serer is running  ${process.env.PORT}`);
});

const io = socket(server,{
   cors :{
     origin : "http://localhost:3000",
     credentials : true,
   }
})

global.onlineUsers = new Map();

io.on("connection",(socket) =>{
   global.chatSocket = socket;
   socket.on("add-user",(userId) =>{
      onlineUsers.set(userId,socket.id);
      console.log(onlineUsers);
   })

   socket.on("send-msg",(data) =>{
   const sendUserSocket =onlineUsers.get(data.to);
   if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-receive",data.msg);
   }
 })
})