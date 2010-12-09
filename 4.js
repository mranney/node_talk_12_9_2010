// node also has good support for HTTP

var http = require("http"), server;

server = http.createServer(function (request, response) {
    var message = "Request from " + request.connection.remoteAddress + " for " + request.url + " " +
        (request.headers["user-agent"] || "");

    response.writeHead(200, {
        "Content-Type": "text/plain",
        "Server": __filename
    });
    response.write(message);
    response.end();

    console.log(message);
});

server.listen(8000);
