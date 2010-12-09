var log,
    socket = new WebSocket("ws://" + window.location.host),
    presence = {};

function logger(text) {
    console.log(text);
    log.innerText += text + "\n";
}

function init() {
    log = document.getElementById("log");

    logger("Starting up");
    
    var input = document.getElementById("input_elem");
    input.addEventListener("keyup", function (evt) {
        socket.send(JSON.stringify({
            op: "partial",
            text: input.value
        }));
    }, false);
    
    input.addEventListener("change", function (evt) {
        socket.send(JSON.stringify({
            op: "text message",
            text: input.value
        }));
        input.value = "";
    }, false);
}

socket.addEventListener('open', function (event) {
    logger("WebSocket connected");
});

socket.addEventListener('message', function (event) {
    var obj = JSON.parse(event.data);
    
    if (obj.op === "connected") {
        presence[obj.id] = "";
        update_presence();
    } else if (obj.op === "disconnected") {
        delete presence[obj.id];
        update_presence();
    } else if (obj.op === "partial") {
        presence[obj.id] = obj.text;
        update_partial(obj.id);
    } else if (obj.op === "text message") {
        presence[obj.id] = "";
        document.getElementById("output").innerHTML += obj.id + ": " + obj.text + "<br />";
        update_presence();
    } else {
        logger("Unknown op: " + event.data);
    }
});

socket.addEventListener('close', function (event) {
    logger("WebSocket closed");
});

socket.addEventListener('error', function (event) {
    logger("WebSocket error");
});

function update_partial(id) {
    var elem = document.getElementById(id);
    
    elem.innerHTML = presence[id];
}

function update_presence() {
    var elem = document.getElementById("presence"), body = "";
    
    Object.keys(presence).sort().forEach(function (item) {
        body += '<div class="presence_item"><span>' + item + '</span><span class="partial" id="' + item + '">' + presence[item] + '</span></div>';
    });
    
    elem.innerHTML = body;
}

window.addEventListener("load", init, false);
