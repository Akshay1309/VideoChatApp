const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const server = require("http").Server(app);
app.set("view engine", "ejs");
app.use(express.static("public"));

const { v4: uuidv4 } = require("uuid");

const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});

const{ExpressPeerServer}=require('peer')
const PeerServer=ExpressPeerServer(server,{debug:true})

app.use('/peerjs',PeerServer)
app.get("/", (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
    res.render("index", { roomId: req.params.room });
});

io.on("connection",(socket)=>{
    socket.on('join-room',(roomId,userId,user)=>{
        socket.join(roomId)
        socket.on("message",(message)=>{
            io.to(roomId).emit("createMessage",message,user)
        })
    })
    
})

server.listen(3030);