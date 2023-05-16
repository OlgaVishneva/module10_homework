const wsUri = 'wss://echo-ws-service.herokuapp.com';

const sendButton = document.querySelector('.btn-send');
const geolocationButton = document.querySelector('.btn-geo');

let websocket;

websocket = new WebSocket(wsUri);
websocket.onopen = function (evt) { };

function writeToScreen(message) {
   let pre = document.createElement("p");
   pre.style.wordWrap = "break-word";
   pre.innerHTML = message;
   output.appendChild(pre);
}

sendButton.addEventListener('click', () => {
   const input = document.getElementById('input').value;
   const message = input;
   writeToScreen("Отправитель: " + message);
   websocket.send(message);

   websocket.onmessage = function (evt) {
      writeToScreen(
         '<span>Сервер: ' + evt.data + '</span>'
      );
   };
   websocket.onerror = function (evt) {
      writeToScreen(
         '<span style="color: red;">ERROR:</span> ' + evt.data
      );
   };
});

geolocationButton.addEventListener('click', () => {
   let position = navigator.geolocation.getCurrentPosition((position) => {
      writeToScreen(
         `<a href="https://www.openstreetmap.org/#map=9/${position.coords.latitude}/${position.coords.longitude}">geolocation</a>`
      );
      websocket.send = function (position) { };
   })
})
