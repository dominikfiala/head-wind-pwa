var appid = 'b6907d289e10d714a6e88b30761fae22'

function geo_success(position) {
  var {latitude, longitude} = position.coords;
  var apiUrl = `https://openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}`
  fetch(apiUrl)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      addRow({
        time: new Date().toLocaleTimeString(),
        lat: latitude.toPrecision(4),
        lon: longitude.toPrecision(4),
        ...response.wind
      })
    })
}

function addRow(data) {
  var table = document.querySelector('table')
  var row = table.insertRow(-1);
  ['time', 'lat', 'lon', 'speed', 'deg', 'gust'].forEach(function(field, index) {
    var cell = row.insertCell(index)
    cell.appendChild(document.createTextNode(data[field]))
  })
}

function geo_error() {
  alert("Sorry, no position available.");
}

var geo_options = {
  enableHighAccuracy: true,
  // maximumAge: 30000,
  // timeout: 27000
};

var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
