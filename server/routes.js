import fs from 'fs';
import path from 'path';
import multer from 'multer';
import gm from 'gm';

import { prepareGrid } from './utils/grid';
import { getPixelsFromImage } from './utils/image';
import ws from './websocket-client';


const upload = multer({ dest: 'uploads/' });
const imageMagick = gm.subClass({ imageMagick: true });

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
    console.log("Received image", req.file);

    // Get the filename without extension.
    // Inaccurate if the filename has multiple dots, but that's fine.
    const [filename] = req.file.originalname.split('.');
    const pathToNewFile = path.join(__dirname, `/uploads/${Date.now()}_${filename}.ppm`);

    console.log(__dirname)

    gm(req.file.path)
      .resize(32, 16, '!')
      .setFormat('ppm')
      .write(pathToNewFile, err => {
        if (err) console.error("Ack, process failed\n", err);
        res.json({ done: true, err })
      });
  });
}
