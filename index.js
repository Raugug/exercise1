var express = require('express');
const bodyParser = require('body-parser');
var axios = require('axios')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/message', (req, res, next)=> {
  axios.get('http://messageapp:3000/message')
  .then(response => {
    console.log("GET OK", response.data);
    res.status(200).json({
      status: "OK",
      response: response.data
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({status: "SERVER GET ERROR"})
  })
})

app.post('/message', (req,res, next) => {
  let destination = req.body.destination;
  let body = req.body.body;
  axios.post('http://messageapp:3000/message', {destination, body})
  .then(response => {
    console.log("POST OK", response.data);
    res.status(200).json({
      status: "OK",
      response: response.data
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({status: "SERVER POST ERROR"})
  })

})

app.listen(9001, function () {
  console.log('Example app listening on port 9001!');
});