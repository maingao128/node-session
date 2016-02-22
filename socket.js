var io = require("socket.io");
var cookieParser = require("cookie-parser");

module.exports = function(server,sessionStore){
	var socket = io.listen(server);
	socket.use(function(item,next){
		cookieParser("gaga")(item.request,null,next);
	});
	socket.use(function(item,next){
		
		var connet_id = item.request.signedCookies["express_id"];

		if(connet_id){
			sessionStore.get(connet_id,function(err,session){
				if(typeof session === "object"){
					session["email"] = "695019881";
					
				}
				
				console.log(typeof session, session);
				item.request.session = session;
	        	next();
			});
		}
	});

	socket.on("connection",function(client){
		var session = client.request.session;
		
		client.emit('news',{
			title: 'Welcome to World News',
			contents: session.email
		})
	});
}