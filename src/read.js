var fs = require('fs');
var topic_path = "../config/rostopic.txt";
var type_path = "../config/rostype.txt";
fs.readFile(topic_path,function(err,data){
    var module.exports.topics=data.toString().split('\n');
    var module.exports.topics_len=data.toString().split.('\n').length -1;
    console.log("reading"+topic_path);
});
fs.readFile(type_path,function(err,data){
    var module.exports.types=data.toString().split('\n');
    console.log("reading"+type_path);
});
