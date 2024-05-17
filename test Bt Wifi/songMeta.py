from pydbus import SystemBus
from gi.repository import GLib
import io
from PIL import Image

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

def print_metadata():
    try:
        handle = MediaPlayer()
        loop = GLib.MainLoop()

        def metadata_changed_callback(interface, changed_properties, invalidated_properties):
            if 'Track' in changed_properties:
                track_metadata = changed_properties['Track']
                title = track_metadata.get('Title', 'Unknown Title')
                duration = track_metadata.get('Duration', 'Unknown Duration')
                album = track_metadata.get('Album', 'Unknown Album')
                artist = track_metadata.get('Artist', 'Unknown Artist')
        
                print("Metadata Changed:")
                print(f"Title: {title}")
                print(f"Duration: {duration}")
                print(f"Album: {album}")
                print(f"Artist: {artist}")
            print()


        subscription = handle.PropertiesChanged.connect(metadata_changed_callback)
        loop.run()
    except MediaPlayer.DeviceNotFoundError:
        print("No Bluetooth device found.")
    except KeyboardInterrupt:
        loop.quit()
        print("Program terminated.")



print_metadata()
