var fs = require('fs');
var topic_path = "../config/rostopic.txt";
var type_path = "../config/rostype.txt";
console.log("started reading");
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

module.exports = {
  topics : topics,
  topics_len :topics_len,
  types : types
};

