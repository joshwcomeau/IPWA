// Set up our websocket client
// TODO: Move this to its own module
import WebSocket from 'ws';
const ws = new WebSocket('ws://192.168.1.115:1337');

export default ws;
