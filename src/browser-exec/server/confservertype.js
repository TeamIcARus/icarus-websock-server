var sys = require("util");
var fs = require("fs");
var topic_path = "../../config/rostopic.txt";
var type_path = "../../config/rostype.txt";
var ws = require("websocket.io");
var server = ws.listen(10081,
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

fs.readFile(type_path,"UTF-(",function(err,data){
    server.clients.forEach(
            function(client) {
		client.send(data);
            });
    });
