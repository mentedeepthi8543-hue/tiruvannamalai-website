/* =====================================================
   TIRUVANNAMALAI GUIDE
   - Hero image slider
   - Live temperature
   - Sunny / Cloudy / Rainy status
   - Weather-based place suggestions
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

const weatherIcon =
    document.getElementById("weatherIcon");

const weatherTemperature =
    document.getElementById("weatherTemperature");

const weatherCondition =
    document.getElementById("weatherCondition");

const weatherExtra =
    document.getElementById("weatherExtra");

const suggestionIcon =
    document.getElementById("suggestionIcon");

const weatherSuggestion =
    document.getElementById("weatherSuggestion");


/* =====================================================
   OPEN-METEO API

   Tiruvannamalai:
   Latitude: 12.2253
   Longitude: 79.0747
===================================================== */

const weatherApiUrl =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=12.2253" +
    "&longitude=79.0747" +
    "&current=temperature_2m,weather_code" +
    "&timezone=Asia%2FKolkata";


/* =====================================================
   WEATHER CONDITION
===================================================== */

function getWeatherDetails(code) {

    if (code === 0) {
        return {
            name: "Sunny",
            icon: "☀️",
            type: "sunny"
        };
    }

    if (code === 1 || code === 2) {
        return {
            name: "Partly Sunny",
            icon: "🌤️",
            type: "sunny"
        };
    }

    if (code === 3) {
        return {
            name: "Cloudy",
            icon: "☁️",
            type: "cloudy"
        };
    }

    if (code === 45 || code === 48) {
        return {
            name: "Foggy",
            icon: "🌫️",
            type: "cloudy"
        };
    }

    if (code >= 51 && code <= 57) {
        return {
            name: "Light Drizzle",
            icon: "🌦️",
            type: "rainy"
        };
    }

    if (
        (code >= 61 && code <= 67) ||
        (code >= 80 && code <= 82)
    ) {
        return {
            name: "Rainy",
            icon: "🌧️",
            type: "rainy"
        };
    }

    if (code >= 95) {
        return {
            name: "Thunderstorm",
            icon: "⛈️",
            type: "storm"
        };
    }

    return {
        name: "Current Weather",
        icon: "🌤️",
        type: "normal"
    };
}


/* =====================================================
   PLACES AND RECOMMENDED VISITING TIMES

   These are suggested travel windows,
   not official opening timings.
===================================================== */

const places = [

    {
        name: "Arunachaleswarar Temple",
        icon: "🛕",
        time: "5:00 AM–10:00 AM or 4:00 PM–8:30 PM",
        category: "indoor"
    },

    {
        name: "Sri Ramana Ashram",
        icon: "🧘",
        time: "8:00 AM–11:30 AM or 2:00 PM–5:30 PM",
        category: "indoor"
    },

    {
        name: "Sri Seshadri Swamigal Ashram",
        icon: "🙏",
        time: "8:00 AM–12:00 PM or 3:00 PM–6:00 PM",
        category: "indoor"
    },

    {
        name: "Yogi Ramsuratkumar Ashram",
        icon: "🧘",
        time: "8:00 AM–12:00 PM or 3:00 PM–6:00 PM",
        category: "indoor"
    },

    {
        name: "Girivalam Route",
        icon: "🚶",
        time: "5:00 AM–8:00 AM or after 5:00 PM",
        category: "outdoor"
    },

    {
        name: "Virupaksha Cave",
        icon: "🪨",
        time: "6:00 AM–9:30 AM",
        category: "trek"
    },

    {
        name: "Skandashramam",
        icon: "🕉️",
        time: "6:00 AM–9:30 AM",
        category: "trek"
    },

    {
        name: "Arunachala Mountain",
        icon: "🏔️",
        time: "5:30 AM–9:00 AM",
        category: "trek"
    },

    {
        name: "Parvathamalai Hills",
        icon: "⛰️",
        time: "5:00 AM–9:00 AM",
        category: "trek"
    },

    {
        name: "Annamalaiyar Temple View Point",
        icon: "🌄",
        time: "6:00 AM–8:00 AM or 4:30 PM–6:30 PM",
        category: "outdoor"
    },

    {
        name: "Javadhu Hills",
        icon: "🌿",
        time: "6:00 AM–11:00 AM",
        category: "outdoor"
    },

    {
        name: "Sathanur Reservoir",
        icon: "🌊",
        time: "7:00 AM–11:00 AM or 3:30 PM–6:00 PM",
        category: "outdoor"
    }

];


/* =====================================================
   PLACE CARD
===================================================== */

function createRecommendedCard(place) {

    return `
        <div class="tour-suggestion-item">

            <strong>
                ${place.icon} ${place.name}
            </strong>

            <br>

            <span>
                Best time: ${place.time}
            </span>

        </div>
    `;
}


function createAvoidCard(place, reason) {

    return `
        <div
            class="tour-suggestion-item"
            style="border-left-color:#c0392b;"
        >

            <strong>
                ❌ ${place.name}
            </strong>

            <br>

            <span>
                Suggested time: ${place.time}
            </span>

            <br>

            <small>
                ${reason}
            </small>

        </div>
    `;
}


