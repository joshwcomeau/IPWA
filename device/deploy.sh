#!/bin/bash
# Deploy script
# Simply copies the server to the Pi.
#
# To run:
# $ bash deploy.sh



IP=192.168.1.115 # TODO: Replace with external IP?
LOCAL_PATH=server.py
REMOTE_PATH=/home/pi/ipwa/server.py

# Copy the file to the Raspberry Pi.
scp -r $LOCAL_PATH  pi@$IP:$REMOTE_PATH
