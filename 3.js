// node wires a JS event loop together with Unix I/O

var start = Date.now(), timer, stdin;

timer = setTimeout(function () {
    console.log("Timeout.");
    stdin.destroy();
}, 2000);

var stdin = process.openStdin();

stdin.on("data", function (buffer) {
    console.log((Date.now() - start) + "ms elapsed");
});

stdin.on("end", function () {
    console.log("Timer canceled");
    clearTimeout(timer);
    stdin.destroy();
});
