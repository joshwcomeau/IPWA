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
    const readFilePromise = wrapWithPromise(fs.readFile);
    const writeFilePromise = wrapWithPromise(fs.writeFile);
    const imConvertPromise = wrapWithPromise(imageMagick.convert);

    // These helper methods aren't as necessary anymore, but they still
    // provide semantic value that makes the route easier to follow.
    const resizeAndConvert = buffer => (
      imConvertPromise({
        srcData: buffer,
        width: 32,
        height: 16,
        format: 'PNG'
      })
    );

    const readPixelsFromImage = buffer => (
      imageMagick.getConstPixels({
        srcData: buffer,
        x: 0,
        y: 0,
        columns: 32,
        rows: 16
      })
    );

    // Our saveToDisk method is now much more intuitive; no hidden complexity!
    const saveToDisk = (file, buffer) => (
      writeFilePromise(getPathForNewFile(file), buffer)
    );

    // Because this is native javascript, native constructs like try/catch,
    // `if` statements, and loops can be used!
    try {
      // The `await` keyword instructs the engine to wait, in a non-blocking
      // way, for the function to return before continuing.
      const originalFileBuffer = await readFilePromise(req.file.path);
      const smallFileBuffer = await resizeAndConvert(originalFileBuffer);

      await saveToDisk(req.file, smallFileBuffer);

      const pixels = readPixelsFromImage(smallFileBuffer);

      // TEMP: Send to Pi as well
      const grid = prepareGridForPi(pixels);
      ws.send(JSON.stringify(grid));

      return res.json({ done: true, pixels });

    } catch (err) {
      throw err;
    }
  });
}
