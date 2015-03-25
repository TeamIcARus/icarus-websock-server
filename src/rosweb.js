var read=require("./read.js");

//Establishing Connection

var ros=new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
   console.log('Connection to websocket server closed.');
});

//registering ROS topics

var rostopics = [];

for(var i =0; i < read.topics_len; i++){
    var rostopics[i] = new ROSLIB.Topic({
	ros:ros,
	name:read.topics[i],
	messageType:read.types[i]
    });
}

var rosdata = [];

//Subscribing ROS topics
for(var i =0; i < read.topics_len; i++){
    rostopics[i].subscribe(function(message){
	rosdata[i] = message.data;
    });
}    

//Republishing ROS topics(websocket packet parsing)
for(var i=0; i < read.topics_len; i++){
    rostopics[i].publish(rosdata[i]);
}
