
// module.exports = function(content){
// 	console.log(Buffer.isBuffer(content));
// }

// module.exports.raw = true;


// var net = require("net");

// var chatServer = net.createServer(),
// 	chatList = [];

// chatServer.on("connection",function(client){
// 	client.name = client.remoteAddress + ':' + client.remotePort;
// 	client.write(client.name + "ok");
// 	chatList.push(client);
// 	client.on("data",function(data){
// 		for(var i = 0; i < chatList.length; i++){
// 			if(chatList[i].name !== client.name){
// 				chatList[i].write(client.name + "say:" + data);
// 			}else{
// 				client.write("I say :" + data);
// 			}
// 		}
// 	})vv
// }).listen(2018);


// var cluster = require("cluster");


// if(cluster.isMaster){
// 	console.log("this is Master")
// 	for(var i = 0; i < 4; i++){
// 		var worker = cluster.fork();
// 		worker.on('message',function(m){
// 			if(m.memory < 4){
// 				console.log("ok,I receive msg");
// 			}
// 		})
// 	};

// }else{
// 	console.log("this is Worker");
// 	var i = 0;
// 	setInterval(function(){
// 		process.send({memory:i++})
// 	},100)
// }


// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// var path = require("path");
// var j = bodyParser.json();
// app.use(j);
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname,"webapp")));

// app.use('/',function(req,res){
// 	res.sendFile('/Users/gaohao/Desktop/mainGao/bl_wechat/ccc.html')
// })

// app.post('/send',function(req,res){
// 	console.log(req.body);
// 	res.setHeader(200,{'content-type':'application/json'});
// 	res.send({ status: 'SUCCESS' });
// })


// app.listen(8000);


// var http = require("http");
// var io = require("socket.io");

// var server = http.createServer(function(req,res){
// 	res.writeHead(200,{"content-type":'text/html'});
// 	res.write('hahaha');
// 	res.end();
// }).listen(9000);

// var socket = io.listen(server);

// socket.on("connection",function(client){
// 	console.log("ok");
// 	client.send("ok too");
// })


//session模块
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var socket = require("./socket");
var cookieParser = require("cookie-parser");
var j = bodyParser.json();
var session = require('express-session')
var sessionStore = new session.MemoryStore();

app.use(j);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: "gaga",
	key: "express_id",
	store: sessionStore
}))


var server = app.listen(8000);

socket(server,sessionStore);

app.use(express.static(path.join(__dirname,"public")));

app.use('/',function(req,res){
	res.sendFile(__dirname + "/test.html")
})

app.post('/send',function(req,res){
	console.log(req.body);
	res.setHeader(200,{'content-type':'application/json'});
	res.send({ status: 'SUCCESS' });
});

