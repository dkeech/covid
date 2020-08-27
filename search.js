module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var request = require('request');


    router.get('/', function(req, res){
        const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
        var options = {
            method: 'GET',
            url: 'https://covid-19-data.p.rapidapi.com/help/countries',
            qs: {format: 'json'},
            headers: {
                'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
                'x-rapidapi-key': '30ef392908msh97f5ff2d2c2cff6p17720fjsna774f4b7a2ba',
                useQueryString: true
            }
        }
          
            request(options, function(error, response, body){
                if(!error && response.statusCode == 200){
                    let data = JSON.parse(body);
                    let countryNames = [];
                    data.forEach(country => countryNames.push(country['name']));

                    console.log(states);


                    res.render('search', {data: data, countryNames: countryNames, states: states})
                } else {
                  console.log("Error: " + error);
                }
            })
    
    });

    
    

    return router;
}();