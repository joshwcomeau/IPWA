import fs from 'fs';
import path from 'path';
import multer from 'multer';

import { prepareGrid } from './utils/grid';
import ws from './websocket-client';


const upload = multer({ dest: 'uploads/' });

export default function(app) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });

  app.post('/pixel-matrix', ({body}, res) => {
    const grid = prepareGrid(body.cells);
    ws.send(JSON.stringify(grid));
    res.json({ ok: true })
  });

  app.post('/process-upload', upload.single('image'), (req, res) => {
    console.log("Received image", req.file)

    res.json({ upload: true })
  });
}
