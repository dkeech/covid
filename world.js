module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var request = require('request');
 
    console.log('in world.js')
    function getWorld(req, res){
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
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
    
    router.get('/world', getWorld)

    return router;
}();