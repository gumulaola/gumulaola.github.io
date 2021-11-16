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
    let formats = "null";
    if ('BarcodeDetector' in window && BarcodeDetector.getSupportedFormats != undefined) {
        formats = await BarcodeDetector.getSupportedFormats();
        formats = formats.join();
    }
    return formats;
}

async function getBluetooth() {
    let bluetooth = "null";
    if (navigator.bluetooth != undefined && navigator.bluetooth.getAvailability != undefined) {
        bluetooth = await navigator.bluetooth.getAvailability();
        bluetooth = bluetooth.toString();
    }
    return bluetooth;
}

async function main() {
    let fingerprint = {};

    // canvas
    fingerprint["canvas"] = getCanvas();

    // barcode
    fingerprint["barcodeSupportedFormats"] = await getBarcodeSupportedFormats();

    // bluetooth
    fingerprint["bluetooth"] = await getBluetooth();

    console.log(fingerprint);
}

main();
