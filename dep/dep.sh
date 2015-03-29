#!/bin/bash
git clone -b node_global_install_fix https://github.com/RobotWebTools/roslibjs.git
rm -r -f ../src/roslibjs
mv roslibjs ../src

