const ws = new WebSocket("ws://localhost:6789");

ws.onopen = () => {
    console.log("Connected to the WebSocket server");

    const PeopleID = JSON.parse(localStorage.getItem('login'))[0].people_id;
    sendMessage({ type: 'init', sender: PeopleID })
};

// ws.onmessage = (event) => {
//     console.warn("14 event data", event.data)
// };

export function sendMessage(data) {

    ws.send(JSON.stringify(data));
}

var connections = [];

var peerConnection,configuration;

function addMessageToChat(fromType, idx, msg) {
    // const sender = getSenderName(fromType, idx)
    // chatelement = document.getElementById('chatHistory');
    // newchatentry = document.createElement("p");
    // newchatentry.textContent = `${sender}: ${msg}`
    // chatelement.appendChild(newchatentry);
    // chatelement.scrollTop = chatelement.scrollHeight
  }

export function createPeerConnection(lasticecandidate) {
  configuration = { iceServers: [{ urls: "stun:stun.voipbuster.com" }] };

  try {
    peerConnection = new RTCPeerConnection(configuration);
  } catch (err) {
    addMessageToChat("", undefined, 'error: ' + err);
  }
  peerConnection.onicecandidate = (event) => {
    console.log("event", event)
    if (event.candidate != null) {
      console.log('new ice candidate');
    } else {
      console.log('all ice candidates');
      lasticecandidate();
    }
  };
  peerConnection.onconnectionstatechange = (event) => {
    console.log('handleconnectionstatechange', event);
  };
  peerConnection.oniceconnectionstatechange = (event) => {
    console.log('ice connection state: ' + event.target.iceConnectionState);
  };

  return peerConnection;
}


export default ws
