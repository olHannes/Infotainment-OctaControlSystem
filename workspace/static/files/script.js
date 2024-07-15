







//--------------------------------------------------------------------------------------------------------- function for logging
function logConsole(message) {
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    const formattedMessage = `<span style="color: red;">${timeString}</span> ${message}\n`;
    const consoleElement = document.getElementById("console");
    consoleElement.innerHTML += formattedMessage;

    consoleElement.scrollTop = consoleElement.scrollHeight;
}
function clearLogger(event){
    document.getElementById('console').innerHTML="";
    event.stopPropagation();
}

    //---------------------------------------------------------------------------------------------------------hide Panels when they arent in use
    function clickOnBody(){
        document.getElementById('blackscreen').style.display="none";
            logConsole("touch");
            if (document.getElementById('listBtDevice').style.display === 'block') {
                document.getElementById('listBtDevice').style.display = 'none';
            }
            if (document.getElementById('listWifiNetwork').style.display === 'block'){
                document.getElementById('listWifiNetwork').style.display = 'none';
            }
            if(document.getElementById('wifiDetailsPanel').style.display === 'block'){
                document.getElementById('wifiDetailsPanel').style.display="none";
            }
            if(document.getElementById('selectBackgroundImage').style.display === 'flex'){
                document.getElementById('selectBackgroundImage').style.display="none";
            }
        };

    //---------------------------------------------------------------------------------------------------------globale Variablen
    var showOBDData     =   false;
    
    
    
    //---------------------------------------------------------------------------------------------------------live Clock
    function updateTime() {
            var now = new Date();
            var hours = now.getHours().toString().padStart(2, '0');
            var minutes = now.getMinutes().toString().padStart(2, '0');
            var seconds = now.getSeconds().toString().padStart(2, '0');
            var timeString = hours + ':' + minutes + ':' + seconds;
            var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var dateString = now.toLocaleDateString('de-DE', dateOptions);
        
            document.getElementById('clock').textContent = timeString;
            document.getElementById('date').textContent = dateString;
        
        }
        setInterval(updateTime, 1000);
    
    

    //---------------------------------------------------------------------------------------------------------function to connect to wifi
    
    var currentSelectedNetwork = '';
    function wlanFunction(event){
        wlanConnection();
        event.stopPropagation();
    };
    
    
    
    function wlanConnection(){
        document.getElementById("listBtDevice").style.display="none";
        document.getElementById("listWifiNetwork").style.display="block";
        getWifiNetwork();
        logConsole("getWifi");
    }
    
    function getWifiNetwork() {
        fetch('/get_wifi_network', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log("Empfangene Netzwerke:", data);
            listNetworks(data);
        })
        .catch(error => console.error('Error fetching networks:', error));
    }

    function listNetworks(data) {
        let listWifiNetwork = document.getElementById("listWifiNetwork");
        listWifiNetwork.innerHTML = "search for Wifi networks...";

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let listItem = document.createElement("h2");
                listItem.textContent = data[key];
                listItem.setAttribute("onclick", "showWifiDetails('" + data[key] + "',)");
                listWifiNetwork.appendChild(listItem);
            }
        }
    }






    function showWifiDetails(selectedNetwork){
        document.getElementById('wifiDetailsPanel').style.display="block";
        document.getElementById('wifiPassword').placeholder='password for network: '+ selectedNetwork;
        currentSelectedNetwork = selectedNetwork;
        document.getElementById('wifiPassword').focus();
        sendData("setTastatur", {"level": true});
    }

    function connectWifi(){
        document.getElementById('wifiDetailsPanel').style.display="none";
        var password=document.getElementById('wifiPassword').value;
        var wifiData = currentSelectedNetwork + '_' + password;
        sendData("setWifi", {"level": wifiData});
        logConsole("connect To Wifi");
    }


    //---------------------------------------------------------------------------------------------------------function to connect to bt
    
    
    function btFunction(event){
        btConnection();
        event.stopPropagation();
    };
    
    
    function btConnection(){
        sendData("setBt", {"level": true});
        document.getElementById("listWifiNetwork").style.display="none";
        document.getElementById("listBtDevice").style.display="block";
        console.log("bluetooth panel soll angezeigt werden.");
        logConsole("Scan for Bt devices");
        getBtDevices();

    }

    function getBtDevices() {
        fetch('/get_bt_devices', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log("Empfangene Bluetooth-Devices:", data);
            listDevices(data);
        })
        .catch(error => console.error('Error fetching bluetooth devices:', error));
    }

    function listDevices(data){
        let listBtDevices = document.getElementById("listBtDevice");
        listBtDevices.innerHTML = "search for bluetooth Devices...";

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let listItem = document.createElement("h2");
                listItem.textContent = data[key];
                listBtDevices.appendChild(listItem);
            }
        }
    }

    //---------------------------------------------------------------------------------------------------------volume change
    
    var mute=false;

    function volumeChange(value){
        if(value == 0){
            document.getElementById('loudFunction').style.display="flex";
            document.getElementById('muteFunction').style.display="none";
        }else{
            document.getElementById('loudFunction').style.display="none";
            document.getElementById('muteFunction').style.display="flex";
        }

        if(mute == false){
            
        }
        logConsole("Volume: "+value);
        sendData("volume", {"level": value});
    }


    function muteFunction(){
        volumeChange(0);
        document.getElementById('myRange').value=0;
    };

    function loudFunction(){
        volumeChange(10);
        document.getElementById('myRange').value=10;
    };
    
    
    //---------------------------------------------------------------------------------------------------------website brightness Change
    function brightnessLevelChange(value){
        var wert=value-50;
        logConsole("brightness Level: "+ wert);
        document.body.style.filter = "brightness(" + value + "%)";
    }
    
    
    //---------------------------------------------------------------------------------------------------------change Color Profile
    function changeColorProfile(){
        logConsole("change Profile");
        var image = document.getElementById('buttonImage');
    
        if (image.src.includes("Profil1")) {
            document.getElementById("console").textContent+="change to Profile 2\n";
            document.getElementById("console").scrollTop = document.getElementById("console").scrollHeight;
            image.src = "static\\images\\Profil2.png";
            document.getElementById('startLabel').style.backgroundColor = "var(--bar_2)";
            document.getElementById('lightBar').style.backgroundColor = "var(--bar_2)";
            document.getElementById('soundBar').style.backgroundColor = "var(--bar_2)";
            document.getElementById('obdBar').style.backgroundColor = "var(--bar_2)";
            document.getElementById('settingsBar').style.backgroundColor = "var(--bar_2)";
            document.getElementById('sidePanel_').style.backgroundColor = "var(--sidePanel_2)";
            document.getElementById('volumeLevelBox').style.backgroundColor = "var(--volumeSliderBox_2)";
            document.getElementById('buttonContainer').style.backgroundColor = "var(--buttonContainerColor_2)";
        } else {
            document.getElementById("console").textContent+="change to Profile 1\n";
            document.getElementById("console").scrollTop = document.getElementById("console").scrollHeight;
            image.src = "static\\images\\Profil1.png";
            document.getElementById('startLabel').style.backgroundColor = "var(--bar_1)";
            document.getElementById('lightBar').style.backgroundColor = "var(--bar_1)";
            document.getElementById('soundBar').style.backgroundColor = "var(--bar_1)";
            document.getElementById('obdBar').style.backgroundColor = "var(--bar_1)";
            document.getElementById('settingsBar').style.backgroundColor = "var(--bar_1)";
            document.getElementById('sidePanel_').style.backgroundColor = "var(--sidePanel_1)";
            document.getElementById('volumeLevelBox').style.backgroundColor = "var(--volumeSliderBox_1)";
            document.getElementById('buttonContainer').style.backgroundColor = "var(--buttonContainerColor_1)";
        }
    };
    
    

    //---------------------------------------------------------------------------------------------------------change Background Image
    function changeBackground(value) {
        logConsole("change Background");
        const imageUrl = `static\\\\images\\\\image_${value}.jpg`;
        console.log(imageUrl);
        document.body.style.backgroundImage = `url('${imageUrl}')`;
    }

    function setBackgroundImage(){
        document.getElementById('selectBackgroundImage').style.display="flex";
        event.stopPropagation();
    }


    //---------------------------------------------------------------------------------------------------------DOMContentLoaded Function
    document.addEventListener("DOMContentLoaded", function() {
        //---------------------------------------------------------------------------------------------------------Event for tip (Musik Anlage) to dissappear
        var tipContainer = document.getElementById("tip-container");
        var progressBar = document.getElementById("progress-bar");
        progressBar.addEventListener("animationend", function() {
            tipContainer.style.display = "none";
        });
    });



    function openBTSite(){
        document.getElementById('bluetoothPanel').style.display="block";
    }
    function hideBTPanel(){
        document.getElementById('bluetoothPanel').style.display="none";
    }
    function play(){
        sendData("play", {"level": true});
    }
    function pause(){
        sendData("pause", {"level": true});
    }
    function skip(){
        sendData("skip", {"level": true});
    }
    function prev(){
        sendData("prev", {"level": true});
    }




    function openDeezerSite() {
    checkInternetConnection()
        .then(connected => {
            if (connected) {
                logConsole("start deezer");
                sendData("startDeezer", {"level": true});
            } else {
                showInternetError();
            }
        })
        .catch(error => {
            showInternetError();
        });
}
    function openSpotifySite() {
    checkInternetConnection()
        .then(connected => {
            if (connected) {
                logConsole("start spotify");
                sendData("startSpotify", {"level": true});
            } else {
                showInternetError();
            }
        })
        .catch(error => {
            showInternetError();
        });
}
    function openRadioSite() {
    checkInternetConnection()
        .then(connected => {
            if (connected) {
                logConsole("start radio");
                sendData("startRadio", {"level": true});
            } else {
                showInternetError();
            }
        })
        .catch(error => {
            showInternetError();
        });
}
    
    
    //---------------------------------------------------------------------------------------------------------Function to clear DTC
    function clearErrorCodes(){
        sendData("deleteDTC",{"level": true});
        logConsole("try: deleteDTC");
        var tableBody = document.getElementById("errorBody");
        tableBody.innerHTML = "";
        var dtc=document.getElementById('dtc');
        dtc.textContent="-";
    }
    

    function changeToBlackscreen(event){
        event.stopPropagation();
        document.getElementById('blackscreen').style.display="block";
    }

    //---------------------------------------------------------------------------------------------------------Function to exit OCS
    function exit(){
        document.getElementById('buttonContainer').style.display="none";
        document.getElementById('ambientLight_ControlPanel').style.display="none";
        document.getElementById('soundControl_Panel').style.display="none";
        document.getElementById('settings').style.display="none";
        document.getElementById('turnOffSwitch').style.display="none";
        document.getElementById('startLabel').style.display="none";
        document.getElementById('console').style.display="none";
        document.getElementById('sidePanel').style.display="none";
        document.getElementById('volumeLevelBox').style.display="none";
        document.body.style.backgroundColor = "#00455c";
        document.body.style.backgroundImage = "none";
        document.getElementById('brightnessLevel').style.display="none";
        document.body.style.filter = "brightness(" + 100 + "%)";
        logConsole("exit OCS");
        document.getElementById('exitPanel').style.display="block";
        countdown();
    }
    
    //---------------------------------------------------------------------------------------------------------Function Countdown shows 5 seconds countdown
    function countdown(){
        var countdownElement = document.getElementById("countdown");
        var count = 5;
        var countdownInterval = setInterval(function(){
            countdownElement.textContent = "Shutdown in "+count+"...";
            count--;
            if(count < 0){
                clearInterval(countdownInterval);
                countdownElement.textContent = "";
            }
        }, 1000);
        console.log("ende");
    }
    
    //---------------------------------------------------------------------------------------------------------Function backToStart shows the main Screen
    function backToStart(){
        document.getElementById('ambientLight_ControlPanel').style.display="none";
        document.getElementById('soundControl_Panel').style.display="none";
        document.getElementById('obd_Panel').style.display="none";
        document.getElementById('settings').style.display="none";
        showOBDData=false;
        document.getElementById('startLabel').style.display="block";
        document.getElementById('buttonContainer').style.display="flex";
    
        document.getElementById('obdVisualisation').style.display="none";
        document.getElementById('obdErrorPage').style.display="none";
        document.getElementById('additiveComponents').style.display="none";
        stopliveIndicator();
    }
    
    //---------------------------------------------------------------------------------------------------------Function hideStartButton hides main-Site Buttons
    function hideStartButton(){
        document.getElementById('buttonContainer').style.display = "none";
        document.getElementById('startLabel').style.display="none";
    }
    
    //---------------------------------------------------------------------------------------------------------Function Block to animate shutdown Slider back to 0
    function animateSlider(startValue, endValue) {
        var delta = startValue - endValue;
        var step = 1;
        var interval = setInterval(function() {
            if (startValue > endValue) {
                startValue -= step;
                document.getElementById("turnOffSwitch").value = startValue;
            } else {
                clearInterval(interval);
            }
        }, 3);
    }
      
    function resetSliderValue() {
        var currentValue = parseInt(document.getElementById("turnOffSwitch").value);
        if (currentValue >= 100) {
            logConsole("try: shutdown");
            sendData("statusTurnOff", {"level": true});
            document.getElementById("turnOffSwitch").classList.add('turnOffSwitch2');
            exit();
        } else {
            document.getElementById("turnOffSwitch").classList.add('turnOffSlider');
            document.getElementById("turnOffSwitch").classList.remove('turnOffSwitch2');
        }
        animateSlider(currentValue, 0);
    }
      
    document.getElementById("turnOffSwitch").addEventListener('touchend', function() {
        resetSliderValue();
        });
    document.getElementById("turnOffSwitch").addEventListener('mouseup', function(){
        resetSliderValue();
    });
    
    
    //---------------------------------------------------------------------------------------------------------Function to start LightControl Panel
    function lightControlFunction() {
        hideStartButton();
        document.getElementById('ambientLight_ControlPanel').style.display="block";
    }
    var colorArray = [0,0,0,0];
    
    function getColor() {
        
    }
    
    
    //---------------------------------------------------------------------------------------------------------Function to start SoundControl Panel
    function soundControlFunction() {
        hideStartButton();
        document.getElementById('soundControl_Panel').style.display="block";
    
        var tipContainer = document.getElementById('tip-container');
        tipContainer.style.display = "block";
    
        setTimeout(function() {
            tipContainer.style.display = "none";
        }, 5000);
        logConsole("open SoundControl");
        
    }
    
    
    //---------------------------------------------------------------------------------------------------------Function to start obd Panel 
    var liveInterval;
    function obdFunction(){
        hideStartButton();
        showOBDData=true;
        fetchDataAndDisplay();
        
        document.getElementById('obd_Panel').style.display="block";
        document.getElementById('additiveComponents').style.display="block";
        document.getElementById('obdInfo').style.display="block";
        document.getElementById('obdVisualisation').style.display="none";
        document.getElementById('obdErrorPage').style.display="none";
    
        startLiveIndicator();
    }
    //---------------------------------------------------------------------------------------------------------Function Block to blink live data image
    var isLive = true;
    function startLiveIndicator(){
        liveInterval = setInterval(liveIndicator, 750);
    }
    function liveIndicator(){
        var img = document.getElementById("live");
        img.src = isLive ? 'static/images/live_.png' : 'static/images/live.png';
        isLive = !isLive;
    }
    function stopliveIndicator(){
        clearInterval(liveInterval);
    }
    
    
    //---------------------------------------------------------------------------------------------------------Function Block to update obd Data
    
    function setRpm(value){
        document.getElementById("rpm").innerText=value+" U/min";
        var foreground = document.getElementById('rpmLevel');
        var height = 100 - (value / 7000) * 100;
        foreground.style.height = `${height}%`;
    }
    
    function setSpeed(value){
        document.getElementById("speed").innerText=value+" km/h";
        var rotationDegree = (value / 200) * (93.2 - (-93)) + (-93);
        document.getElementById('zeiger').style.transform = 'rotate(' + rotationDegree + 'deg)';
    }
    
    function setCoolAnt(value){
        document.getElementById("coolant_temp").innerText = value + " °C";
        const liquid = document.getElementById('liquid');
        const temp   = document.getElementById('digitalTemp');
        temp.textContent=value+'°C';
        const minHeight = 11;
        const maxHeight = 78;
        const heightRange = maxHeight - minHeight;
        const height = (heightRange * value) / 130 + minHeight;
        liquid.style.height = height + '%';
        if(value>96){
            liquid.style.backgroundColor="#b92d2d";
        }
        else if(value>85){
            liquid.style.backgroundColor="#356752";
        }
        else{
            liquid.style.backgroundColor="#353567";
        }
    }
    
    function setEngineLoad(value){
        document.getElementById("engine_load").innerText=value+" %";
    }
    
    function setMaf(value){
        document.getElementById("maf").innerText=value+" g/s";
    }
    
    function setRuntime(value){
        document.getElementById("runtime").innerText=value+" Min";
    }
    
    function setError(value){
        if(value === "error" || !Array.isArray(value)){
            return;
        }
        var dtc=document.getElementById('dtc');
        const errorBody = document.getElementById('errorBody');
    
        value.forEach(code => {
        const existingRow = Array.from(errorBody.children).find(row => row.textContent.trim() === code);
    
        if (!existingRow) {
            const newRow = document.createElement('tr');
            const newCell = document.createElement('td');
            newCell.textContent = code;
            dtc.textContent+=code+" ";
            newRow.appendChild(newCell);
            errorBody.appendChild(newRow);
        }
        });
    }
    
    function setStatus(value){
        document.getElementById("fuel_status").innerText=value;
    }
    
    function setLoadAbs(value){
        document.getElementById("load_abs").innerText=value+" %";
    }
    
    function setFuelPressure(value){
        document.getElementById("fuel_pressure").innerText=value+" kPa";
    }
    
    function setFuelRate(value){
        document.getElementById("fuel_rate").innerText=value+" l/h";
    }
    
    function setVin(value){
        document.getElementById("vin").innerText=value;
    }
    
    function setInformation(value){
        document.getElementById("current_data").innerText=value;
    }
    
    function setVoltage(value){
        var voltageValue = document.getElementById('battery_voltage');
        var barU12 = document.getElementById('voltageU12');
        var barG12 = document.getElementById('voltageG12');
    
        if(value > 12){
            barU12.style.width = "0.5%";
            var widthPercentage = (value - 12) * 15;
            barG12.style.width = widthPercentage + "%";
        } else if(value < 12){
            barG12.style.width = "0.5%";
            var widthPercentage = (value - 12) * -15;
            barU12.style.width = widthPercentage + "%";
        } else {
            barU12.style.width = "0.5%";
            barG12.style.width = "0.5%";
        }
        voltageValue.innerText=value+"V";
        voltage.innerText=value+"V";
    }
    
    
    //---------------------------------------------------------------------------------------------------------Function Block to switch between the obd sites
    function obd_2Page(){
        document.getElementById('obdInfo').style.display="none";
        document.getElementById('obdVisualisation').style.display="block";
    }
    
    
    function obd_3Page(){
        document.getElementById('obdVisualisation').style.display="none";
        document.getElementById('obdErrorPage').style.display="block";
    }
    
    
    function obd_1Page(){
        document.getElementById('obdErrorPage').style.display="none";
        document.getElementById('obdInfo').style.display="block";
    }
    
    //---------------------------------------------------------------------------------------------------------Function to go on settings Page
    function settingsFunction(){
        hideStartButton();
        document.getElementById("console").scrollTop = document.getElementById("console").scrollHeight;
        document.getElementById("settings").style.display="block";
    }


    //---------------------------------------------------------------------------------------------------------Function to go on maps Page
    function cardFunction() {
    checkInternetConnection()
        .then(connected => {
            if (connected) {
                logConsole("start navigation");
                sendData("startMaps", {"level": true});
            } else {
                showInternetError();
            }
        })
        .catch(error => {
            showInternetError();
        });
}

    
    
    //---------------------------------------------------------------------------------------------------------check whitch Buttons are pressed to for Color Change
    var button1Clicked = false;
    var button2Clicked = false;
    var button3Clicked = false;
    var button4Clicked = false;

    function toggleShadow(buttonId) {
        var checkbox = document.getElementById(buttonId);
        var img = checkbox.nextElementSibling.querySelector('img');
    
        switch (buttonId) {
            case 'colorBtn1':
                button1Clicked = !button1Clicked;
                break;
            case 'colorBtn2':
                button2Clicked = !button2Clicked;
                break;
            case 'colorBtn3':
                button3Clicked = !button3Clicked;
                break;
            case 'colorBtn4':
                button4Clicked = !button4Clicked;
                break;
            default:
                break;
        }

        if (checkbox.checked) {
            img.style.opacity = 1;
            img.style.boxShadow = '9px 9px 17px -1px white';
        } else {
            img.style.opacity = '';
            img.style.boxShadow = '';
        }
    }

    //---------------------------------------------------------------------------------------------------------Function to change specific colors for profile 2 
    function setColor() {
        var selectedColor = document.getElementById("colorSettings").value;
        var change=false;
        if(button1Clicked){
            document.documentElement.style.setProperty("--bar_2", selectedColor);
            change=true;
        }
        if(button2Clicked){
            document.documentElement.style.setProperty("--sidePanel_2", selectedColor);
            change=true;
        }
        if(button3Clicked){
            document.documentElement.style.setProperty("--buttonContainerColor_2", selectedColor);
            change=true;
        }
        if(button4Clicked){
            document.documentElement.style.setProperty("--volumeSliderBox_2", selectedColor);
            change=true;
        }
        if(change){
            logConsole("change color for profile 2");
        }
    }





    //---------------------------------------------------------------------------------------------------------Function to get obd Data from python script
    function fetchDataAndDisplay() {
        fetch('/get_obd_data', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log("Empfangene OBD-Daten:", data);
            setRpm(data.rpm);
            setSpeed(data.speed);
            setCoolAnt(data.coolant_temp);
            setEngineLoad(data.engine_load);
            setMaf(data.maf);
            setRuntime(data.runtime);
            setError(data.dtc);
            setStatus(data.fuel_status);
            setLoadAbs(data.load_abs);
            setFuelPressure(data.fuel_pressure);
            setFuelRate(data.fuel_rate);
            setVin(data.vin);
            setInformation(data.current_data);
            setVoltage(data.battery_voltage);
        })
        .catch(error => console.error('Error fetching OBD data:', error));
        if(showOBDData){
            setTimeout(fetchDataAndDisplay, 500);
        }
    }
    window.onload = fetchDataAndDisplay;
    
    
    //---------------------------------------------------------------------------------------------------------Function to send Data to python Script
    function sendData(action, data) {
        logConsole("send:\n"+action + ", " + data+"\n------------------------");
        const formData = new FormData();
        formData.append('action', action);
        formData.append('data', JSON.stringify(data));
    
        fetch('/', {
            method: 'POST',
            body: formData
        });
    }
    
    
//---------------------------------------------------------------------------------------------------------Function to check if pi is connected
function checkInternetConnection() {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    console.log('Verbunden mit dem Internet.');
                    resolve(true);
                } else {
                    console.log('Keine Internetverbindung.');
                    resolve(false);
                }
            })
            .catch(() => {
                console.log('Fehler beim Prüfen der Internetverbindung.');
                resolve(false);
            });
    });
}

function showInternetError(){
    document.getElementById('offlineMessage').style.display="block";
    setTimeout(hideWifiError, 2500);
}
    
function hideWifiError(){
    document.getElementById('offlineMessage').style.display="none";
}


