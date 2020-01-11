const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/27247e73c04d957a8cba3cff4917c4e5/' + longitude + ',' + latitude + '?units=si'
    request({ url, json: true }, (error, { body }) => {
        const { currently } = body
        const { temperature, precipProbability } = currently
        const summary = body.daily.data[0].summary
        const { temperatureHigh, temperatureLow } = body.daily.data[0]
        if (error) {
            callback(error, undefined)
        } else {
            console.log(body.daily);

            callback(undefined, summary + ' The temp is between ' + temperatureLow + ' and ' + temperatureHigh + ' and there is ' + precipProbability + '% chance for rain')
        }
    })
}

module.exports = forecast