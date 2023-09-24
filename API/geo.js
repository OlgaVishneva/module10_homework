const wsUri = "wss://echo-ws-service.herokuapp.com";

const inputMessage = document.querySelector('.chat__chatInputLine');
const sendButton = document.querySelector('.chat__chatInputSend');
const geoButton = document.querySelector('.chat__chatInputGeo');
const chatOutput = document.querySelector('.chat__main');

let websocket = new WebSocket(wsUri);

let messageFineOrFale = document.createElement('div');

websocket.onopen = () => {
  messageFineOrFale.className = 'connection';
  messageFineOrFale.innerHTML = 'Соединение установлено';
  chatchat.before(messageFineOrFale);
}

websocket.onmessage = (event) => {
  writeToChat(event.data, true);
}

websocket.onclose = () => {
  messageFineOrFale.innerHTML = 'При передаче данных произошла ошибка';
  chatchat.before(messageFineOrFale);
}

function writeToChat(message, isRecieved) {
  let messageHTML = `<div class="${isRecieved ? "recieved" : "sent"}">${message}</div>`;
  chatOutput.innerHTML += messageHTML;
}

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  if (!inputMessage.value) return;
  websocket.send(inputMessage.value);
  writeToChat(inputMessage.value, false);
  inputMessage.value === "";
}

const geoError = () => {
  chatOutput.textContent = ('Невозможно получить ваше местоположение');
}

const geoSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  let mapLink = document.createElement('a');
  mapLink.href = `https://www.openstreetmap.org/#map=15/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
  mapLink.className = "chat__sender";
  const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com/');
  websocket.onopen = () => websocket.send(`Ширина: ${latitude}; Долгота ${longitude}`);
  websocket.onmessage = () => websocket.close();
  chatOutput.appendChild(mapLink);
  chatOutput.scrollTop = 9999;
}

geoButton.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
});