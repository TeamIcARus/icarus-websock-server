var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
    var listener = new ROSLIB.Topic({
	ros:ros,
	name:'/ardrone/image_raw',
    messageType:'sensor_msgs/Image'
    });
    var rosmessage=new ROSLIB.Message();
    listener.subscribe(function(message){
	console.log("Recieved message on"+lister.name+":"+message.data);
	rosmessage=message;
    });
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

/*

var listener = new ROSLIB.Topic({
    ros:ros,
    name:'/ardrone/image_raw',
    messageType:'sensor_msgs/Image'
});

var rosmessage=new ROSLIB.Message();

listener.subscribe(function(message){
    console.log("Recieved message on"+lister.name+":"+message.data);
    rosmessage=message;
});
*/
