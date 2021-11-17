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
    let formats = "Not Support";
    if ('BarcodeDetector' in window && BarcodeDetector.getSupportedFormats != undefined) {
        formats = await BarcodeDetector.getSupportedFormats();
        formats = formats.join();
    }
    return formats;
}

async function getBluetooth() {
    let bluetooth = "Not Support";
    if (navigator.bluetooth != undefined && navigator.bluetooth.getAvailability != undefined) {
        bluetooth = await navigator.bluetooth.getAvailability();
        bluetooth = bluetooth.toString();
    }
    return bluetooth;
}

// TODO? Need to be improved
async function getMediaCapabilities() {
    let audio = "Not Support";
    let video = "Not Support";
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
    let devices = "Not Support";
    if (navigator.mediaDevices != undefined && navigator.mediaDevices.enumerateDevices != undefined) {
        res = await navigator.mediaDevices.enumerateDevices();
        let devicesArr = [];
        for (const item of res) {
            devicesArr.push(item.kind);
        }
        devices = JSON.stringify(devicesArr);
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
    let permissions = "Not Support";
    if ("permissions" in navigator) {
        let res = {};
        let geolocation = await navigator.permissions.query({ name: 'geolocation' });
        res["geolocation"] = geolocation.state;
        let notifications = await navigator.permissions.query({ name: 'notifications' });
        res["notifications"] = notifications.state;
        let push = await navigator.permissions.query(Object.assign({ name: "push" }, { userVisibleOnly: true }));
        res["push"] = push.state;
        let midi = await navigator.permissions.query(Object.assign({ name: "midi" }, { sysex: true }));
        res["midi"] = midi.state;
        let camera = await navigator.permissions.query({ name: 'camera' });
        res["camera"] = camera.state;
        let microphone = await navigator.permissions.query({ name: 'microphone' });
        res["microphone"] = microphone.state;
        let backgroundSync = await navigator.permissions.query({ name: 'background-sync' });
        res["backgroundSync"] = backgroundSync.state;
        let accelerometer = await navigator.permissions.query({ name: 'accelerometer' });
        res["accelerometer"] = accelerometer.state;
        let gyroscope = await navigator.permissions.query({ name: 'gyroscope' });
        res["gyroscope"] = gyroscope.state;
        let magnetometer = await navigator.permissions.query({ name: 'magnetometer' });
        res["magnetometer"] = magnetometer.state;
        permissions = JSON.stringify(res);
    }
    return permissions;
}

async function getHidDevices() {
    let devices = "Not Support";
    if ("hid" in navigator && navigator.hid.getDevices != undefined) {
        devices = await navigator.hid.getDevices();
        devices = JSON.stringify(devices);
    }
    return devices;
}

async function getSpeechVoices() {
    let voices = "Not Support";
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
            voicesArr.push({
                "name": item.name,
                "lang": item.lang,
                "localService": item.localService,
                "default": item.default
            })
        }
        voices = JSON.stringify(voicesArr);
    }
    return voices;
}

