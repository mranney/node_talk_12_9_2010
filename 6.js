// Sorry, still seems like a toy

var http = require("http"),
    fs = require("fs"),
    server, stdin, waiters = [], favicon;

favicon = fs.readFileSync("favicon.ico");

stdin = process.openStdin();

stdin.on("data", function (chunk) {
    waiters.forEach(function (waiter) {
        waiter.end(chunk);
    });
    console.log("Sent to " + waiters.length + " clients");
    waiters = [];
});

server = http.createServer(function (request, response) {
    if (request.url === "/favicon.ico") {
        response.writeHead(200, {
            "Content-Type": "image/x-icon",
            "Server": __filename
        });
        response.end(favicon);
    } else {
        response.writeHead(200, {
            "Content-Type": "text/plain",
            "Server": __filename
        });
        response.write("Waiting for data...\n");
        waiters.push(response);
        console.log(waiters.length + " clients waiting");
    }
});

server.listen(4000);
