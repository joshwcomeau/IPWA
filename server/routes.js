import path from 'path';
import { prepareGrid } from './utils/grid';

// Set up our websocket client
// TODO: Move this to its own module
import WebSocket from 'ws';
const ws = new WebSocket('ws://192.168.1.115:1337');

export default function(app) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });

  app.post('/pixel-matrix', ({body}, res) => {
    const grid = prepareGrid(body.cells);
    ws.send(JSON.stringify(grid));
    res.json({ ok: true })
  });
}
