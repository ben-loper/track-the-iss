window.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.wheretheiss.at/v1/satellites/25544?units=miles')
    .then(resp => {
      return resp.json();
    })
    .then(location => {
      updateSite(location);
    });
});

setInterval(() => {
  fetch('https://api.wheretheiss.at/v1/satellites/25544?units=miles')
    .then(resp => {
      return resp.json();
    })
    .then(location => {
      updateSite(location);
    });
}, 3000);

function updateSite(location) {
  const latTag = document.getElementById('latCord');
  const longTag = document.getElementById('longCord');

  latTag.innerText = `Latitude: ${location.latitude}`;
  longTag.innerText = `Longitude: ${location.longitude}`;
}
