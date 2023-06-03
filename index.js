const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3030;
const staticResponse = require('./response.json');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const trackingmoreUrl = 'https://api.trackingmore.com/v3/trackings/realtime';

const correiosUrl = `https://proxyapp.correios.com.br`;

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.get('/api/correios/:trackingId', function (req, res) {
  res.json(staticResponse);
});

// app.get('/api/correios/:trackingId', async function (req, res) {
//   const trackingUrl = `${correiosUrl}/v1/sro-rastro/${req.params.trackingId}`;

//   try {
//     let response = await fetch(trackingUrl);
//     const jsonData = await response.json();

//     // "/public-resources/img/smile.png" -> "https://proxyapp.correios.com.br/v1/sro-rastro/public-resources/img/smile.png"
//     jsonData.objetos[0].eventos = jsonData.objetos[0].eventos.map((evento) => {
//       evento.urlIcone = `${correiosUrl}${evento.urlIcone}`;

//       return evento;
//     });

//     res.status(200).json(jsonData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: `Internal Server Error.` });
//   }
// });

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
    let response = await fetch(trackingmoreUrl, options);
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
