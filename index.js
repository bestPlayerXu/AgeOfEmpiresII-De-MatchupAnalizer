const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/test.html');
});

app.get('/vpn', async (req, res) => {
  var resp = await fetch(decodeURIComponent(req.query.url));
  var text = await resp.text()
  res.send(text);
});

app.get('/img/**', (req, res) => {
  res.sendFile(__dirname + '/icons/' + req.path.split('/').reverse()[0]);
});

app.get('/script.js', (req, res) => {
  res.write(
    (
      fs.readdirSync('./Model').map(f => fs.readFileSync('./Model/' + f)).join('\n\n\n')
    + '\n\n\n'
    + fs.readFileSync(__dirname + '/client.js')
    )//.replace(/  /g, '')
  );
  res.end();
});

app.listen(3000, () => {});