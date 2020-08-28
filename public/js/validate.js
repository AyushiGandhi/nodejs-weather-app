const weatherForm = document.querySelector('form');
const location_cityName = document.querySelector('input');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const loading = document.getElementById('loading');


weatherForm.addEventListener('submit', () => {
  event.preventDefault();
  loading.innerHTML = 'Loading...';
  let search = location_cityName.value;
  fetch('/weather?address=' + search).then((response) => {
    location_cityName.value = '';
    loading.innerHTML='' ;
    message2.innerHTML =  'Displaying Weather Details';
    response.json().then((data) => {
      if (data.error) {
        return message1.innerHTML = data.error
      }
      message2.innerHTML =    ` <img src="${data.icon}" width="30px" height="30px" >` + 'Displaying Weather Details'+   ` <img src="${data.icon}" width="30px" height="30px" >`;
      message1.innerHTML =  'City : ' + data.country + '<br>' + 'Temperature : ' + data.temperature  + '<br>' + 'Humidity : ' + data.humidity +
      '<br> Latitude :' + data.latitude + '<br> Longitude :' + data.longitude + '<br>' +
        'Weather : ' + data.weather_descriptions;

    })
  })
});

