var fs = require('fs');
var topic_path = "../config/rostopic.txt";
var type_path = "../config/rostype.txt";
fs.readFile(topic_path,function(err,data){
    var module.exports.topics=data.toString().split('\n');
});
fs.readFile(topic_path,function(err,data){
    var module.exports.types=data.toString().split('\n');
});
