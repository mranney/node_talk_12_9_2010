// OK, so what?

var http = require("http"), server, stdin, waiters = [];

stdin = process.openStdin();

stdin.on("data", function (chunk) {
    waiters.forEach(function (waiter) {
        waiter.end(chunk);
    });
    console.log("Sent to " + waiters.length + " clients");
    waiters = [];
});

server = http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain",
        "Server": __filename
    });
    response.write("Waiting for data...\n");
    waiters.push(response);
    console.log(waiters.length + " clients waiting");
});

server.listen(8000);
