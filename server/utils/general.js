import fs from 'fs';
import imageMagick from 'imagemagick-native';

export function wrapWithPromise(wrappedFunction, ...args) {
  return new Promise((resolve, reject) => {
    wrappedFunction(...args, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

export const readFilePromise = wrapWithPromise.bind(null, fs.readFile);
export const writeFilePromise = wrapWithPromise.bind(null, fs.writeFile);
export const imageMagickConvertPromise = wrapWithPromise.bind(null, imageMagick.convert);
