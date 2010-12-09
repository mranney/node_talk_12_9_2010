// Talking to Redis from node

var redis = require("redis"),
    client = redis.createClient(), start;
    
client.set("some key", "A value with Unicode: ☕");
client.get("some key", function (err, res) {
    console.log((Date.now() - start) + "ms: " + res);
});

client.hmset("hash key", "prop1", "val1", "prop2", "val2");
client.hgetall("hash key", function (err, res) {
    console.log((Date.now() - start) + "ms: " + JSON.stringify(res));
});

start = Date.now();
