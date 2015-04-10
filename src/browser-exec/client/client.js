var topic_data,type_data;
var topics = [], type =[], topics_len, type_len;
var rostopics=[],rosmessage=[];

var signal = new EventEmitter2();
socket_topic = new WebSocket("ws://localhost:10080");
socket_type = new WebSocket("ws://localhost:10081");

socket_topic.onopen=function(event){
    console.log("Websocket topic server open");
};
socket_type.onopen=function(event){
    console.log("Websocket type server open");
};
socket_topic.onmessage=function(event){
    topic_data= event.data.split("\n");
    topic_len = topic_data.length-1;
    for(var i = 0; i < topic_len; i++){
	topics[i] = topic_data[i];
	console.log("topics "+i +":"+topics[i]);
    }
};
socket_type.onmessage=function(event){
    type_data = event.data.split("\n");
    type_len = type_data.length-1;
    for(var i = 0; i< type_len; i++){
	    type[i] = type_data[i];
	    console.log("types "+i+":"+type[i]);
    }
};
for(var i =0; i < topics_len; i++){
    rosmessage[i] = new ROSLIB.Message();
    rostopics[i] = new ROSLIB.Topic();
}
var ros = new ROSLIB.Ros({
    url:"ws://localhost:9090"
});
ros.on('connection',function(){
    console.log("Connected to websocket server.");
    roscom();
});
var roscom = function(){
    rostopics[27] = new ROSLIB.Topic({
	ros:ros,
	name:topics[27],
	messageType:type[27]
    });
    
    rostopics[27].subscribe(function(message){
	rosmessage[27]=message;
	console.log("subscribing"+rostopics[27]);
	console.log(message.data);
	rostopics[27].unsubscribe();
    console.log("subscribing"+rostopics[27]);
    });
};
