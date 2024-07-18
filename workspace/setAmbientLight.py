import serial
import time

ser = None

def setup_serial():
    global ser
    try:
        ser = serial.Serial('/dev/ttyUSB0', 9600)
        time.sleep(2)
    except Exception as e:
        print("Fehler beim Öffnen der seriellen Verbindung:", e)
setup_serial()

def send(data):
    try:
        ser.write(data.encode())
        time.sleep(0.5)
    except:
        print("Error_2")

def setLEDColor(sec, color):
    colorText = str(sec) + color
    print(colorText)

    try:
        send(colorText)
    except:
        print("Error_2.1")
