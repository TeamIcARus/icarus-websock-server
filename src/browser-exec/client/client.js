var topic_data,type_data;
var topics = [], type =[], topics_len, type_len;

window.onload = function() {
    socket_topic = new WebSocket("ws://localhost:10080");
    socket_type = new WebSocket("ws://localhost:10081");
    socket_topic.onopen=function(event){
	console.log("Websocket topic server open");
    };
    socket_type.onopen=function(event){
	console.log("Websocket type server open");
    }
    socket_topic.onmessage=function(event){
	topic_data= event.data.split("\n");
	topic_len = topic_data.length-1;
	for(var i = 0; i < topic_len; i++){
	    topics[i] = topic_data[i];
	    console.log("topics "+i +":"+topics[i]);
	}
    }
    socket_type.onmessage=function(event){
	type_data = event.data.split("\n");
	type_len = type_data.length-1;
	for(var i = 0; i< type_len; i++){
	    type[i] = type_data[i];
	    console.log("types "+i+":"+type[i]);
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
