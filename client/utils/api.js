// There are really only two necessary API endpoints:
//   - submit a photo for processing
//   - submit a pixel matrix for display
const noop = () => {};

export async function submitPixelMatrix(cells, callback = noop) {
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

export async function submitFileForProcessing(formData, callback = noop) {
  try {
    const url = '/process-upload';

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })

    const json = await response.json();

    return callback(json);
  } catch (err) {
    console.error("Oh no!", err)
  }
}
