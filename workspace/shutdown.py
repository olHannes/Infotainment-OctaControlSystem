import os
import time

def setTurnOff():
    print("Turn off")
    try:
        time.sleep(5)
        os.system("sudo shutdown now")
    except:
        pass