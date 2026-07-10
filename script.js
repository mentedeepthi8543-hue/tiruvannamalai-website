/* =====================================================
   SMART SPIRITUAL NAVIGATION SYSTEM
   1. Hero image slider
   2. Live Tiruvannamalai weather
   3. Weather-based tour suggestions
===================================================== */


/* =====================================================
   HERO IMAGE SLIDER
===================================================== */

const heroSlides = document.querySelectorAll(".hero-slide");
const sliderDots = document.querySelectorAll(".slider-dot");

let currentSlide = 0;

function showNextHeroSlide() {
    if (heroSlides.length === 0) {
        return;
    }

    heroSlides[currentSlide].classList.remove("active");

    if (sliderDots[currentSlide]) {
        sliderDots[currentSlide].classList.remove("active");
    }

    currentSlide++;

    if (currentSlide >= heroSlides.length) {
        currentSlide = 0;
    }

    heroSlides[currentSlide].classList.add("active");

    if (sliderDots[currentSlide]) {
        sliderDots[currentSlide].classList.add("active");
    }
}

if (heroSlides.length > 0) {
    setInterval(showNextHeroSlide, 4000);
}


/* =====================================================
   WEATHER HTML ELEMENTS
===================================================== */

const weatherTemperature =
    document.getElementById("weatherTemperature");

const weatherCondition =
    document.getElementById("weatherCondition");

const weatherExtra =
    document.getElementById("weatherExtra");

const weatherIcon =
    document.getElementById("weatherIcon");

const weatherSuggestion =
    document.getElementById("weatherSuggestion");

const suggestionIcon =
    document.getElementById("suggestionIcon");


/* =====================================================
   OPEN-METEO WEATHER API

   Tiruvannamalai:
   Latitude: 12.2253
   Longitude: 79.0747
===================================================== */

const weatherApiUrl =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=12.2253" +
    "&longitude=79.0747" +
    "&current=temperature_2m,apparent_temperature," +
    "precipitation,rain,weather_code,wind_speed_10m" +
    "&daily=precipitation_probability_max," +
    "temperature_2m_max,temperature_2m_min" +
    "&timezone=Asia%2FKolkata" +
    "&forecast_days=1";


/* =====================================================
   CONVERT WEATHER CODE INTO CONDITION
===================================================== */

function getWeatherDetails(weatherCode) {

    if (weatherCode === 0) {
        return {
            condition: "Clear and Sunny",
            icon: "☀️"
        };
    }

    if (weatherCode === 1 || weatherCode === 2) {
        return {
            condition: "Partly Sunny",
            icon: "🌤️"
        };
    }

    if (weatherCode === 3) {
        return {
            condition: "Cloudy",
            icon: "☁️"
        };
    }

    if (weatherCode === 45 || weatherCode === 48) {
        return {
            condition: "Foggy",
            icon: "🌫️"
        };
    }

    if (weatherCode >= 51 && weatherCode <= 57) {
        return {
            condition: "Light Drizzle",
            icon: "🌦️"
        };
    }

    if (weatherCode >= 61 && weatherCode <= 67) {
        return {
            condition: "Rainy",
            icon: "🌧️"
        };
    }

    if (weatherCode >= 80 && weatherCode <= 82) {
        return {
            condition: "Rain Showers",
            icon: "🌧️"
        };
    }

    if (weatherCode >= 95) {
        return {
            condition: "Thunderstorm",
            icon: "⛈️"
        };
    }

    return {
        condition: "Current Weather",
        icon: "🌤️"
    };
}

/* =====================================================
   LOAD LIVE TIRUVANNAMALAI WEATHER
===================================================== */

async function loadTiruvannamalaiWeather() {

    if (
        !weatherTemperature ||
        !weatherCondition ||
        !weatherExtra ||
        !weatherIcon
    ) {
        console.error(
            "Weather card elements are missing from index.html"
        );

        return;
    }

    try {
        const response = await fetch(weatherApiUrl);

        if (!response.ok) {
            throw new Error(
                "Unable to connect to the weather service"
            );
        }

        const data = await response.json();

        const current = data.current;
        const daily = data.daily;

        const temperature =
            Math.round(current.temperature_2m);

        const feelsLike =
            Math.round(current.apparent_temperature);

        const rain =
            Number(
                current.rain ||
                current.precipitation ||
                0
            );

        const weatherCode =
            Number(current.weather_code);

        const windSpeed =
            Math.round(current.wind_speed_10m);

        const rainChance =
            daily &&
            daily.precipitation_probability_max
                ? Number(
                    daily.precipitation_probability_max[0] || 0
                )
                : 0;

        const maximumTemperature =
            daily && daily.temperature_2m_max
                ? Math.round(daily.temperature_2m_max[0])
                : temperature;

        const minimumTemperature =
            daily && daily.temperature_2m_min
                ? Math.round(daily.temperature_2m_min[0])
                : temperature;

        const weather =
            getWeatherDetails(weatherCode);


        /* UPDATE WEATHER CARD */

        weatherIcon.textContent =
            weather.icon;

        weatherTemperature.textContent =
            `${temperature}°C`;

        weatherCondition.textContent =
            weather.condition;

        weatherExtra.textContent = "";


        /* DISPLAY TOUR SUGGESTIONS */

        showTourSuggestion(
            temperature,
            feelsLike,
            rain,
            rainChance,
            windSpeed,
            weatherCode
        );

    } catch (error) {
        console.error(
            "Weather loading error:",
            error
        );

        weatherIcon.textContent = "⚠️";

        weatherTemperature.textContent =
            "--°C";

        weatherCondition.textContent =
            "Weather unavailable";

        weatherExtra.textContent =
            "Check your internet connection";

        if (suggestionIcon) {
            suggestionIcon.textContent = "⚠️";
        }

        if (weatherSuggestion) {
            weatherSuggestion.innerHTML = `
                <h3>Unable to load live weather</h3>

                <p>
                    Please check your internet connection
                    and refresh the page.
                </p>
            `;
        }
    }
}


/* LOAD WEATHER WHEN THE PAGE OPENS */

loadTiruvannamalaiWeather();


/* REFRESH WEATHER EVERY 15 MINUTES */

setInterval(
    loadTiruvannamalaiWeather,
    15 * 60 * 1000
);