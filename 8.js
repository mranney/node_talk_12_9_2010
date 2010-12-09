// Lots of sockets is fine

var http = require("http"),
    fs = require("fs"),
    util = require("util"),
    favicon, count = 2000;

favicon = fs.readFileSync("favicon.ico");

function new_client(request, response) {
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
}

while (count >= 0) {
    http.createServer(new_client).listen(count + 2000);
    count--;
}
