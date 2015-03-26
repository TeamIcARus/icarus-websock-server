var ROSLIB = require("./roslibjs/src/RosLibNode.js");
var events= require("events");
var event = new events.EventEmitter();
var fs = require('fs');
var topic_path = "../config/rostopic.txt";
var type_path = "../config/rostype.txt";
var topics = [];
var topics_len;
var types=[];
fs.readFile(topic_path,function(err,data){
    topics=data.toString().split('\n');
    topics_len=data.toString().split('\n').length -1;
    console.log("reading"+topic_path);
    for(var i =0; i < topics_len; i++){
    console.log(topics[i]);
    }
});
fs.readFile(type_path,function(err,data){
    types=data.toString().split('\n');
    console.log("reading"+type_path);
    for(var i =0; i < topics_len; i++){
    console.log(types[i]);
    }
});
var rostopics = new Array(topics_len);
var rosmessage = new Array(topics_len);
for(var i =0; i < topics_len; i++){
    rosmessage[i] = new ROSLIB.Message();
}
//Establishing Connection
var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});
ros.on('connection', function(){
    console.log('Connected to websocket server.');
    event.on("subscribe",function(){
	for(var i =0; i < topics_len;i++){
	    rostopics[i].subscribe(function(message){
		rosmessage[i] = message;
		console.log("subscribing "+rostopics[i]);
		console.log("publishing "+rostopics[i]);
		rostopics[i].unsubscribe();
	    });
	    rostopics[i].publish(rosmessage[i]);
	}
	event.emit("finished publishing and subscribing");
	event.emit("done");
    });
    event.on("create topic",function(){
	for(var i =0; i < topics_len; i++){
	    rostopics[i] = new ROSLIB.Topic({
		ros:ros,
		name:topics[i],
		messageType:types[i]
	    });
	}
	console.log("created topic");
    });
    var async = function(cb){
	event.on("done",cb);
	process.nextTick(function(){
	    event.emit("create topic");
	    process.nextTick(function(){
	        event.emit("subscribe");
	    });
	});
    }
    async(function(){
	console.log("finished callback");
    }); 
});
ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});
ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});
