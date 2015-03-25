var read=require("./read.js");
var ROSLIB = require("./roslib.min.js");

//Establishing Connection

var ros=new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
   console.log('Connection to websocket server closed.');
});

//registering ROS topics

var rostopics = new Array(read.topic_len);

for(var i =0; i < read.topics_len; i++){
    rostopics[i] = new ROSLIB.Topic({
	ros:ros,
	name:read.topics[i],
	messageType:read.types[i]
    });
}

var rosdata = new Array(read.topic_len);

//Subscribing ROS topics
for(var i =0; i < read.topics_len; i++){
    rostopics[i].subscribe(function(message){
	rosdata[i] = message.data;
	console.log("subscribing "+rostopics[i]);
    });
}    

//Republishing ROS topics(websocket packet parsing)
for(var i=0; i < read.topics_len; i++){
    rostopics[i].publish(rosdata[i]);
    console.log("publishing "+rostopics[i]);

}
