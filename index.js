const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const apiUrl = 'https://api.trackingmore.com/v3/trackings/realtime';

app.use(cors());

app.use(express.json());

app.post(`/api/track`, async function (req, res) {

  console.log(req.body, typeof req.body);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Tracking-Api-Key': 'me9c1eqr-0ua9-bukf-i3vy-p4zisjovxcye',
    },
    body: JSON.stringify(req.body)
  };

  try {
    let response = await fetch(apiUrl, options);
    response = await response.json();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});