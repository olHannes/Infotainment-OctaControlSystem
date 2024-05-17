#!/bin/bash

cd /home/hannes/Desktop/OctaControl/workspace/

source /home/hannes/Desktop/OctaControl/workspace/myenv/bin/activate

chromium-browser --kiosk  http://127.0.0.1:8080 &

python3 infotainment.py
