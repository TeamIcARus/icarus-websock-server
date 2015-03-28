var sys = require("util");
var fs = require("fs");
var topic_path = "../../config/rostopic.txt";
var ws = require("websocket.io");
var server = ws.listen(10080,
		       function(){
			   console.log("ws start");
		       });

server.on("connection",
	  function(socket) {
	      socket.on("message",
			function(data) {
			    fs.watchFile(topic_path,readFile);
			});
	  });

function readFile(curr,prev){
    fs.readFile(topic_path,"UTF-8",function(err,data){
	server.clients.forEach(
             function(client) {
                 client.send(data);
	     });
    });
}