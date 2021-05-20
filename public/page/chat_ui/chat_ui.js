var socket = io("http://54.180.31.210:3000");
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
function getUser(){
    var user_of_this_chat = localStorage.getItem("textvalue");
    return user_of_this_chat;
}

function conversation_click(room){
    socket.emit("call_chat", getUser(), room);
    document.getElementById("name_roomchat").textContent = room;
    document.getElementById("chat_message_list").textContent = "";
    // name_roomchat.textContent = room;
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

socket.on('list_room', function(chat_end){
    $("#coversation_list").html("");
    chat_end.forEach(function(i){
        // console.log(i);
        $("#coversation_list").append('<div class="conversation" onclick="conversation_click(\'' + i.room + '\')"> <img src="/icon/no_avatar.jpg" alt="Avatar"/> <div class="title_text">' + i.room + '</div> <div class="created_date">Apr 16</div> <div class="conversation_message">'+ i.chat +'</div></div>');
    });
});

socket.on('old_message', function(data, name){
    //  console.log(data);
    //  console.log(name);
    for(i=0; i<data.length; i++)
    {
        if(data[i].name == name)
        {
            // $("#messages").append("<b>" + data[i].name + ": " + "</b>" +"["+ data[i].time +"]"+ "<br>" + data[i].chat + "<br>");
            $("#chat_message_list").append('<div class="message_row you_message"> <div class="message_content"> <div class="message_text">' + data[i].chat + '</div> <div class="message_time">' + data[i].time + '</div> </div> </div>');
            $("#chat_message_list").scrollTop($("#chat_message_list").height());
        }
        else
        {
            $("#chat_message_list").append('<div class="message_row other_message"> <div class="message_content"> <img src="/icon/no_avatar.jpg" alt="User"/> <div class="message_text">' + data[i].chat + '</div> <div class="message_time">' + data[i].time + '</div> </div> </div>');
            $("#chat_message_list").scrollTop($("#chat_message_list").height());
        }
    }
});

socket.on('chat_message', function(time, user, data){
    // $("#messages").append("<b>" + user + ": " + "</b>" +"["+ time +"]"+ "<br>" + data + "<br>");
    // $("#messages").scrollTop($("#messages").height());
    if(user == getUser())
    {
        // $("#messages").append("<b>" + data[i].name + ": " + "</b>" +"["+ data[i].time +"]"+ "<br>" + data[i].chat + "<br>");
        $("#chat_message_list").append('<div class="message_row you_message"> <div class="message_content"> <div class="message_text">' + data + '</div> <div class="message_time">' + time + '</div> </div> </div>');
        $("#chat_message_list").scrollTop($("#chat_message_list").height());
    }
    else
    {
        $("#chat_message_list").append('<div class="message_row other_message"> <div class="message_content"> <img src="/icon/no_avatar.jpg" alt="User"/> <div class="message_text">' + data + '</div> <div class="message_time">' + time + '</div> </div> </div>');
        $("#chat_message_list").scrollTop($("#chat_message_list").height());
    }
});

$(document).ready(function(){
    if(getUser() != null)
    {

        socket.emit('list_room', getUser());

        $('#addbtn').click(function() {
            //lấy giá trị thuộc tính href - chính là phần tử "#login-box"
            var addBox = $(this).attr('href');
            //cho hiện hộp đăng nhập trong 300ms
            $(addBox).fadeIn("slow");
            // thêm phần tử id="over" vào sau body
            $('body').append('<div id="over"></div>');
            $('#over').fadeIn(300);
        });

        // khi click đóng hộp thoại
        $(document).on('click', "#over", function() { 
            $('#over, .add').fadeOut(300 , function() {
                $("#roomname").val("");
                $("#friend").val("");
                $('#over').remove();  
            }); 
        });

        $(document).on('click', "#submit_add", function() {
            socket.emit('add_room', roomname.value, friend.value);
            alert("added");
            $('#over, .add').fadeOut(300 , function() {
                $("#roomname").val("");
                $("#friend").val("");
                $('#over').remove();
            }); 
        });

        $("#bt_delete").click(function(){
            socket.emit('delete_chat');
            $("#chat_message_list").html("");
        });

        $("#chat_only").keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13' && chat_only.value != ""){
                socket.emit('chat_message', chat_only.value);
                $("#chat_only").val(""); 
            };
        });

    }
    else
    {
        location.href = "/page/login/login.html";
    }
});