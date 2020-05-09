const request = require('request')
const forecast = (lon,lat,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fc31f4169cf07c268e74675a8dd34e17&query=' + lat + ',' +lon + '&units=m'
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback('unable to connect to internet please check your internet connection', undefined)
        } else if(body.error){
            callback('unable to find input please check your input',undefined)
        } else {
            callback(undefined, {
                weather_descriptions: body.current.weather_descriptions,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}
module.exports = forecast
//body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature+' degrees c out. It feel likes ' + body.current.feelslike + ' degrees c'