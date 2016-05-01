import fs from 'fs';
import path from 'path';
import multer from 'multer';
import imageMagick from 'imagemagick-native';

import { prepareGrid } from './utils/grid';
import { getPixelsFromImage } from './utils/image';
import ws from './websocket-client';


const upload = multer({ dest: 'uploads/' });
// const imageMagick = gm.subClass({ imageMagick: true });

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

    fs.writeFileSync(pathToNewFile, imageMagick.convert({
      srcData: fs.readFileSync(req.file.path),
      width: 32,
      height: 16,
      format: 'PNG'
    }));

    const pixels = imageMagick.getConstPixels({
      srcData: fs.readFileSync(pathToNewFile),
      x: 0,
      y: 0,
      columns: 32,
      rows: 16
    });

    return res.json({ done: true, pixels})
  });
}
