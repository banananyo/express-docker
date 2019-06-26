const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()

const userIds = [{
    name: 'baze',
    id: 'Ub450587db45f134affa1fb3e2a7eb71f',
  }];

const groupIds = [{
    name: 'botGroup',
    id: 'C7435989b0db3c18a99ab2c5722d5df40',
  }];


app.use(bodyParser.json())

const TOKEN = 'L+XlfDF+f2WQ+UrLEw1bfY5w1K5wly/29W4yb57PQ8aAgSq3ammc3bT4dRf7dDxg6XyjmNQIqZFQcWKoXwWzxM4BvgsMnvjimq1STYO016nBhxJ9uRGjFL7CkyjDmt5p/3ZXWBBhhz9PQKRQ9xQfAQdB04t89/1O/w1cDnyilFU=';
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TOKEN}`
};

app.post('/lineBot', async (req, res, next) => {
  const source = req.body.events[0].source;
  const message = req.body.events[0].message;
  console.log({ source });
  console.log({ message });
  if (message.type !== 'text') {
    return;
  }
  // reply(req.body);
  if (source.type === 'group' && source.groupId === groupIds[0].id ) {
    push(userIds[0].id, message.text, false)
  } else if (source.type === 'user' && source.userId === userIds[0].id ) {
    push(groupIds[0].id, message.text, false)
  }
  res.status(200).send('It works!');
})

const push = (to, messages, notificationDisabled) => {
  const body = JSON.stringify({
    to,
    messages,
    notificationDisabled,
  });
  axios.post(`${LINE_MESSAGING_API}/push`, body, {
    headers: LINE_HEADER,
  })
  .then(function (response) {
    // console.log(response);
  })
  .catch(function (error) {
    // console.log(error);
  });
}

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
    // console.log(response);
  })
  .catch(function (error) {
    // console.log(error);
  });

};

app.get('/', async (req, res, next) => {
  res.status(200).send('Get Line Bot')
})
app.post('/post', async (req, res, next) => {
  res.status(200).send('Post Line Bot')
})

app.listen(3000, () => console.log('Server is running on port 80'))
