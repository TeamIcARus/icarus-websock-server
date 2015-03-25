#!/bin/bash

filename=$1

cat ${filename} | while read line
do
    rostopic type ${line}
done
