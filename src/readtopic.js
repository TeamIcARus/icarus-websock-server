var fs = require('fs');
var topic_path = "../config/rostopic.txt";
var type_path="../config/rostype.txt";
console.log("started reading");
var topics = [];
var types = [];
var topics_len;
fs.readFile(topic_path,function(err,data){
    topics=data.toString().split('\n');
    topics_len=data.toString().split('\n').length -1;
    console.log("reading"+topic_path);
    for(var i =0; i < topics_len; i++){
    console.log(topics[i]);
    }
});
fs.readFile(type_path,function(err,data){
    exports.types=data.toString().split('\n');
    var topics_len=data.toString().split('\n').length -1;
    console.log("reading"+type_path);
    for(var i =0; i < topics_len; i++){
    console.log(exports.types[i]);
    }
});

module.exports = {
  topics : topics,
  topics_len :topics_len,
  type: types
};

