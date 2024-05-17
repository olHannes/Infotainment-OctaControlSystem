from pydbus import SystemBus
from gi.repository import GLib
import time

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

# Beispielverwendung
controller = BluetoothController()
controller.play()
time.sleep(2)
controller.pause()
time.sleep(2)
controller.next()
time.sleep(2)
controller.previous()
