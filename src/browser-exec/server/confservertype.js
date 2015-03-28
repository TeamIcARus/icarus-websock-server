var sys = require("util");
var fs = require("fs");
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
                            fs.watchFile(type_path,readFile);
                        });
          });

fs.readFile(type_path,"UTF-8",function(err,data){
    server.clients.forEach(
            function(client) {
		client.send(data);
            });
    });
