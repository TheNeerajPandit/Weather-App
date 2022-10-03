const form = document.querySelector("form");
const temperature = document.querySelector(".weather-right span");
const day = document.querySelector(".status");
const cityWeather = document.querySelector(".cityWeather");
const frame = document.querySelector(".frame");
const icon = document.querySelector(".icon img");

//Updating the UI
const updateUI = (data) => {
  const cityDetails = data.cityDetails;
  const weather = data.weather;

  //Update Weather UI
  cityWeather.innerHTML = `
    <svg style="height: 20px ;" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /> <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /> </svg>
    <span>${cityDetails.EnglishName}</span>
    <p>${weather.WeatherText}</p>
    `;

  //Change Temp UI
  temperature.innerHTML = `
    <span>${weather.Temperature.Metric.Value}&deg;C</span>
    `;

  const iconSrc = `./includes/images/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  //Change Day or Night UI
  let time = null;
  if (weather.IsDayTime) {
    day.innerContent = "It's Day";
  } else {
    day.innerContent = "It's Night";
  }

  // const background = weather.IsDayTime ? day.textContent="It's Day" : day.textContent="It's Night";

  
//Change Day or Night UI
let background= null;
if(weather.IsDayTime){
    day.textContent="It's Day";
    background = 'background-image: url(./includes/images/daytime.jpg)';
}else{
    day.textContent="It's Night";
    background = 'background-image: url(./includes/images/night.jpg)';
}
frame.setAttribute('style', background);
};

//getting temperature and weather
const updateCity = async (location) => {
  const cityDetails = await getCity(location);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather };
};

//Adding Action to submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //resetting form input
  const location = form.location.value.trim();
  form.reset();

  //updating city name
  updateCity(location)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
