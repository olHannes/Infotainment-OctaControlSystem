import obd
import random


runtimeV=0
batteryVoltageV=12
fehler=['P0700','P0100']




async def read_obd_data():
    try:
        connection = obd.OBD()
        
        for port, desc, hwid in connection.ports():
            if "1a86:7523" in hwid:
                continue
            connection = obd.OBD(portstr=port)
        
        obd_data = {}

        obd_data['rpm'] = await connection.query(obd.commands.RPM)
        obd_data['speed'] = await connection.query(obd.commands.SPEED)
        obd_data['coolant_temp'] = await connection.query(obd.commands.COOLANT_TEMP)
        obd_data['engine_load'] = await connection.query(obd.commands.ENGINE_LOAD)
        obd_data['maf'] = await connection.query(obd.commands.MAF)
        obd_data['runtime'] = await connection.query(obd.commands.RUN_TIME)
        obd_data['dtc'] = await connection.query(obd.commands.GET_DTC)
        obd_data['fuel_status'] = await connection.query(obd.commands.FUEL_STATUS)
        obd_data['load_abs'] = await connection.query(obd.commands.ABSOLUTE_LOAD)
        obd_data['fuel_pressure'] = await connection.query(obd.commands.FUEL_PRESSURE)
        obd_data['fuel_rate'] = await connection.query(obd.commands.FUEL_RATE)
        obd_data['vin'] = await connection.query(obd.commands.VIN)
        obd_data['current_data'] = await connection.query(obd.commands.OBDMessage("0100"))
        obd_data['battery_voltage'] = await connection.query(obd.commands.BATTERY_VOLTAGE)

        return obd_data
    except Exception as e:
        print(f"Error establishing OBD connection: {e}")

        global runtimeV
        global batteryVoltageV
        global fehler

        obd_data = {}

        obd_data['rpm'] = random.randint(800, 6000)
        obd_data['speed'] = random.randint(0, 200)
        obd_data['coolant_temp'] = random.randint(70, 100)
        obd_data['engine_load'] = random.randint(0, 100)
        obd_data['maf'] = round(random.uniform(2, 10), 2)
        obd_data['runtime'] = runtimeV
        obd_data['dtc'] = fehler
        obd_data['fuel_status'] = 'OK'
        obd_data['load_abs'] = random.randint(0, 100)
        obd_data['fuel_pressure'] = random.randint(200, 450)
        obd_data['fuel_rate'] = round(random.uniform(1, 20), 2)
        obd_data['vin'] = '1234567890'
        obd_data['current_data'] = 'Dummy data'
        obd_data['battery_voltage'] = batteryVoltageV

        runtimeV+=0.1
        batteryVoltageV+= round(random.uniform(-0.2, 0.2), 2)
        print("-----------------------------------")
        return obd_data

    finally:
        if connection:
            connection.close()





def deleteDTC():
    try:
        connection = obd.OBD()

        connection.commands['CLEAR_DTC'].send()
        print("Fehlerspeicher erfolgreich gelöscht.")
    except Exception as e:
        print(f"Fehler beim Löschen des Fehlerspeichers: {e}")
    finally:
        global fehler
        fehler=''
        if connection:
            connection.close()