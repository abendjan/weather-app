addEventListener("load", () => {
  let long;
  let lat;

  let locationTimezone = document.querySelector(".location-timezone");
  let degreeSection = document.querySelector(".degree-section");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDegreeSpan = document.querySelector(".temperature-degree-span");
  let temperatureDescription = document.querySelector(".temperature-description");



  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // console.log(long,lat);

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/735f241dfe0c079d9b9b80d194a1033a/${lat},${long}`;


      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(response => {
          // response ist das Objekt das von der API zurück kommt.
          console.log(response);
          // temperature und summary wurde geshorted. eigentlich ist es response.currently.temperature
          const {temperature, summary, icon} = response.currently;

          //Set DOM Elements from the api
          locationTimezone.textContent = response.timezone;
          temperatureDegree.textContent = temperature + "°";
          temperatureDescription.textContent = summary;
          // Set Icons
          setIcons(icon, document.querySelector('.icon'));

          //Fahrenheit to Celsius
          degreeSection.addEventListener('click', () => {
            if(temperatureDegreeSpan.textContent === "F") {
              let temperatureCelsius = (temperature - 32) * 5/9;
              temperatureDegree.textContent = temperatureCelsius.toFixed(1) + "°";
              temperatureDegreeSpan.textContent = "C";
            }
            else{
              temperatureDegree.textContent = temperature + "°";
              temperatureDegreeSpan.textContent = "F";
            }

          });

        });

    });

  }

function setIcons(icon,iconID){
  const skycons = new Skycons({color: "white"});
  const currentIcon = icon.replace(/-/g,"_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}

});
