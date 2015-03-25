//modules
var read=require("./read.js");
console.log("reading roslibjs");
var ROSLIB = require("./roslibjs/src/RosLibNode.js");
var async = require("async");
console.log("reading async");
//variables
var rostopics = new Array(read.topic_len);
var rosdata = new Array(read.topic_len);
//Establishing Connection

var ros = new ROSLIB.Ros({
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
for(var i =0; i < read.topics_len; i++){
    rostopics[i] = new ROSLIB.Topic({
	ros:ros,
	name:read.topics[i],
	messageType:read.types[i]
    });
}
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
