import os

width = 500
height = 600
x_pos = 800
y_pos = 480

def openSpotify():
    url = "https://open.spotify.com/intl-de"

    command = f"chromium-browser --app={url} --window-size={width},{height} --window-position={x_pos},{y_pos}"
    os.system(command)


def openDeezer():
    url = "https://wwww.deezer.com"

    command = f"chromium-browser --app={url} --window-size={width},{height} --window-position={x_pos},{y_pos}"
    os.system(command)


def openRadio():
    url = "https://www.radio.de/"

    command = f"chromium-browser --app={url} --window-size={width},{height} --window-position={x_pos},{y_pos}"
    os.system(command)


def openMaps():
    url = "https://www.google.com/maps"

    command = f"chromium-browser --app={url} --window-size={width},{height} --window-position={x_pos},{y_pos}"
    os.system(command)