var topic_data,type_data;
var topics = [], type =[], topics_len, type_len;

window.onload = function() {
    socket_topic = new WebSocket("ws://localhost:10080");
    socket_type = new WebSocket("ws://localhost:10081");
    socket_topic.onmessage = function(event) {
	topic_data= event.data.split("\n");
	topic_len = topic_data.length;
	for(var i = 0; i < topic_len; i++){
	    topics = topic_data[i];
	}
    }
    socket_type.onmessage=function(event){
	type_data = event.data.split("\n");
	type_len = event.data.split("\n");
	for(var i = 0; i< type_len; i++){
	    type = type_data[i];
	}
    }
    var ros = new ROSLIB.Ros({
	url:"ws://localhost:9090"
    });
    
    ros.on("connection",function(){
	console.log("Connected to websocket server.");
    });
    ros.on('error', function(error) {
	console.log('Error connecting to websocket server: ', error);
    });
    
    ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
}
