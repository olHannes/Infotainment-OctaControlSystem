import subprocess
import time
import threading
from pydbus import SystemBus
from gi.repository import GLib
import io
from PIL import Image


def scan_bluetooth_devices():
    try:
        output = subprocess.check_output(["hcitool", "scan"], stderr=subprocess.STDOUT)
        output = output.decode("utf-8")
        devices = [line.split()[1] for line in output.split('\n')[1:] if line.strip()]

        return devices

    except subprocess.CalledProcessError as e:
        print("Error:", e.output)
        return []

pairing_timer = None
timer_thread = None
timer_lock = threading.Lock()

def enable_pairing_mode():
    global pairing_timer
    global timer_thread
    
    with timer_lock:
        if pairing_timer:
            pairing_timer.cancel()
        if timer_thread and timer_thread.is_alive():
            timer_thread.join()
    
    # Starte Pairing-Modus
    try:
        subprocess.run(["bluetoothctl", "discoverable", "on"], check=True)
        subprocess.run(["bluetoothctl", "pairable", "on"], check=True)
        print("Pairing mode enabled. Raspberry Pi is now discoverable and pairable.")
        
        # Starte einen neuen Timer
        pairing_timer = threading.Timer(30.0, disable_pairing_mode)
        timer_thread = threading.Thread(target=pairing_timer.start)
        timer_thread.start()
        
    except subprocess.CalledProcessError as e:
        print("Error:", e)

def disable_pairing_mode():
    try:
        subprocess.run(["bluetoothctl", "discoverable", "off"], check=True)
        subprocess.run(["bluetoothctl", "pairable", "off"], check=True)
        print("Pairing mode disabled. Raspberry Pi is no longer discoverable and pairable.")
    except subprocess.CalledProcessError as e:
        print("Error:", e)







    





class MediaPlayer(object):
    def __new__(self):
        bus = SystemBus()
        manager = bus.get('org.bluez', '/')
        
        for obj in manager.GetManagedObjects():
            if obj.endswith('/player0'):
                return bus.get('org.bluez', obj)
        
        raise MediaPlayer.DeviceNotFoundError
    
    class DeviceNotFoundError(Exception):
        def __init__(self):
            super().__init__('No bluetooth device was found')

def metadata_changed_callback(interface, changed_properties, invalidated_properties):
    if 'Track' in changed_properties:
        track_metadata = changed_properties['Track']
        title = track_metadata.get('Title', 'Unknown Title')
        duration = track_metadata.get('Duration', 'Unknown Duration')
        album = track_metadata.get('Album', 'Unknown Album')
        artist = track_metadata.get('Artist', 'Unknown Artist')
        
        metadata = {
            "title": title,
            "duration": duration,
            "album": album,
            "artist": artist
        }
        
        socketio.emit('metadata_changed', metadata)
        print("Metadata Changed:", metadata)

def monitor_metadata_changes():
    try:
        handle = MediaPlayer()
        handle.PropertiesChanged.connect(metadata_changed_callback)
        loop = GLib.MainLoop()
        loop.run()
    except MediaPlayer.DeviceNotFoundError:
        print("No Bluetooth device found.")
    except KeyboardInterrupt:
        loop.quit()
        print("Program terminated.")







class BluetoothController:
    def __init__(self):
        self.bus = SystemBus()
        self.player = None
        self.find_current_player()

    def find_current_player(self):
        manager = self.bus.get('org.bluez', '/')
        for obj in manager.GetManagedObjects():
            if obj.endswith('/player0'):
                self.player = self.bus.get('org.bluez', obj)
                break

    def play(self):
        if self.player:
            self.player.Play()

    def pause(self):
        if self.player:
            self.player.Pause()

    def stop(self):
        if self.player:
            self.player.Stop()

    def next(self):
        if self.player:
            self.player.Next()

    def previous(self):
        if self.player:
            self.player.Previous()
            
            
            