function getSupportedDOMAttributes() {
    let DOMList = {
        "HTMLAnchorElement": [
            "charset",
            "coords",
            "download",
            "hreflang",
            "name",
            "ping",
            "referrerPolicy",
            "rel",
            "relList",
            "rev",
            "shape",
            "target",
            "text",
            "type"
        ],
        "HTMLAreaElement": [
            "alt",
            "coords",
            "download",
            "noHref",
            "ping",
            "referrerPolicy",
            "rel",
            "relList",
            "shape",
            "target"
        ],
        "HTMLAudioElement": [
            "Audio",
            "mozCurrentSampleOffset",
            "mozSetup",
            "mozWriteAudio"
        ],
        "HTMLBRElement": [
            "clear"
        ],
        "HTMLBaseElement": [
            "href",
            "target"
        ],
        "HTMLBaseFontElement": [
            "color",
            "face",
            "size"
        ],
        "HTMLBodyElement": [
            "aLink",
            "background",
            "bgColor",
            "link",
            "onorientationchange",
            "text",
            "vLink"
        ],
        "HTMLButtonElement": [
            "autofocus",
            "checkValidity",
            "disabled",
            "form",
            "formAction",
            "formEnctype",
            "formMethod",
            "formNoValidate",
            "formTarget",
            "labels",
            "name",
            "reportValidity",
            "setCustomValidity",
            "type",
            "validationMessage",
            "validity",
            "value",
            "willValidate"
        ],
        "HTMLCanvasElement": [
            "captureStream",
            "getContext",
            "height",
            "mozFetchAsStream",
            "mozGetAsFile",
            "mozOpaque",
            "toDataURL",
            "transferControlToOffscreen",
            "width"
        ],
        "HTMLContentElement": [
            "getDistributedNodes",
            "select"
        ],
        "HTMLDListElement": [
            "compact"
        ],
        "HTMLDataElement": [
            "value"
        ],
        "HTMLDataListElement": [
            "options"
        ],
        "HTMLDetailsElement": [
            "open"
        ],
        "HTMLDialogElement": [
            "close",
            "open",
            "returnValue",
            "show",
            "showModal"
        ],
        "HTMLDirectoryElement": [
            "compact"
        ],
        "HTMLDivElement": [
            "align"
        ],
        "HTMLElement": [
            "accessKey",
            "accessKeyLabel",
            "attachInternals",
            "autocapitalize",
            "blur",
            "click",
            "contentEditable",
            "contextMenu",
            "dataset",
            "dir",
            "draggable",
            "enterKeyHint",
            "focus",
            "forceSpellCheck",
            "hidden",
            "inert",
            "innerText",
            "inputMode",
            "isContentEditable",
            "itemId",
            "itemProp",
            "itemRef",
            "itemScope",
            "itemType",
            "itemValue",
            "lang",
            "nonce",
            "offsetHeight",
            "offsetLeft",
            "offsetParent",
            "offsetTop",
            "offsetWidth",
            "oncopy",
            "oncut",
            "onpaste",
            "outerText",
            "spellcheck",
            "style",
            "title",
            "translate"
        ],
        "HTMLEmbedElement": [
            "align",
            "getSVGDocument",
            "height",
            "name",
            "src",
            "type",
            "width"
        ],
        "HTMLFieldSetElement": [
            "checkValidity",
            "disabled",
            "elements",
            "form",
            "name",
            "reportValidity",
            "setCustomValidity",
            "type",
            "validationMessage",
            "validity",
            "willValidate"
        ],
        "HTMLFontElement": [
            "color",
            "face",
            "size"
        ],
        "HTMLFormElement": [
            "acceptCharset",
            "action",
            "autocomplete",
            "checkValidity",
            "elements",
            "encoding",
            "enctype",
            "length",
            "method",
            "name",
            "noValidate",
            "reportValidity",
            "requestSubmit",
            "reset",
            "submit",
            "target"
        ],
        "HTMLFrameElement": [
            "contentDocument",
            "contentWindow",
            "frameBorder",
            "longDesc",
            "marginHeight",
            "marginWidth",
            "name",
            "noResize",
            "scrolling",
            "src"
        ],
        "HTMLFrameSetElement": [
            "cols",
            "onstorage",
            "rows"
        ],
        "HTMLHRElement": [
            "align",
            "color",
            "noShade",
            "size",
            "width"
        ],
        "HTMLHeadElement": [
            "profile"
        ],
        "HTMLHeadingElement": [
            "align"
        ],
        "HTMLHtmlElement": [
            "version"
        ],
        "HTMLIFrameElement": [
            "align",
            "allow",
            "allowPaymentRequest",
            "contentDocument",
            "contentWindow",
            "csp",
            "frameBorder",
            "getSVGDocument",
            "height",
            "loading",
            "longDesc",
            "marginHeight",
            "marginWidth",
            "name",
            "referrerPolicy",
            "sandbox",
            "scrolling",
            "src",
            "srcdoc",
            "width"
        ],
        "HTMLImageElement": [
            "Image",
            "align",
            "alt",
            "border",
            "complete",
            "crossOrigin",
            "currentSrc",
            "decode",
            "decoding",
            "height",
            "hspace",
            "isMap",
            "loading",
            "longDesc",
            "lowsrc",
            "name",
            "naturalHeight",
            "naturalWidth",
            "onerror",
            "referrerPolicy",
            "sizes",
            "src",
            "srcset",
            "useMap",
            "vspace",
            "width"
        ],
        "HTMLInputElement": [
            "accept",
            "align",
            "alt",
            "autocomplete",
            "autofocus",
            "capture",
            "checkValidity",
            "checked",
            "defaultChecked",
            "defaultValue",
            "dirName",
            "disabled",
            "files",
            "form",
            "formAction",
            "formEnctype",
            "formMethod",
            "formNoValidate",
            "formTarget",
            "height",
            "incremental",
            "indeterminate",
            "labels",
            "list",
            "max",
            "maxLength",
            "min",
            "minLength",
            "multiple",
            "name",
            "onsearch",
            "pattern",
            "placeholder",
            "readOnly",
            "reportValidity",
            "required",
            "select",
            "selectionDirection",
            "selectionEnd",
            "selectionStart",
            "setCustomValidity",
            "setRangeText",
            "setSelectionRange",
            "size",
            "src",
            "step",
            "stepDown",
            "stepUp",
            "type",
            "useMap",
            "validationMessage",
            "validity",
            "value",
            "valueAsNumber",
            "webkitEntries",
            "webkitdirectory",
            "width",
            "willValidate"
        ],
        "HTMLLIElement": [
            "type",
            "value"
        ],
        "HTMLLabelElement": [
            "control",
            "form",
            "htmlFor"
        ],
        "HTMLLegendElement": [
            "align",
            "form"
        ],
        "HTMLLinkElement": [
            "as",
            "charset",
            "crossOrigin",
            "disabled",
            "href",
            "hreflang",
            "imageSizes",
            "imageSrcset",
            "integrity",
            "media",
            "referrerPolicy",
            "rel",
            "relList",
            "rev",
            "sizes",
            "target",
            "type"
        ],
        "HTMLMapElement": [
            "areas",
            "name"
        ],
        "HTMLMarqueeElement": [
            "behavior",
            "bgColor",
            "direction",
            "height",
            "hspace",
            "loop",
            "onbounce",
            "onfinish",
            "onstart",
            "scrollAmount",
            "scrollDelay",
            "start",
            "stop",
            "trueSpeed",
            "vspace",
            "width"
        ],
        "HTMLMediaElement": [
            "autoplay",
            "canPlayType",
            "captureStream",
            "controller",
            "controls",
            "controlsList",
            "currentSrc",
            "currentTime",
            "defaultMuted",
            "defaultPlaybackRate",
            "disableRemotePlayback",
            "duration",
            "ended",
            "error",
            "fastSeek",
            "getStartDate",
            "load",
            "loop",
            "mediaKeys",
            "mozAudioCaptured",
            "mozCaptureStreamUntilEnded",
            "mozChannels",
            "mozFragmentEnd",
            "mozFrameBufferLength",
            "mozGetMetadata",
            "mozLoadFrom",
            "mozSampleRate",
            "muted",
            "networkState",
            "onencrypted",
            "onerror",
            "onmozinterruptbegin",
            "onmozinterruptend",
            "onwaitingforkey",
            "pause",
            "paused",
            "play",
            "playbackRate",
            "played",
            "preload",
            "preservesPitch",
            "readyState",
            "remote",
            "seeking",
            "setMediaKeys",
            "setSinkId",
            "sinkId",
            "src",
            "textTracks",
            "volume"
        ],
        "HTMLMenuElement": [
            "compact",
            "label",
            "type"
        ],
        "HTMLMenuItemElement": [
            "checked",
            "default",
            "disabled",
            "icon",
            "label",
            "radiogroup",
            "type"
        ],
        "HTMLMetaElement": [
            "content",
            "httpEquiv",
            "name",
            "scheme"
        ],
        "HTMLMeterElement": [
            "high",
            "labels",
            "low",
            "max",
            "min",
            "optimum",
            "value"
        ],
        "HTMLModElement": [
            "cite",
            "dateTime"
        ],
        "HTMLOListElement": [
            "compact",
            "reversed",
            "start",
            "type"
        ],
        "HTMLObjectElement": [
            "align",
            "archive",
            "border",
            "checkValidity",
            "code",
            "codeBase",
            "codeType",
            "contentDocument",
            "contentWindow",
            "data",
            "declare",
            "form",
            "getSVGDocument",
            "height",
            "hspace",
            "name",
            "reportValidity",
            "setCustomValidity",
            "standby",
            "type",
            "useMap",
            "validationMessage",
            "validity",
            "vspace",
            "width",
            "willValidate"
        ],
        "HTMLOptGroupElement": [
            "disabled",
            "label"
        ],
        "HTMLOptionElement": [
            "Option",
            "defaultSelected",
            "disabled",
            "form",
            "index",
            "selected",
            "text",
            "value"
        ],
        "HTMLOutputElement": [
            "checkValidity",
            "defaultValue",
            "form",
            "htmlFor",
            "labels",
            "name",
            "reportValidity",
            "setCustomValidity",
            "type",
            "validationMessage",
            "validity",
            "value",
            "willValidate"
        ],
        "HTMLParagraphElement": [
            "align"
        ],
        "HTMLParamElement": [
            "name",
            "type",
            "value",
            "valueType"
        ],
        "HTMLPreElement": [
            "width"
        ],
        "HTMLProgressElement": [
            "labels",
            "max",
            "position",
            "value"
        ],
        "HTMLQuoteElement": [
            "cite"
        ],
        "HTMLScriptElement": [
            "async",
            "charset",
            "crossOrigin",
            "defer",
            "htmlFor",
            "integrity",
            "noModule",
            "referrerPolicy",
            "src",
            "text",
            "type"
        ],
        "HTMLSelectElement": [
            "add",
            "autofocus",
            "blur",
            "checkValidity",
            "disabled",
            "focus",
            "form",
            "item",
            "labels",
            "length",
            "multiple",
            "name",
            "namedItem",
            "options",
            "remove",
            "reportValidity",
            "required",
            "selectedIndex",
            "selectedOptions",
            "setCustomValidity",
            "size",
            "type",
            "validationMessage",
            "validity",
            "value",
            "willValidate"
        ],
        "HTMLShadowElement": [
            "getDistributedNodes"
        ],
        "HTMLSlotElement": [
            "assignedElements",
            "assignedNodes",
            "name"
        ],
        "HTMLSourceElement": [
            "media",
            "sizes",
            "src",
            "srcset",
            "type"
        ],
        "HTMLStyleElement": [
            "disabled",
            "media",
            "sheet",
            "type"
        ],
        "HTMLTableCaptionElement": [
            "align"
        ],
        "HTMLTableCellElement": [
            "abbr",
            "align",
            "axis",
            "bgColor",
            "cellIndex",
            "ch",
            "chOff",
            "colSpan",
            "headers",
            "height",
            "noWrap",
            "rowSpan",
            "scope",
            "vAlign",
            "width"
        ],
        "HTMLTableColElement": [
            "align",
            "ch",
            "chOff",
            "span",
            "vAlign",
            "width"
        ],
        "HTMLTableElement": [
            "align",
            "bgColor",
            "border",
            "caption",
            "cellPadding",
            "cellSpacing",
            "createCaption",
            "createTBody",
            "createTFoot",
            "createTHead",
            "deleteCaption",
            "deleteRow",
            "deleteTFoot",
            "deleteTHead",
            "frame",
            "insertRow",
            "rows",
            "rules",
            "summary",
            "tBodies",
            "tFoot",
            "tHead",
            "width"
        ],
        "HTMLTableRowElement": [
            "align",
            "bgColor",
            "cells",
            "ch",
            "chOff",
            "deleteCell",
            "insertCell",
            "rowIndex",
            "sectionRowIndex",
            "vAlign"
        ],
        "HTMLTableSectionElement": [
            "align",
            "ch",
            "chOff",
            "deleteRow",
            "insertRow",
            "rows",
            "vAlign"
        ],
        "HTMLTemplateElement": [
            "content"
        ],
        "HTMLTextAreaElement": [
            "autocomplete",
            "checkValidity",
            "cols",
            "defaultValue",
            "dirName",
            "disabled",
            "form",
            "labels",
            "maxLength",
            "minLength",
            "name",
            "placeholder",
            "readOnly",
            "reportValidity",
            "required",
            "rows",
            "select",
            "selectionDirection",
            "selectionEnd",
            "selectionStart",
            "setCustomValidity",
            "setRangeText",
            "setSelectionRange",
            "textLength",
            "type",
            "validationMessage",
            "validity",
            "value",
            "willValidate",
            "wrap"
        ],
        "HTMLTitleElement": [
            "text"
        ],
        "HTMLTrackElement": [
            "default",
            "kind",
            "label",
            "readyState",
            "src",
            "srclang",
            "track"
        ],
        "HTMLUListElement": [
            "compact",
            "type"
        ],
        "HTMLVideoElement": [
            "autoPictureInPicture",
            "cancelVideoFrameCallback",
            "disablePictureInPicture",
            "getVideoPlaybackQuality",
            "height",
            "mozDecodedFrames",
            "mozFrameDelay",
            "mozHasAudio",
            "mozPaintedFrames",
            "mozParsedFrames",
            "mozPresentedFrames",
            "msIsStereo3D",
            "onenterpictureinpicture",
            "onleavepictureinpicture",
            "playsInline",
            "poster",
            "requestPictureInPicture",
            "requestVideoFrameCallback",
            "videoHeight",
            "videoWidth",
            "width"
        ]
    };
    function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
    function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance. In order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
    function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
    function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
    function elementSupportsAttribute(element, attribute) {
        var test = document.createElement(element);
        var exist = (attribute in test);
        var ret = [exist];
        ret.push(exist ? typeof test[attribute] === 'function' : false);
        return ret;
    }
    var Element2Name = new Map();
    Element2Name.set('HTMLAnchorElement', "a");
    Element2Name.set('HTMLAreaElement', "area");
    Element2Name.set('HTMLAudioElement', 'audio');
    Element2Name.set('HTMLBRElement', 'br');
    Element2Name.set('HTMLBaseElement', 'base');
    Element2Name.set('HTMLBaseFontElement', 'basefont');
    Element2Name.set('HTMLBodyElement', 'body');
    Element2Name.set('HTMLButtonElement', 'button');
    Element2Name.set('HTMLCanvasElement', 'canvas');
    Element2Name.set('HTMLContentElement', 'content');
    Element2Name.set('HTMLDListElement', 'dl');
    Element2Name.set('HTMLDataElement', 'data');
    Element2Name.set('HTMLDataListElement', 'datalist');
    Element2Name.set('HTMLDetailsElement', 'details');
    Element2Name.set('HTMLDialogElement', 'dialog');
    Element2Name.set('HTMLDirectoryElement', 'dir');
    Element2Name.set('HTMLDivElement', 'div');
    Element2Name.set('HTMLEmbedElement', 'embed');
    Element2Name.set('HTMLFieldSetElement', 'fieldset');
    Element2Name.set('HTMLFontElement', 'font');
    Element2Name.set('HTMLFormElement', 'form');
    Element2Name.set('HTMLFrameSetElement', 'frameset');
    Element2Name.set('HTMLHRElement', 'hr');
    Element2Name.set('HTMLHeadElement', 'head');
    Element2Name.set('HTMLHtmlElement', 'html');
    Element2Name.set('HTMLIFrameElement', 'iframe');
    Element2Name.set('HTMLImageElement', 'img');
    Element2Name.set('HTMLInputElement', 'input');
    Element2Name.set('HTMLLIElement', 'li');
    Element2Name.set('HTMLLabelElement', 'label');
    Element2Name.set('HTMLLegendElement', 'legend');
    Element2Name.set('HTMLLinkElement', 'link');
    Element2Name.set('HTMLMapElement', 'map');
    Element2Name.set('HTMLMarqueeElement', 'marquee');
    Element2Name.set('HTMLMediaElement', 'video');
    Element2Name.set('HTMLMenuElement', 'menu');
    Element2Name.set('HTMLMenuItemElement', 'menuitem');
    Element2Name.set('HTMLMetaElement', 'meta');
    Element2Name.set('HTMLMeterElement', 'meter');
    Element2Name.set('HTMLOListElement', 'ol');
    Element2Name.set('HTMLObjectElement', 'object');
    Element2Name.set('HTMLOptGroupElement', 'optgroup');
    Element2Name.set('HTMLOptionElement', 'option');
    Element2Name.set('HTMLOutputElement', 'output');
    Element2Name.set('HTMLParagraphElement', 'p');
    Element2Name.set('HTMLParamElement', 'param');
    Element2Name.set('HTMLPictureElement', 'picture');
    Element2Name.set('HTMLPreElement', 'pre');
    Element2Name.set('HTMLScriptElement', 'script');
    Element2Name.set('HTMLSelectElement', 'select');
    Element2Name.set('HTMLShadowElement', 'shadow');
    Element2Name.set('HTMLSlotElement', 'slot');
    Element2Name.set('HTMLSourceElement', 'source');
    Element2Name.set('HTMLSpanElement', 'span');
    Element2Name.set('HTMLStyleElement', 'style');
    Element2Name.set('HTMLTableCaptionElement', 'caption');
    Element2Name.set('HTMLTableCellElement', 'th');
    Element2Name.set('HTMLTableColElement', 'col');
    Element2Name.set('HTMLTableElement', 'table');
    Element2Name.set('HTMLTableRowElement', 'tr');
    Element2Name.set('HTMLTableSectionElement', 'tbody');
    Element2Name.set('HTMLTemplateElement', 'template');
    Element2Name.set('HTMLTextAreaElement', 'textarea');
    Element2Name.set('HTMLTimeElement', 'time');
    Element2Name.set('HTMLTrackElement', 'track');
    Element2Name.set('HTMLUListElement', 'ul');
    Element2Name.set('HTMLVideoElement', 'video');
    Element2Name.set('HTMLElement', 'html');
    Element2Name.set('HTMLModElement', 'del');
    Element2Name.set('HTMLFrameElement', 'frame');
    Element2Name.set('HTMLProgressElement', 'progress');
    Element2Name.set('HTMLTitleElement', 'title');
    Element2Name.set('HTMLHeadingElement', 'h1');
    Element2Name.set('HTMLQuoteElement', 'q');
    var elementObject = DOMList;
    var elementWithoutFunc = {};
    for (var element in elementObject) {
        var elementName = Element2Name.get(element);
        var properties = elementObject[element];
        for (var name in properties) {
            var _elementSupportsAttri = elementSupportsAttribute(elementName, properties[name]);
            var _elementSupportsAttri2 = _slicedToArray(_elementSupportsAttri, 2);
            exist = _elementSupportsAttri2[0];
            func = _elementSupportsAttri2[1];
            var ElementProp = "".concat(element, ".").concat(properties[name]);
            elementWithoutFunc[ElementProp] = exist;
        }
    }
    return JSON.stringify(elementWithoutFunc);
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
    // fingerprint["mediaCapabilities[in progress]"] = await getMediaCapabilities();
    fingerprint["mediaDevices"] = await getMediaDevices();
    fingerprint["supportedMediaConstraints"] = getSupportedMediaConstraints();

    // HID devices [new]
    // fingerprint["hidDevices"] = await getHidDevices();

    // Speech [new]
    fingerprint["speechVoices"] = await getSpeechVoices();

    // Canvas
    fingerprint["canvas"] = getCanvas();

    // DOM
    fingerprint["DOM"] = getSupportedDOMAttributes();

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
