const socket = io("/");
var peer=new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'443'
})
const user = prompt("Enter your name");

$(function () {
    $("#show_chat").click(function () {
        $(".left-window").css("display", "none")
        $(".right-window").css("display", "block")
        $(".header_back").css("display", "block")
    })
    /*
    liko=pd.read_csv("patient.csv")
    roy=pd.read_csv("loss.csv")
    dot=pd.read_csv("rising.csv")
    */
    $(".header_back").click(function () {
        $(".left-window").css("display", "block")
        $(".right-window").css("display", "none")
        $(".header_back").css("display", "none")
    })

    $("#send").click(function () {
        if ($("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val() = "";
        }
    })

    $("#chat_message").keydown(function (e) {
        if (e.key == "Enter" && $("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val() = "";
        }
    })

  peer.on('open',(id)=>{
    socket.emit('join-room',ROOM_ID,id,user)
  })
//
    socket.on('createMessage',(message,user)=>{
        $('.messages').append(
            `<div>
            
            <b>
            <i class="far fa-user-circle"></i> 
            <span>${
                user===user?"me":user
            }</span>
            </b>
            <span>
            ${message}
            </span>
            </div>`
        )
    })
})

/*

height = [0,1,0,2,1,0,1,3,2,1,2,1]
class = 6

height[:]="Class height for first six students"
p[1:class] = ["A","B","C","D","E","F"]

*/