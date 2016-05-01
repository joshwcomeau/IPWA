import fs from 'fs';
import path from 'path';
import multer from 'multer';
import imageMagick from 'imagemagick-native';

import { getPathForNewFile } from './utils/file';
import { wrapWithPromise } from './utils/general';
import { prepareGridForPi, readPixelsFromBuffer } from './utils/grid';

import ws from './websocket-client';


const upload = multer({ dest: 'uploads/' });

export default function(app) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });

  app.post('/pixel-matrix', ({body}, res) => {
    const grid = prepareGridForPi(body.cells);
    ws.send(JSON.stringify(grid));
    res.json({ ok: true });
  });

  app.post('/process-upload', upload.single('image'), async (req, res) => {
    let pixels;

    // Convert callback-based modules to promises
    const readFilePromise = wrapWithPromise(fs.readFile);
    const writeFilePromise = wrapWithPromise(fs.writeFile);
    const imageMagickConvertPromise = wrapWithPromise(imageMagick.convert);

    try {
      const originalFileBuffer = await readFilePromise(req.file.path);
      const smallFileBuffer = await imageMagickConvertPromise({
        srcData: originalFileBuffer, width: 32, height: 16, format: 'PNG'
      });

      pixels = readPixelsFromBuffer(smallFileBuffer)

      await writeFilePromise(getPathForNewFile(req.file), smallFileBuffer);

      // TEMP: Send to Pi as well
      const grid = prepareGridForPi(pixels);
      ws.send(JSON.stringify(grid));

    } catch (err) {
      throw err;
    }

    res.json({ done: true, pixels })
  });
}
