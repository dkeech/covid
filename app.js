var express = require('express');
var app = express();
app.set("view engine", "ejs");
var request = require('request');
var fetch = require('node-fetch');
const port = 3000;

app.use('/', require('./search.js'));

app.get('/world', function(req, res){
  var opt = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/totals',
      qs: {format: 'json'},
      headers: {
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      'x-rapidapi-key': '30ef392908msh97f5ff2d2c2cff6p17720fjsna774f4b7a2ba',
      useQueryString: true
      }
  };
  
  request(opt, function (error, response, body) {
      if(!error && response.statusCode == 200){
      let data = JSON.parse(body);
      res.render('world', 
      {   data: data, 
          country: data[0]['country'], 
          confirmed: formatNumber(data[0]['confirmed']),
          recovered: formatNumber(data[0]['recovered']),
          critical: formatNumber(data[0]['critical']),
          deaths: formatNumber(data[0]['deaths']),
          lastUpdate: data[0]['lastUpdate'] ? data[0]['lastUpdate'].slice(0,10) : ''})
      } else {
      if(error) throw new Error(error);
      }
  });
}
)

app.get('/country', function(req, res){
  var options = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/country',
    qs: {format: 'json', name: req.query.country},
    headers: {
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      'x-rapidapi-key': '30ef392908msh97f5ff2d2c2cff6p17720fjsna774f4b7a2ba',
      useQueryString: true
    }
  };
  
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200){
          let data = JSON.parse(body);

          res.render('country', 
          {   data: data, 
              country: data[0]['country'], 
              confirmed: formatNumber(data[0]['confirmed']),
              recovered: formatNumber(data[0]['recovered']),
              critical: formatNumber(data[0]['critical']),
              deaths: formatNumber(data[0]['deaths']),
              lastUpdate: data[0]['lastUpdate'] ? data[0]['lastUpdate'].slice(0,10) : ''})
      } else {
        if (error) throw new Error(error);

      };
      });
})

app.get('/state', function(req, res){
  
  var state = req.query.state;
  var data;
  fetch(`https://api.covidtracking.com/v1/states/${state}/current.json`)
  .then(response => response.json() )
  .then(json => data = json)
  .then(data => res.render('state', {data: data,
                       state: formatNumber(data['state']),
                       deaths: formatNumber(data['death']),
                       positive: formatNumber(data['positive']),
                       negative: formatNumber(data['negative']),
                       total: formatNumber(data['total']),
                       date: formatNumber(data['date'])}))

  .catch(err => {
    console.log(err);
  });
  
  
})

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

app.listen(port, process.env.IP, function(){
  console.log("COVID app has started on port " + port);
})
