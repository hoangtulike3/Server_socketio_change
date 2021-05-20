var socket = io("http://54.180.31.210:3000/");

socket.on('register', function(bool){
    if(bool == true)
    {
        alert("Register Success");
        location.href = "/page/login/login.html";
    }
    else
    {
        alert("This Username has been exist");
    }
});

$(document).ready(function(){
    $("#bt_register").click(function(){
        if(username.value == "" || displayname.value == "" || phonenumber.value == "" || password.value == "" || repassword.value == "")
        {
            alert("Please type enought input");
        }
        else
        {
            if(password.value != repassword.value)
            {
                alert("Retype Password isn't correct");
            }
            else
            {
                if(username.value != "" && displayname.value != "" && phonenumber.value != "" && password.value != "" && repassword.value != "")
                {
                    socket.emit('register', username.value, displayname.value, phonenumber.value, password.value);
                }
                else
                {
                    alert("Can not send to server");
                }
            }
        }
    });
});
