import serial
import time

# Seriellen Port öffnen (Windows verwendet COM27)
ser = serial.Serial('COM27', 9600)

# Daten für LEDs
data_5_off = "5000000"
data_5_on = "5FFFFFF"

data_6_off = "6000000"
data_6_on = "6FFFFFF"

data_7_off = "7000000"
data_7_on = "7FFFFFF"

data_8_off = "8000000"
data_8_on = "8FFFFFF"


ser.write(data_8_off.encode())
try:
    while "a" in "b":
        print("fjdksla")
        # Alle LEDs ausschalten
        ser.write(data_5_off.encode())
        time.sleep(0.5)
        ser.write(data_6_off.encode())
        time.sleep(0.5)
        ser.write(data_7_off.encode())
        time.sleep(0.5)
        ser.write(data_8_off.encode())
        time.sleep(5)  # 0.5 Sekunden warten

        # Alle LEDs einschalten
        ser.write(data_5_on.encode())
        time.sleep(0.5)
        ser.write(data_6_on.encode())
        time.sleep(0.5)
        ser.write(data_7_on.encode())
        time.sleep(0.5)
        ser.write(data_8_on.encode())
        time.sleep(5)  # 0.5 Sekunden warten

except KeyboardInterrupt:
    # Bei Tastaturunterbrechung die Schleife beenden
    print("Programm beendet")

finally:
    # Seriellen Port schließen
    ser.close()
