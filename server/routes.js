import path from 'path';
import multer from 'multer';
import imageMagick from 'imagemagick-native';

import { prepareGrid } from './utils/grid';
import { getPathForNewFile } from './utils/file';
import { getPixelsFromImage } from './utils/image';
import {
  readFilePromise,
  writeFilePromise,
  imageMagickConvertPromise
} from './utils/general';

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
    res.json({ ok: true });
  });

  app.post('/process-upload', upload.single('image'), async (req, res) => {
    let pixels;

    try {
      const originalFileBuffer = await readFilePromise(req.file.path);
      const smallFileBuffer = await imageMagickConvertPromise({
        srcData: originalFileBuffer,
        width: 32,
        height: 16,
        format: 'PNG'
      });

      pixels = imageMagick.getConstPixels({
        srcData: smallFileBuffer,
        x: 0,
        y: 0,
        columns: 32,
        rows: 16
      });

      await writeFilePromise(getPathForNewFile(req.file), smallFileBuffer);

    } catch (err) {
      throw err;
    }

    res.json({ done: true, pixels })
  });
}
