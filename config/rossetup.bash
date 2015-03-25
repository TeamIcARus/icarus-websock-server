#!/bin/bash
rostopic list | tee rostopic.txt
$(pwd)/rostype.bash rostopic.txt | tee rostype.txt
