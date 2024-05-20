from flask import Flask, send_file, request, jsonify
import json
import time
import serial
import obd
import random
import os
import subprocess
import webbrowser




from VolumeControl import *
from shutdown import *
from setAmbientLight import *
from obdData import *
from wifiControl import *
from btControl import *


app = Flask(__name__)
controller=None




def setMusicProgram():
    #webbrowser.open('https://open.spotify.com/')
    print("start Music program")




	




def default():
    try:
        set_volume(10)
        #setLEDColor(['#616161', '#616161', '#616161', '#616161'])
    except:
        print("Error_x.1")



@app.route('/get_wifi_network', methods=['GET'])
def get_wifi_network():
    start_wifi_scan()
    reachable_wifi = scan_wifi_networks()
    wifi_data = {f'wifi_{i+1}': name for i, name in enumerate(reachable_wifi)}
    return jsonify(wifi_data)




@app.route('/', methods=['POST'])
def handle_ajax_request():
    action = request.form['action']
    data = json.loads(request.form['data'])

    print("getData")
    if action == 'statusTurnOff':
        setTurnOff()
    
    elif action == 'volume':
        set_volume(data.get('level'))

    elif action == 'ambientLight':
        setLEDColor(data.get('level'))

    elif action == 'setWifi':
        wifiData= data.get('level')
        parts = wifiData.split('_',1)
        wifiNum = parts[0]
        password = parts[1]
        connect_to_network(wifiNum-1, password)

    elif action == 'play':
        if controller:
            controller.play()
        else:
            controller= BluetoothController()
            controller.play()
    elif action == 'pause':
        if controller:
            controller.pause()
        else:
            controller = BluetoothController()
            controller.pause()
    elif action == 'skip':
        if controller:
            controller.next()
        else:
            controller = BluetoothController()
            controller.next()
    elif action == 'prev':
        if controller:
            controller.previous()
        else:
            controller = BluetoothController()
            controller.previous()


    elif action == 'deleteDTC':
        deleteDTC()
    elif action == 'startMaps':
        pass

    return f"Aktion '{action}' erfolgreich ausgeführt!"































@app.route('/get_obd_data', methods=['GET'])
async def get_obd_data():
    try:
        real_obd_data = await read_obd_data()
        obd_data = {
            'rpm': real_obd_data['rpm'],
            'speed': real_obd_data['speed'],
            'coolant_temp': real_obd_data['coolant_temp'],
            'engine_load': real_obd_data['engine_load'] if 'engine_load' in real_obd_data else None,
            'maf': real_obd_data['maf'] if 'maf' in real_obd_data else None,
            'runtime': real_obd_data['runtime'] if 'runtime' in real_obd_data else None,
            'dtc': real_obd_data['dtc'],
            'fuel_status': real_obd_data['fuel_status'] if 'fuel_status' in real_obd_data else None,
            'load_abs': real_obd_data['load_abs'] if 'load_abs' in real_obd_data else None,
            'fuel_pressure': real_obd_data['fuel_pressure'] if 'fuel_pressure' in real_obd_data else None,
            'fuel_rate': real_obd_data['fuel_rate'] if 'fuel_rate' in real_obd_data else None,
            'vin': real_obd_data['vin'] if 'vin' in real_obd_data else None,
            'current_data': real_obd_data['current_data'] if 'current_data' in real_obd_data else None,
            'battery_voltage': real_obd_data['battery_voltage'] if 'battery_voltage' in real_obd_data else None
        }
    except:
        print("Error getting obd Data")

    return jsonify(obd_data)




@app.route('/getWifiData', methods=['GET'])
def getWifiData():
    start_wifi_scan()
    reachableWifi = scan_wifi_networks()
    wifi_data = {f'wifi_{i+1}': name for i, name in enumerate(reachableWifi)}

    return jsonify(wifi_data)


@app.route('/BtSearch', methods=['GET'])
def BtSearch():
    enable_pairing_mode()
    reachableBt = scan_bluetooth_devices()
    bt_data = {f'bt_{i+1}': name for i, name in enumerate(reachableBt)}

    return jsonify(bt_data)


@app.route('/')
def serve_main_page():
    return send_file('main copy.html')

if __name__ == '__main__':
    import threading
    metadata_thread = threading.Thread(target=monitor_metadata_changes)
    metadata_thread.start()
    default()
    app.run(host='0.0.0.0', port=8080)









