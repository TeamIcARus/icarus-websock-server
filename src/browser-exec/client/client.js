var topic_data,type_data;
var topics = [], type =[], topics_len, type_len;
var rostopics=[];

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
	    document.getElementById("topic_id").innerHTML += "<h2>"+"topics "+i+":"+topics[i]+"</h2>";
	}
    }
    socket_type.onmessage=function(event){
	type_data = event.data.split("\n");
	type_len = type_data.length-1;
	for(var i = 0; i< type_len; i++){
	    type[i] = type_data[i];
	    console.log("types "+i+":"+type[i]);
	    document.getElementById("topic_id").innerHTML += "<h2>"+"type"+i+":"+type[i]+"</h2>";
	    
	}
    }
    var ros = new ROSLIB.Ros({
	url:"ws://localhost:9090"
    });
    
    ros.on("connection",function(){
	console.log("Connected to websocket server.");
	rosmain();
    });
    ros.on('error', function(error) {
	console.log('Error connecting to websocket server: ', error);
    });
    
    ros.on('close', function() {
	console.log('Connection to websocket server closed.');
    });
    var rosmain=function(){
	for(var i =0; i < topics_len;i++){
	    rostopics[i] = new ROSLIB.Topic({
		ros:ros,
		name:topics[i],
		mesageType:types[i]
            });
	}
	
	for(var i=0; i< topics_len;i++){
            rostopics[i].subscribe(function(message){
		rosmessage[i]=message;
		console.log("subscribing"+rostopics[i]);
		console.log(message.data);
		rostopics[i].unsubscribe();
            });
	}    
    }
}

