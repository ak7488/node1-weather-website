

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
search.addEventListener('click', () => {
    const searc = document.querySelector('input')
    searc.style.borderColor = '#888888'
})
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    document.getElementById('p1').innerHTML = 'Loading...'
    fetch('/weather?adress='+ location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                document.getElementById('p1').innerHTML = data.error
            }else{
                document.getElementById('p1').innerHTML = 'Temperature = ' + data.temperature + '<br>' + 'Feels Like = ' + data.feelslike + '<br>' + 'Weather Descriptions = ' + data.weather_descriptions + '<br>' + 'Location = ' + data.location
            }
        })
    })
})
