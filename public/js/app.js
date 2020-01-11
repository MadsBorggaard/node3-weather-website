console.log('Client side javascript is loading')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'from javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?adress=' + location).then((response) => {
        response.json().then(({ error, location, forecast } = {}) => {
            if (error) {
                // console.log(error);
                messageOne.textContent = error
            } else {
                // console.log(location)
                // console.log(forecast);
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }
        })
    })
})
