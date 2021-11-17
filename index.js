// AMIUnique: https://amiunique.org/
function getCanvas() {
    let canvas = document.createElement("canvas");
    canvas.height = 60;
    canvas.width = 400;
    let canvasContext = canvas.getContext("2d");
    canvas.style.display = "inline";
    canvasContext.textBaseline = "alphabetic";
    canvasContext.fillStyle = "#f60";
    canvasContext.fillRect(125, 1, 62, 20);
    canvasContext.fillStyle = "#069";
    canvasContext.font = "llpt no-real-font-123";
    canvasContext.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
    canvasContext.fillStyle = "rgba(102,204,0,0.7)";
    canvasContext.font = "18pt Arial";
    canvasContext.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);
    let canvasData = canvas.toDataURL();
    return canvasData;
}

async function getBarcodeSupportedFormats() {
    let formats = "0";
    if ('BarcodeDetector' in window && BarcodeDetector.getSupportedFormats != undefined) {
        formats = await BarcodeDetector.getSupportedFormats();
        formats = formats.join();
    }
    return formats;
}

async function getBluetooth() {
    let bluetooth = "0";
    if (navigator.bluetooth != undefined && navigator.bluetooth.getAvailability != undefined) {
        bluetooth = await navigator.bluetooth.getAvailability();
        bluetooth = bluetooth.toString();
    }
    return bluetooth;
}

// TODO? Need to be improved
async function getMediaCapabilities() {
    let audio = "0";
    let video = "0";
    if ("mediaCapabilities" in navigator) {
        const audioConfig = {
            type: 'file',
            audio: {
                contentType: "audio/ogg",
                channels: 2,
                bitrate: 132700,
                samplerate: 5200
            }
        };
        const videoConfig = {
            type: 'file',
            video: {
                contentType: "video/webm;codecs=vp8",
                width: 800,
                height: 600,
                bitrate: 10000,
                framerate: 30
            }
        };
        audio = await navigator.mediaCapabilities.decodingInfo(audioConfig);
        video = await navigator.mediaCapabilities.decodingInfo(videoConfig);
    }
    return audio["supported"] + audio["smooth"] + audio["powerEfficient"] + "," + video["supported"] + video["smooth"] + video["powerEfficient"];
}

async function getMediaDevices() {
    let devices = "0";
    if (navigator.mediaDevices != undefined && navigator.mediaDevices.enumerateDevices != undefined) {
        devices = await navigator.mediaDevices.enumerateDevices();
        devices = JSON.stringify(devices);
    }
    return devices;
}

function getSupportedMediaConstraints() {
    let supportedMediaConstraints = "0";
    if (navigator.mediaDevices != undefined && navigator.mediaDevices.getSupportedConstraints != undefined) {
        supportedMediaConstraints = navigator.mediaDevices.getSupportedConstraints();
        supportedMediaConstraints = JSON.stringify(supportedMediaConstraints);
    }
    return supportedMediaConstraints;
}

async function getPermissions() {
    let permissions = "0";
    if ("permissions" in navigator) {
        let res = [];
        let geolocation = await navigator.permissions.query({ name: 'geolocation' });
        res.push("geolocation:" + geolocation.state);
        let notifications = await navigator.permissions.query({ name: 'notifications' });
        res.push("notifications:" + notifications.state);
        let push = await navigator.permissions.query(Object.assign({ name: "push" }, { userVisibleOnly: true }));
        res.push("push:" + push.state);
        let midi = await navigator.permissions.query(Object.assign({ name: "midi" }, { sysex: true }));
        res.push("midi:" + midi.state);
        let camera = await navigator.permissions.query({ name: 'camera' });
        res.push("camera:" + camera.state);
        let microphone = await navigator.permissions.query({ name: 'microphone' });
        res.push("microphone:" + microphone.state);
        let backgroundSync = await navigator.permissions.query({ name: 'background-sync' });
        res.push("backgroundSync:" + backgroundSync.state);
        let accelerometer = await navigator.permissions.query({ name: 'accelerometer' });
        res.push("accelerometer:" + accelerometer.state);
        let gyroscope = await navigator.permissions.query({ name: 'gyroscope' });
        res.push("gyroscope:" + gyroscope.state);
        let magnetometer = await navigator.permissions.query({ name: 'magnetometer' });
        res.push("magnetometer:" + magnetometer.state);
        permissions = res.join();
    }
    return permissions;
}

async function getHidDevices() {
    let devices = "0";
    if ("hid" in navigator && navigator.hid.getDevices != undefined) {
        devices = await navigator.hid.getDevices();
        if (devices.length == 0) {
            devices = "0";
            return devices;
        }
        devices = JSON.stringify(devices);
    }
    return devices;
}

async function getSpeechVoices() {
    let voices = "0";
    if ("speechSynthesis" in window) {
        function setSpeech() {
            return new Promise(
                function (resolve, reject) {
                    let synth = window.speechSynthesis;
                    let id;
                    id = setInterval(() => {
                        if (synth.getVoices().length !== 0) {
                            resolve(synth.getVoices());
                            clearInterval(id);
                        }
                    }, 10);
                }
            )
        }
        let res = await setSpeech();
        let voicesArr = [];
        for (const item of res) {
            voicesArr.push(item.name + " " + item.lang + " " + item.localService + " " + item.default)
        }
        voices = voicesArr.join();
    }
    return voices;
}

async function main() {
    let fingerprint = {};

    // permissions
    fingerprint["permissions"] = await getPermissions();

    // Barcode [new]
    fingerprint["barcodeSupportedFormats"] = await getBarcodeSupportedFormats();

    // Bluetooth [new]
    fingerprint["bluetooth"] = await getBluetooth();

    // Media [partly new]
    fingerprint["mediaCapabilities[in progress]"] = await getMediaCapabilities();
    fingerprint["mediaDevices"] = await getMediaDevices();
    fingerprint["supportedMediaConstraints"] = getSupportedMediaConstraints();

    // HID devices [new]
    fingerprint["hidDevices"] = await getHidDevices();

    // Speech [new]
    fingerprint["speechVoices"] = await getSpeechVoices();

    // Canvas
    fingerprint["canvas"] = getCanvas();

    console.log(fingerprint);

    for (const key in fingerprint) {
        let output = document.getElementById("output");
        let h = document.createElement("h3");
        output.appendChild(h);
        h.innerText = key;
        let p = document.createElement("p");
        output.appendChild(p);
        p.innerText = fingerprint[key];
    }
}

main();