/* =====================================================
   WEATHER-BASED SUGGESTIONS
===================================================== */

function displaySuggestions(
    temperature,
    weather
) {

    const recommended = [];
    const avoid = [];

    let advice = "";


    /* THUNDERSTORM */

    if (weather.type === "storm") {

        advice =
            "Thunderstorm conditions are unsafe for outdoor travel. Prefer temples and ashrams.";

        places.forEach(function (place) {

            if (place.category === "indoor") {

                recommended.push(place);

            } else {

                avoid.push({
                    place: place,
                    reason:
                        "Avoid during thunderstorms."
                });

            }

        });

    }


    /* RAINY */

    else if (weather.type === "rainy") {

        advice =
            "Rainy weather. Visit temples and ashrams. Avoid Girivalam, hills, caves and wet outdoor routes.";

        places.forEach(function (place) {

            if (place.category === "indoor") {

                recommended.push(place);

            } else {

                avoid.push({
                    place: place,
                    reason:
                        "Avoid while roads and paths are wet."
                });

            }

        });

    }


    /* VERY HOT */

    else if (temperature >= 37) {

        advice =
            "Very hot weather. Visit temples and ashrams during the daytime. Visit outdoor places only early morning or evening.";

        places.forEach(function (place) {

            if (place.category === "indoor") {

                recommended.push(place);

            } else {

                avoid.push({
                    place: place,
                    reason:
                        "Avoid during peak afternoon heat."
                });

            }

        });

    }


    /* WARM AND SUNNY */

    else if (temperature >= 31) {

        advice =
            "Warm weather. Visit temples and ashrams during the day. Plan Girivalam and outdoor visits in the morning or after 5:00 PM.";

        places.forEach(function (place) {

            recommended.push(place);

        });

    }


    /* CLOUDY */

    else if (weather.type === "cloudy") {

        advice =
            "Cloudy and comfortable weather. Most places are suitable, but check for rain before visiting hills and caves.";

        places.forEach(function (place) {

            recommended.push(place);

        });

    }


    /* PLEASANT */

    else {

        advice =
            "Pleasant weather. Most Tiruvannamalai places can be visited during their recommended times.";

        places.forEach(function (place) {

            recommended.push(place);

        });

    }


    suggestionIcon.textContent =
        weather.icon;


    const recommendedHtml =
        recommended
            .map(createRecommendedCard)
            .join("");


    let avoidHtml = `
        <div class="tour-suggestion-item">
            No major restrictions based on the current weather.
        </div>
    `;


    if (avoid.length > 0) {

        avoidHtml =
            avoid
                .map(function (item) {

                    return createAvoidCard(
                        item.place,
                        item.reason
                    );

                })
                .join("");

    }


    weatherSuggestion.innerHTML = `

        <h3>
            ${weather.icon}
            ${weather.name}
            — ${temperature}°C
        </h3>

        <p>
            ${advice}
        </p>

        <h3 style="margin-top:20px;">
            ✅ Recommended Places
        </h3>

        <div class="tour-suggestion-list">

            ${recommendedHtml}

        </div>

        <h3 style="margin-top:25px;">
            ⚠️ Avoid or Postpone
        </h3>

        <div class="tour-suggestion-list">

            ${avoidHtml}

        </div>

        <p
            style="
                margin-top:18px;
                font-size:13px;
                color:#777;
            "
        >
            These are suggested travel windows,
            not official opening hours.
            Verify local timings before travelling.
        </p>
    `;
}


/* =====================================================
   LOAD LIVE WEATHER
===================================================== */

async function loadWeather() {

    try {

        const response =
            await fetch(weatherApiUrl);


        if (!response.ok) {

            throw new Error(
                "Weather request failed"
            );

        }


        const data =
            await response.json();


        if (!data.current) {

            throw new Error(
                "Current weather is missing"
            );

        }


        const temperature =
            Math.round(
                data.current.temperature_2m
            );


        const weatherCode =
            Number(
                data.current.weather_code
            );


        const weather =
            getWeatherDetails(
                weatherCode
            );


        /* WEATHER CARD */

        weatherIcon.textContent =
            weather.icon;


        weatherTemperature.textContent =
            `${temperature}°C`;


        weatherCondition.textContent =
            weather.name;


        /* REMOVE EXTRA DETAILS */

        if (weatherExtra) {

            weatherExtra.textContent = "";

        }


        /* DISPLAY PLACES */

        displaySuggestions(
            temperature,
            weather
        );

    }

    catch (error) {

        console.error(
            "Weather error:",
            error
        );


        weatherIcon.textContent =
            "⚠️";


        weatherTemperature.textContent =
            "--°C";


        weatherCondition.textContent =
            "Weather unavailable";


        if (weatherExtra) {

            weatherExtra.textContent = "";

        }


        suggestionIcon.textContent =
            "⚠️";


        weatherSuggestion.innerHTML = `

            <h3>
                Unable to load live weather
            </h3>

            <p>
                Check your internet connection,
                save script.js and refresh the page.
            </p>
        `;

    }

}


/* LOAD WEATHER IMMEDIATELY */

loadWeather();


/* UPDATE EVERY 15 MINUTES */

setInterval(
    loadWeather,
    15 * 60 * 1000
);