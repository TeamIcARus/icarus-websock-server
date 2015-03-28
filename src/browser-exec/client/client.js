window.onload = function() {
    socket = new WebSocket("ws://192.168.12.50:10080");
    socket.onmessage = function(event) {
	document.getElementById('news').innerHTML = event.data;
    }
}
