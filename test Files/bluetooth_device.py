import subprocess
import time

def scan_bluetooth_devices():
    try:
        output = subprocess.check_output(["hcitool", "scan"], stderr=subprocess.STDOUT)
        output = output.decode("utf-8")
        devices = [line.split()[1] for line in output.split('\n')[1:] if line.strip()]

        return devices

    except subprocess.CalledProcessError as e:
        print("Error:", e.output)
        return []

def enable_pairing_mode():
    try:
        subprocess.run(["bluetoothctl", "discoverable", "on"], check=True)
        subprocess.run(["bluetoothctl", "pairable", "on"], check=True)
        print("Pairing mode enabled. Raspberry Pi is now discoverable and pairable.")
    except subprocess.CalledProcessError as e:
        print("Error:", e)

def manageBluetoothDevice():
    enable_pairing_mode()

    devices = scan_bluetooth_devices()
    if devices:
        print("Available Bluetooth Devices:")
        for index, device in enumerate(devices, start=1):
            print(f"{index}: {device}")
    else:
        print("No Bluetooth devices found.")


manageBluetoothDevice()
