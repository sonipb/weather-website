const request = require('request');

const forecast = (lat, lng, callback) => {

    /* open-meteo.co */
    //const url = 'https://api.open-meteo.com/v1/forecast?latitude='+ lat + '&longitude=' + lng + '&hourly=temperature_2m';
    // request( {url: url, json:true}, (error, response, body) => {
    //     if(error) {
    //         callback('unable to connect to network!', undefined);
    //     } else if(body.error) {
    //         callback(body.reason, undefined);
    //     } else {
    //         callback(undefined, body);
    //     }
    // } ) ;

    const url = 'http://api.weatherstack.com/current?access_key=23819caa56940a130bc65dd2284eb798&query=' + lat + ',' + lng ;
    request( {url: url, json:true}, (error, response, body) => {
        if(error) {
            callback('unable to connect to network!', undefined);
        } else if(body.error) {
            callback(body.error.type + ' - ' + body.error.info, undefined);
        } else {
            callback(undefined, 'Location : ' + body.location.name + ', ' + body.location.region +  ', ' + body.location.country + '. It is currently temperature = ' + body.current.temperature + ' Weather Description ' + body.current.weather_descriptions[0] + ' humidity ' + body.current.humidity);
        }
    } ) ;    

};

module.exports = forecast;