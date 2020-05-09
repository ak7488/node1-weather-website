const request = require('request')

const geolocation = (adress,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) +'.json?access_token=pk.eyJ1IjoiYW51Ymhhdjc0ODgiLCJhIjoiY2s5bWJzb254MDQyeDNrczB0cmZncXd4OSJ9.NG7UZvSsY-dJzYPWeFJBAg'
    request({url, json: true}, (error,{body}) => {
        if(error){
            return callback('please check internet conection', undefined)
        } else if(body.features.length === 0){
            callback('unalble to find location please check your input', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geolocation