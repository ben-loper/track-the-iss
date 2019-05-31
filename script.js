window.addEventListener('DOMContentLoaded', () => {
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
}
