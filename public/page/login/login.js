var socket = io("http://54.180.31.210:3000/");

function sendUser(){
    var username = document.getElementById("user").value;
    localStorage.setItem("textvalue", username);
    console.log(username);
}

socket.on('signin', (bool)=>{
    if(bool == true)
    {
        sendUser();
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
    $("#signin_form").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            socket.emit('signin', user.value, password.value);
        };
    });
    $("#bt_signin").click(function(){
        socket.emit('signin', user.value, password.value);
    });

    $("#bt_register").click(function(){
        location.href = "/page/register/register.html";
    });
});
