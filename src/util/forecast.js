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
                // humidity: body.current.humidity
            })
        }
    })
}
module.exports = forecast


// "current": {
//     "observation_time": "07:53 AM",
//     "temperature": 41,
//     "weather_code": 116,
//     "weather_icons": [
//     "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
//     ],
//     "weather_descriptions": [
//     "Partly cloudy"
//     ],
//     "wind_speed": 9,
//     "wind_degree": 199,
//     "wind_dir": "SSW",
//     "pressure": 1006,
//     "precip": 0,
//     "humidity": 13,
//     "cloudcover": 2,
//     "feelslike": 41,
//     "uv_index": 10,
//     "visibility": 10,
//     "is_day": "yes"
//     }