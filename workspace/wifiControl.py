import subprocess
import json

def start_wifi_scan():
    try:
        subprocess.run(["nmcli", "device", "wifi", "rescan"], check=True)
        print("Wi-Fi scan initiated successfully.")
    except subprocess.CalledProcessError as e:
        print("Error:", e)

def scan_wifi_networks():
    try:
        output = subprocess.check_output(["nmcli", "-f", "SSID", "device", "wifi", "list"], stderr=subprocess.STDOUT)
        output = output.decode("utf-8")
        networks = [line.strip() for line in output.split('\n') if line.strip() and not line.startswith("SSID")]

        return networks

    except subprocess.CalledProcessError as e:
        print("Error:", e.output)
        return []

def connect_to_network(network, password):
    try:
        subprocess.run(["nmcli", "device", "wifi", "connect", network, "password", password], check=True)
        print(f"Connected to Wi-Fi network: {network}")
    except subprocess.CalledProcessError as e:
        print("Error:", e)


