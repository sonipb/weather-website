const request = require('request');

const geoCode = ( address, callBack) => {
    const url = 'https://us1.locationiq.com/v1/search?key=pk.c0e44c92e87ac6e1ffdc56a03f29ee88&q=' + encodeURIComponent(address) + '&format=json&limit=1';
    request({url : url, json:true}, (error, response, body) => {
        //callBack('unable to connect to network', body.error);
        if(error) {
            callBack('unable to connect to network', undefined);
        } else if(body.error) {
            callBack(body.error, undefined);
        } else {
            callBack(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].display_name
            });
        }
    });

};

module.exports = geoCode; 