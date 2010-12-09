// Serving files from disk with proper backpressure

var http = require("http"),
    fs = require("fs"),
    util = require("util"),
    server, favicon;

favicon = fs.readFileSync("favicon.ico");

server = http.createServer(function (request, response) {
    if (request.url === "/favicon.ico") {
        response.writeHead(200, {
            "Content-Type": "image/x-icon",
            "Server": __filename
        });
        response.end(favicon);
    } else {
        response.writeHead(200, {
            "Content-Type": "image/jpeg",
            "Server": __filename
        });

        fs.createReadStream("anchor.jpg").pipe(response);
    }
});

server.listen(4000);
