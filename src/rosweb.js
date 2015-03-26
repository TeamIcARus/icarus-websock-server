//modules
var read=require("./read.js");
console.log("reading roslibjs");
var ROSLIB = require("./roslibjs/src/RosLibNode.js");
//var AsyncEventEmitter = require("async-eventemitter");
var events= require("events");
var event = new events.EventEmitter();
console.log("reading async");
//variables
var rostopics = new Array(read.topic_len);
var rosmessage = new Array(read.topic_len);
for(var i =0; i < read.topic_len; i++){
    rosmessage[i] = new ROSLIB.Message();
}
//Establishing Connection

var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

ros.on('connection', function(){
    console.log('Connected to websocket server.');
    event.on("subscribe",function(
	for(var i =0; i < read.topic_len;i++){
	    rostopics[i].subscribe(function(message){
		rosmessage[i] = message;
		console.log("subscribing "+rostopics[i]);
		rostopics[i].unsubscribe();
		rostopics[i].publish(rosmessage[i]);
		console.log("publishing "+rostopics[i]);
	    });
	}
    );
    event.on("create topic",function(){
	for(var i =0; i < read.topic_len; i++){
	    rostopics[i] = new ROSLIB.Topic({
		ros:ros,
		name:read.topics[i],
		messageType:read.types[i]
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


//registering ROS topics
/*
async.series([
    function(callback){
	for(var i =0; i < read.topics_len; i++){
	    rostopics[i] = new ROSLIB.Topic({
		ros:ros,
		name:read.topics[i],
		messageType:read.types[i]
	    });
	}
    },
    function(callback){
	for(var i =0; i < read.topics_len; i++){
	    rostopics[i].subscribe(function(message){
		rosmessage[i] = message;
		console.log("subscribing "+rostopics[i]);
		rostopics[i].unsubscribe();
	    });
	}
    },
    function(callback){
	for(var i=0; i < read.topics_len; i++){
	    rostopics[i].publish(rosmessage[i]);
	    console.log("publishing "+rostopics[i]);
	}
    }
],function(err,results){
    if(err){
	throw err;
    }
    console.log("series all done." + results);
});
*/
