const mymap = L.map('mapid');
let marker = {};

window.addEventListener('DOMContentLoaded', () => {
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);

  fetch('https://api.wheretheiss.at/v1/satellites/25544?units=miles')
    .then(resp => {
      return resp.json();
    })
    .then(internationalSpaceStation => {
      updateSite(internationalSpaceStation);
    });
});

setInterval(() => {
  fetch('https://api.wheretheiss.at/v1/satellites/25544?units=miles')
    .then(resp => {
      return resp.json();
    })
    .then(internationalSpaceStation => {
      updateSite(internationalSpaceStation);
    });
}, 3000);

function updateSite(internationalSpaceStation) {
  const latTag = document.getElementById('latCord');
  const longTag = document.getElementById('longCord');
  const velocityTag = document.getElementById('velocity');
  const altitudeTag = document.getElementById('altitude');

  latTag.innerText = `Latitude: ${internationalSpaceStation.latitude}`;
  longTag.innerText = `Longitude: ${internationalSpaceStation.longitude}`;
  velocityTag.innerText = `Velocity in MPH: ${
    internationalSpaceStation.velocity
  }`;
  altitudeTag.innerText = `Altitude in Miles: ${
    internationalSpaceStation.altitude
  }`;

  mymap.setView(
    [internationalSpaceStation.latitude, internationalSpaceStation.longitude],
    2
  );

  if (marker != undefined) {
    mymap.removeLayer(marker);
  }

  marker = L.marker([
    internationalSpaceStation.latitude,
    internationalSpaceStation.longitude
  ]).addTo(mymap);
}
