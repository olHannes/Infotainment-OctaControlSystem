import serial 
ser = serial.Serial('/dev/ttyUSB0', 9600)

data ="000000FFFFFF000000FFFFFF"
ser.write(data.encode())

ser.close()
