var express = require('express');
var serveStatic = require('serve-static');
var cors = require('cors')
var bodyParser = require('body-parser');
const axios = require('axios');

app = express();
app.use(serveStatic(__dirname + "/dist"));

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));



var port = process.env.PORT || 8080;

app.listen(port);

// Search Anime
app.get('/anime/:name', cors(), function (req, res, next) {


  axios.get(`https://masterani.me/api/anime/search?search=${req.params.name}/detailed`).then(result => {
    res.json(result.data);
    // console.log(result.data);
  }).catch(error => {
    res.send(error);
  })
})

// Trending
app.get('/trending', cors(), async function (req, res, next) {
  axios.get('https://masterani.me/api/anime/trending').then(result => {
    res.json(result.data);
  }).catch(error => {
    res.send(error);
  })
})

// Recent
app.get('/recent', cors(), async function (req, res, next) {
  axios.get('https://masterani.me/api/releases').then(result => {
    res.json(result.data);
  }).catch(error => {
    res.send(error);
  })
})

// Watch
app.get('/anime/watch/:name/:episode', cors(), function (req, res, next) {
  axios.get('https://www.masterani.me/anime/watch/' + req.params.name + '/' + req.params.episode).then(result => {
    res.json(result.data);
  }).catch(error => {
    res.json(error);
  })

})

console.log('Listening on port' + port);
