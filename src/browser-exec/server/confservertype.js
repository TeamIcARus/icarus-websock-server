var ws=require("websocket.io");
var fs=require("fs");
var port=10081;
var type_path="../../../config/rostype.txt";
var server=ws.listen(port,function(){
    console.log("Type Server running");
});
server.on('connection',function(client){
    console.log("connection start");
    fs.readFile(type_path,"UTF-8",function(err,data){
        client.send(data);
        console.log(data);
    });
});
