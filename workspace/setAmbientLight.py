import serial
import time


def send(data):
    try:
        ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=0.5)
        ser.write(data.encode())
        time.sleep(0.5)
        ser.close()
    except:
        print("Error_2")

def setLEDColor(sec, color):
    colorText = str(sec) + color
    print(colorText)

    try:
        send(colorText)
    except:
        print("Error_2.1")
