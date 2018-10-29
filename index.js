var express = require('express');
const bodyParser = require('body-parser');
var axios = require('axios')
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((err, req, res, next) =>{
  
  if (err instanceof SyntaxError) {
    res.status(400).json({status: "INVALID JSON FORMAT"})
  } else {
    next();
  }

})


app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.post('/message', (req,res, next) => {

  
  const {destination, body} = req.body
  if(!destination || !body) {
    console.log("body or destination not provided")
    res.status(400).json({status: "body or destination not provided"})
    return;
  }
  if (typeof destination !== "string" || typeof body !== "string"){
      console.log("incorrect type of parameters")
    res.status(400).json({status: "body and destination must be strings"})
    return;
  }
  if (destination.length == 0 || body.length == 0) {
    console.log("fields must be filled")
    res.status(400).json({status: "all fields must be filled"})
    return;
  }


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
    res.status(500).json({status: "SERVER ERROR: EXTERNAL SERVICE DIDN'T RESPONSE"})
  })

})

app.listen(9001, function () {
  console.log('Example app listening on port 9001!');
});