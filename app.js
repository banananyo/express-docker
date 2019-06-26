const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()

app.use(bodyParser.json())

const TOKEN = 'L+XlfDF+f2WQ+UrLEw1bfY5w1K5wly/29W4yb57PQ8aAgSq3ammc3bT4dRf7dDxg6XyjmNQIqZFQcWKoXwWzxM4BvgsMnvjimq1STYO016nBhxJ9uRGjFL7CkyjDmt5p/3ZXWBBhhz9PQKRQ9xQfAQdB04t89/1O/w1cDnyilFU=';
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TOKEN}`
};

app.post('/lineBot', async (req, res, next) => {
  console.log({ event: req.body.events[0] });
  console.log({ message: req.body.events[0].message });
  if (req.body.events[0].message.type !== 'text') {
    return;
  }
  reply(req.body);
  res.status(200).send('It works!');
})

const reply = (bodyResponse) => {
  const body = JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: `text`,
          text: bodyResponse.events[0].message.text
        }
    ]
    });

  axios.post(`${LINE_MESSAGING_API}/reply`, body, {
    headers: LINE_HEADER,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

};

app.get('/', async (req, res, next) => {
  res.status(200).send('Get Line Bot')
})
app.post('/post', async (req, res, next) => {
  res.status(200).send('Post Line Bot')
})
// app.get('/', async (req, res, next) => {
//   console.log({ auth: req.header('authorization') })
//   res.set('token', 'test');
//   res.status(200).send('Hello Express')
// })
// app.get('/request', async (req, res, next) => {
//   http.get({
//     hostname: 'localhost',
//     port: 3000,
//     path: '/',
//     agent: false,  
//     headers: {
//       'authorization': 'Bearer test',
//     }
//   }, (response) => {

//     res.status(200).send(response.headers.token);
//   });
// })

app.listen(3000, () => console.log('Server is running on port 80'))
