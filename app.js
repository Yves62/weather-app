const url =
  "https://api.openweathermap.org/data/2.5/forecast?q=Arras&units=metric&lang=fr&appid=d85bf225c19eee5d7725bae43f500a08";

let hours;
let newHours;
let day;
let newDay;
let dayActually;
let weatherArray = [];

const tempActual = document.querySelectorAll(".span");
const hourActual = document.querySelectorAll(".span-hour");

const icon = document.querySelector(".icon");

async function getWeather() {
  const requete = await fetch(url, {
    method: "GET",
  });
  const data = await requete.json();

  document.querySelector(".tempNow").textContent =
    Math.trunc(data.list[0].main.temp) + "°";
  document.querySelector(".weather").textContent =
    data.list[0].weather[0].description;

  if (data.list[0].weather[0].description === "clear sky") {
    icon.style.background = "url(./assets/sun.png) center / cover";
  } else if (
    data.list[0].weather[0].description === "few clouds" ||
    (data.list[0].weather[0].description = "scattered clouds")
  ) {
    icon.style.background = "url(./assets/cloudy.png) center / cover";
  } else if (
    data.list[0].weather[0].description === "rain" ||
    (data.list[0].weather[0].description = "shower rain")
  ) {
    icon.style.background = "url(./assets/rain.png) center / cover";
  }

  let hours = new Date().getHours();

  for (let i = 0; i < hourActual.length; i++) {
    let newHours = hours + i * 3;

    if (newHours > 24) {
      hourActual[i].textContent = newHours - 24 + "h";
    } else if (newHours === 24) {
      hourActual[i].textContent = "00h";
    } else {
      hourActual[i].textContent = newHours + "h";
    }
  }

  for (let j = 0; j < tempActual.length; j++) {
    tempActual[j].textContent = Math.trunc(data.list[j].main.temp) + "°";
  }
}

getWeather();
