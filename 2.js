// you probably already know how to make web pages

var timer = setTimeout(function () {
    console.log("Timeout.");
}, 2000);

cancel_button.addEventListener("click", function (evt) {
    console.log("You clicked.");
    clearTimeout(timer);
}, false);
