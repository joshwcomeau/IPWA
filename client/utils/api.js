// There are really only two necessary API endpoints:
//   - submit a photo for processing
//   - submit a pixel matrix for display

export async function submitPixelMatrix(cells, callback) {
  try {
    const url = '/pixel-matrix';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cells})
    })

    return callback(response);
  } catch (err) {
    console.error("Oh no!", err)
  }
}
