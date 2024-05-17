import alsaaudio

def set_volume(volume):
    vol = int(volume)
    mixer = alsaaudio.Mixer()
    vol = max(0, min(100, vol))
    mixer.setvolume(vol)
