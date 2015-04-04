var ws=require("websocket.io");
var fs=require("fs");
var port=10080;
var topic_path="../../../config/rostopic.txt";
var server=ws.listen(port,function(){
    console.log("Topic Server running");
});
server.on('connection',function(client){
    console.log("connection start");
    fs.readFile(topic_path,"UTF-8",function(err,data){
	client.send(data);
	console.log(data);
    });
});
  
			


