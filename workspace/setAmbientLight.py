import serial
import time


def send(data):
    try:
        ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=0.5)
        time.sleep(1)
        ser.write(data.encode())

        time.sleep(0.3)
        print(ser.readline())
        ser.close()
    except:
        print("Error_2")

def setLEDColor(colors):
    print(colors)
    combined_colors = ''.join(colors)
    real_colors = combined_colors.replace('[','').replace("'",'').replace("#","").replace(",","")
    print(real_colors)

    try:
        send(real_colors)
    except:
        print("Error_2.1")