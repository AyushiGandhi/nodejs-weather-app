const weatherForm = document.querySelector('form');
const location_cityName = document.querySelector('input');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');


weatherForm.addEventListener('submit', () => {
  event.preventDefault();
  message1.innerHTML = '<h4>Loading...</h4>';
  let search = location_cityName.value;
  fetch('/weather?address=' + search).then((response) => {
    location_cityName.value = '';
    message2.innerHTML = ' Displaying Weather Details';
    response.json().then((data) => {
      if (data.error) {
        return message1.innerHTML = data.error
      }
      message1.innerHTML = 'Your City is ' + data.country + '<br> Temperature is ' + data.temperature +
        '<br> Latitude :' + data.latitude + '<br> Longitude :' + data.longitude;

    }).catch(e => message1.innerHTML = e)
  })
});

