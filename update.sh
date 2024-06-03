#!/bin/bash

cd /home/hannes/Desktop/OctaControl/workspace/

source /home/hannes/Desktop/OctaControl/workspace/myenv/bin/activate


pip install Flask
pip install Flask[async]
pip install pydbus
pip install pillow
pip install obd
sudo apt-get instal python3-alsaaudio
pip install pyserial
pip install gevent
pip install flask-socketio eventlet pydbus pillow
sudo apt install matchbox-keyboard