export const wrapWithPromise = wrappedFunction => (...args) => (
  new Promise((resolve, reject) => {
    wrappedFunction(...args, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  })
);
