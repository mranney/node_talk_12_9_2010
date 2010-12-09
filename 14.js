// Using Redis for stats and logging

var http = require("http"),
    fs = require("fs"),
    util = require("util"),
    redis = require("redis"), client,
    server, favicon, start = Date.now();

favicon = fs.readFileSync("favicon.ico");

client = redis.createClient();

server = http.createServer(function (request, response) {
    client.hincrby("url", request.url, 1);
    client.hincrby("ip", request.connection.remoteAddress, 1);
    client.publish("log", (Date.now() - start) + ", " + request.connection.remoteAddress + " " + request.url + " " +
        (request.headers["user-agent"] || ""));

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
