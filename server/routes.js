import path from 'path';

export default function(app) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });

  app.post('/pixel-matrix', ({body}, res) => {
    console.log("RECEIVEWD", body)
    return res.json({ ok: true });
  });
}
