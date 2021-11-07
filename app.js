const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const app = express();
//for mqtt
const server = require('http').createServer(app)
const port = process.env.PORT || 5000
const io = require('socket.io')(server)
const fs = require('fs')
const mqtt = require('mqtt')
// const ajax = require('ajax')

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

var options = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtts',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
}

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//parse URL-encoded bodies( as sent by HTML forms)

app.use(express.urlencoded({extended:false}));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect((error)=>{
    if(error){
        console.log("Error in connection")
    }else{
        console.log("MYSQL connected")
    }
});

var client = mqtt.connect(options);

client.on('connect',()=>{
    console.log('MQTT Connected');
});
client.on('error',()=>{
    console.log('error');
});


io.on('connection',socket =>{

    socket.on('case',()=>{
        client.unsubscribe("TF89",);
        client.unsubscribe("FR89");
        client.unsubscribe("TF18");
        client.unsubscribe("FR18");

    })

    socket.on('case1',()=>{
        client.unsubscribe("TF89",);
        client.unsubscribe("FR89");
        client.unsubscribe("TF97");
        client.unsubscribe("FR97");

        client.subscribe("TF18");
        client.subscribe("FR18");

        client.on('message',(topic,message)=>{
            io.emit(topic,message.toString());
        });
    })

    socket.on('case2',()=>{
        client.unsubscribe("TF18");
        client.unsubscribe("FR18");
        client.unsubscribe("TF97");
        client.unsubscribe("FR97");

        client.subscribe("TF89");
        client.subscribe("FR89");

        client.on('message',(topic,message)=>{
            io.emit(topic,message.toString());
        });
    })

    socket.on('case3',()=>{
        client.unsubscribe("TF18");
        client.unsubscribe("FR18");

        client.unsubscribe("TF89");
        client.unsubscribe("FR89");

        client.subscribe("TF97");
        client.subscribe("FR97");

        client.on('message',(topic,message)=>{
            io.emit(topic,message.toString());
        });
    })
    socket.on('alarm',()=>{
        client.subscribe('FR18');
        client.subscribe('TF18');

        client.on('message',(topic,message)=>{
            io.emit(topic,message.toString());
        });
    })

})

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

server.listen(port, ()=>{
    console.log("Server started on port 5000")
});