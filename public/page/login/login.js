var socket = io("http://localhost:3000");

socket.on('signin', (bool)=>{
    if(bool == true)
    {
        location.href = "/page/chat_ui/chat_ui.html";
    }
    else
    {
        if(bool == false)
        {
            alert("Username or Password wrong");
        }
        else
        {
            alert("Cannot connect with server");
        }
    }
});

$(document).ready(function(){

    $("#bt_signin").click(function(){
        socket.emit('signin', user.value, password.value);
    });

    $("#bt_register").click(function(){
        location.href = "/page/register/register.html";
    });
});
