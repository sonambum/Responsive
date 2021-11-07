var color = ['transparent', 'green'];
var colors = ['transparent', 'red'];
var active =0;

const socket = io()

var FR18;
var TF18 = 0;

datarecieve();

function datarecieve(){
try {
    socket.emit('alarm');

    socket.on('FR18', message => {
        console.log('From server FR18: ', message)
        FR18 = message;
       
    })
    socket.on('TF18', message => {
        console.log('From server TF18: ', message)
        TF18 = message;
    })
   
   

} catch (error) {
    console.error(error.message);
}
}

setInterval(function(){

    if(FR18 != 0){
        
        document.getElementById("c").style.backgroundColor= color[active]; 
    }else{
        document.getElementById("c").style.backgroundColor= colors[active];
    }

    document.getElementById("bar").style.height = `${TF18 * 100}%`;
    document.getElementById("bar").innerHTML = `${TF18 * 100}%`;
    console.log("hello" +TF18);

    // document.getElementById("c1").style.backgroundColor= color[active];
    // document.getElementById("c2").style.backgroundColor= color[active];
    // document.getElementById("c3").style.backgroundColor= color[active];
    // document.getElementById("c4").style.backgroundColor= color[active];
    // document.getElementById("c5").style.backgroundColor= color[active];
    // document.getElementById("c6").style.backgroundColor= color[active];
    // document.getElementById("c7").style.backgroundColor= color[active];
    // document.getElementById("c8").style.backgroundColor= color[active];
    // document.getElementById("c9").style.backgroundColor= color[active];
    active++;
    if(active == color.length) active =0;
}, 500);


