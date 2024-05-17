import subprocess

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


def scan_and_connect_to_new_wifi():
    start_wifi_scan()
    networks = scan_wifi_networks()
    if networks:
        print("Available Wi-Fi Networks:")
        for index, network in enumerate(networks, start=1):
            print(f"{index}: {network}")
        try:
            choise = int(input("Enter the number of the network you want to connect to: "))
        except:
            print("not able to get User Input")
            return
        if choise < 1 or choise > len(networks):
            print("Invalid selection.")
            return
        selected_network = networks[choise -1]
        password = input("Enter the password for the network: ")
        connect_to_network(selected_network, password)
    else:
        print("No Wi-Fi networks found")

scan_and_connect_to_new_wifi()
