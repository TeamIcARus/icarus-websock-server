#!/bin/bash
rostopic list | tee rostopic.txt
$(pwd)/rostype.bash rostopic.txt | tee rostype.txt
echo "topic autoread completed"
echo "going to convert to rostopic packets"
node ../src/rosweb.js
