# icarus-websock-server
license BSD 2.0\n
It republishes the ROS topics in rosbridge protocol by just a shellscript command.
requirements
・node.js(npm)
・npm modules 
object-assign
ws
canvas
eventemitter2
xmlshim
fs
path
http
async
・roslibjs(node_global_install_fix branch)
https://github.com/RobotWebTools/roslibjs/tree/node_global_install_fix
・ROS indigo
・rosbridge_suite
http://wiki.ros.org/rosbridge_suite
https://github.com/RobotWebTools/rosbridge_suite.git
(If you are using Ubuntu 14.04 and have a ROS indigo environment, you can install this by $sudo apt-get install ros-indigo-rosbridge-suite)

recommended environment
・Ubuntu 14.04