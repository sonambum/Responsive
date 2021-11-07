const socket = io()

function  getselectedvalue(){
    
    val = document.getElementById("zoneselect").value;
    console.log(val);
    
    switch(val){

        case "0":
            socket.emit('case');
            document.getElementById('textbox1').value = " ";
            document.getElementById('textbox').value = " ";
        break;

        case "1":
            socket.emit('case1');

            socket.on('TF18', message => {
                console.log('From server TF18: ', message)
                document.getElementById('textbox1').value = message
            })
            socket.on('FR18', message => {
                console.log('From server FR18: ', message)
                document.getElementById('textbox').value = message
            })
            
        break;

        case "2":
            socket.emit('case2');

            socket.on('TF89', message => {
                console.log('From server TF89: ', message)
                document.getElementById('textbox1').value = message
            })
            socket.on('FR89', message => {
                console.log('From server FR89: ', message)
                document.getElementById('textbox').value = message
            })
        break;
        
        case '3':
            socket.emit('case3');
            
            socket.on('TF97', message => {
                console.log('From server TF97: ', message)
                document.getElementById('textbox1').value = message
            })
            socket.on('FR97', message => {
                console.log('From server FR97: ', message)
                document.getElementById('textbox').value = message
            })
        break;

    }

}

function postItem() {

     $.ajax
     ({
         type: "POST",
         url: "/auth/Onswitch",
         timeout: 2000,
         data: {
             data:"1"
         },
         success: function(data) {
             //show content
             alert('Success!')
         },
         error: function(jqXHR, textStatus, err) {
             //show error message
             alert('text status '+textStatus+', err '+err)
         }
     });
 }
 function postitem() {

    $.ajax
    ({
        type: "POST",
        url: "/auth/Offswitch",
        timeout: 2000,
        data: {
            data:"0"
        },
        success: function(data) {
            //show content
            alert('Success!')
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('text status '+textStatus+', err '+err)
        }
    });
}

 
function onCbChange(cb) {
    var b = document.getElementById(cb).checked;

    var confirmBox = confirm("Are You Sure?");

    if (confirmBox == true) {
        if (b) {
            document.getElementById(cb).checked = true;
            document.getElementById("status").innerHTML = "ON";
            postItem();

        } else {
            document.getElementById(cb).checked = false;
            document.getElementById("status").innerHTML = "OFF"
            postitem();
        }
    } else {
        
        document.getElementById(cb).checked = !b;
    };

}


