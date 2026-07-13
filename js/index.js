document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       HERO SLIDER
    ========================================= */

    const heroSlides =
        document.querySelectorAll(".hero-slide");

    const sliderDots =
        document.querySelectorAll(".slider-dot");

    let currentSlide = 0;

    function showNextSlide() {

        if (heroSlides.length === 0) {
            return;
        }

        heroSlides[currentSlide].classList.remove("active");

        if (sliderDots[currentSlide]) {
            sliderDots[currentSlide].classList.remove("active");
        }

        currentSlide =
            (currentSlide + 1) % heroSlides.length;

        heroSlides[currentSlide].classList.add("active");

        if (sliderDots[currentSlide]) {
            sliderDots[currentSlide].classList.add("active");
        }
    }

    if (heroSlides.length > 0) {
        setInterval(showNextSlide, 4000);
    }


    /* =========================================
       HOMEPAGE ELEMENTS
    ========================================= */

    const mainWeatherCard =
        document.getElementById("mainWeatherCard");

    const weatherIcon =
        document.getElementById("weatherIcon");

    const weatherTemperature =
        document.getElementById("weatherTemperature");

    const weatherCondition =
        document.getElementById("weatherCondition");

    const weatherBackTitle =
        document.getElementById("weatherBackTitle");

    const weatherBackSummary =
        document.getElementById("weatherBackSummary");

    const weatherBackSuggestions =
        document.getElementById("weatherBackSuggestions");

    const templeStatusCard =
        document.getElementById("templeStatusCard");

    const templeCurrentStatus =
        document.getElementById("templeCurrentStatus");

    const girivalamCard =
        document.getElementById("girivalamCard");

    const emergencyCard =
        document.getElementById("emergencyCard");


    /* =========================================
       WEATHER API
    ========================================= */

    const weatherUrl =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=12.2253" +
        "&longitude=79.0747" +
        "&current=temperature_2m,weather_code,rain,precipitation" +
        "&timezone=Asia%2FKolkata";


    /* =========================================
       PLACES INFORMATION
    ========================================= */

    const places = {

        temple: {
            icon: "🛕",
            name: "Arunachaleswara Temple",
            time: "5:00 AM–8:30 AM or 5:00 PM–8:30 PM",
            temperature: "Below 34°C",
            reason:
                "Pleasant weather and comfortable darshan."
        },

        ramana: {
            icon: "🧘",
            name: "Ramana Ashram",
            time: "6:00 AM–10:00 AM or 4:00 PM–6:00 PM",
            temperature: "Below 35°C",
            reason:
                "Quiet atmosphere for meditation."
        },

        parvathamalai: {
            icon: "⛰️",
            name: "Parvathamalai Hills",
            time: "5:00 AM–9:00 AM",
            temperature: "Below 30°C",
            reason:
                "Hill trekking is comfortable in cool weather."
        },

        virupaksha: {
            icon: "🪨",
            name: "Virupaksha Cave",
            time: "6:00 AM–10:00 AM",
            temperature: "Below 33°C",
            reason:
                "The uphill route is difficult during high heat."
        },

        viewpoint: {
            icon: "📸",
            name: "Temple View Point",
            time: "Sunrise or 5:30 PM–6:30 PM",
            temperature: "Prefer below 35°C",
            reason:
                "Better lighting and cooler weather."
        },

        skandashramam: {
            icon: "🏔️",
            name: "Skandashramam",
            time: "6:00 AM–9:30 AM",
            temperature: "Below 32°C",
            reason:
                "The uphill trek is easier in the morning."
        },

        javadu: {
            icon: "🌄",
            name: "Javadu Hills",
            time: "6:00 AM–10:00 AM",
            temperature: "Below 30°C",
            reason:
                "Best for sightseeing and trekking."
        },

        seshadri: {
            icon: "🙏",
            name: "Seshadri Ashram",
            time: "7:00 AM–11:00 AM or 4:00 PM–6:00 PM",
            temperature: "Below 35°C",
            reason:
                "Suitable for a peaceful spiritual visit."
        },

        yogi: {
            icon: "🧘",
            name: "Yogi Ramsuratkumar Ashram",
            time: "7:00 AM–11:00 AM or 4:00 PM–6:00 PM",
            temperature: "Below 35°C",
            reason:
                "Comfortable for prayer and meditation."
        },

        sathanur: {
            icon: "🌊",
            name: "Sathanur Reservoir",
            time: "6:00 AM–10:00 AM or 4:00 PM–6:00 PM",
            temperature: "Below 34°C",
            reason:
                "Cooler breeze and better sightseeing."
        },

        girivalam: {
            icon: "🚶",
            name: "Girivalam",
            time: "4:00 AM–8:00 AM or after 6:30 PM",
            temperature: "Below 32°C",
            reason:
                "The 14 km walk is safer in cooler weather."
        }
    };


    /* =========================================
       WEATHER CONDITION
    ========================================= */

    function getWeatherDetails(code, rainAmount) {

        if (code >= 95) {
            return {
                name: "Thunderstorm",
                icon: "⛈️",
                type: "storm"
            };
        }

        if (
            rainAmount > 0 ||
            (code >= 51 && code <= 67) ||
            (code >= 80 && code <= 82)
        ) {
            return {
                name: "Rainy",
                icon: "🌧️",
                type: "rainy"
            };
        }

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
                type: "partly"
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
                type: "foggy"
            };
        }

        return {
            name: "Pleasant",
            icon: "🌿",
            type: "normal"
        };
    }


    /* =========================================
       SMART SUGGESTION LOGIC
    ========================================= */

    function getSuggestions(
        temperature,
        weather,
        period
    ) {

        let recommended = [];
        let avoid = [];
        let message = "";
        let precaution = "";

        if (temperature <= 28) {

            recommended = [
                "girivalam",
                "parvathamalai",
                "skandashramam",
                "virupaksha",
                "javadu",
                "viewpoint",
                "temple"
            ];

            message =
                "Excellent weather for Girivalam, trekking, caves and hill visits.";

        } else if (temperature <= 30) {

            recommended = [
                "girivalam",
                "parvathamalai",
                "skandashramam",
                "virupaksha",
                "javadu",
                "temple",
                "ramana"
            ];

            message =
                "Very good weather for outdoor spiritual activities.";

        } else if (temperature <= 33) {

            recommended = [
                "temple",
                "ramana",
                "seshadri",
                "yogi",
                "sathanur",
                "viewpoint"
            ];

            avoid = [
                "parvathamalai",
                "javadu"
            ];

            message =
                "Comfortable for temples, ashrams and sightseeing.";

        } else if (temperature <= 36) {

            recommended = [
                "temple",
                "ramana",
                "seshadri",
                "yogi"
            ];

            avoid = [
                "girivalam",
                "parvathamalai",
                "skandashramam",
                "virupaksha",
                "javadu"
            ];

            message =
                "Warm weather. Prefer indoor spiritual places.";

        } else {

            recommended = [
                "temple",
                "ramana",
                "seshadri",
                "yogi"
            ];

            avoid = [
                "girivalam",
                "parvathamalai",
                "skandashramam",
                "virupaksha",
                "viewpoint",
                "javadu",
                "sathanur"
            ];

            message =
                "Very hot weather. Limit outdoor activities.";
        }

                if (period.key === "afternoon") {

            avoid.push(
                "girivalam",
                "parvathamalai",
                "skandashramam",
                "virupaksha",
                "javadu"
            );

            recommended = recommended.filter(function (key) {
                return [
                    "temple",
                    "ramana",
                    "seshadri",
                    "yogi"
                ].includes(key);
            });
        }


        if (period.key === "evening") {

            recommended.push(
                "temple",
                "viewpoint",
                "sathanur",
                "ramana",
                "girivalam"
            );
        }


        if (period.key === "night") {

            recommended = [
                "temple",
                "girivalam"
            ];

            avoid.push(
                "parvathamalai",
                "skandashramam",
                "virupaksha",
                "javadu",
                "viewpoint"
            );
        }


        if (weather.type === "rainy") {

            recommended = [
                "temple",
                "ramana",
                "seshadri",
                "yogi"
            ];

            avoid.push(
                "girivalam",
                "parvathamalai",
                "skandashramam",
                "virupaksha",
                "viewpoint",
                "javadu"
            );

            message =
                "Rainy weather. Prefer covered temples and ashrams.";

            precaution =
                "Carry an umbrella and wear non-slip footwear.";

        } else if (weather.type === "storm") {

            recommended = [
                "temple",
                "ramana",
                "seshadri",
                "yogi"
            ];

            avoid = [
                "girivalam",
                "parvathamalai",
                "skandashramam",
                "virupaksha",
                "viewpoint",
                "javadu",
                "sathanur"
            ];

            message =
                "Thunderstorm alert. Stay indoors until the storm stops.";

            precaution =
                "Avoid open areas and hill routes.";

        } else {

            precaution =
                temperature >= 34
                    ? "Drink water regularly and rest in shaded areas."
                    : "Carry drinking water and wear comfortable footwear.";
        }


        recommended =
            [...new Set(recommended)];

        avoid =
            [...new Set(avoid)];

        recommended =
            recommended.filter(function (key) {
                return !avoid.includes(key);
            });


        if (recommended.length === 0) {
            recommended = [
                "temple",
                "ramana"
            ];
        }


        return {
            recommended: recommended,
            avoid: avoid,
            message: message,
            precaution: precaution
        };
    }


    /* =========================================
       WEATHER CARD BACK
    ========================================= */

    function updateWeatherBack(
        temperature,
        weather,
        period,
        suggestions
    ) {

        const bestPlaces =
            suggestions.recommended.slice(0, 2);

        const avoidPlaces =
            suggestions.avoid.slice(0, 2);

        weatherBackTitle.textContent =
            `${weather.icon} ${weather.name} Weather`;

        weatherBackSummary.textContent =
            `${temperature}°C • ${period.name}`;

        weatherBackSuggestions.innerHTML = `

            <div class="simple-suggestion-section">

                <div class="simple-suggestion-title">
                    Best Places Now
                </div>

                ${bestPlaces.map(function (key) {
                    return `
                        <div class="simple-suggestion-text">
                            ${places[key].name}
                        </div>
                    `;
                }).join("")}

            </div>

            <div class="simple-suggestion-section">

                <div class="simple-avoid-title">
                    ✕ Avoid Now
                </div>

                ${
                    avoidPlaces.length > 0
                        ? avoidPlaces.map(function (key) {
                            return `
                                <div class="simple-suggestion-text">
                                    ${places[key].name}
                                </div>
                            `;
                        }).join("")
                        : `
                            <div class="simple-suggestion-text">
                                No major restrictions
                            </div>
                        `
                }

            </div>

            <div class="simple-precaution">
                <strong>Precaution:</strong>
                ${suggestions.precaution}
            </div>

            <div class="simple-best-time">
                <strong>Priority:</strong>
                ${suggestions.recommended
                    .slice(0, 3)
                    .map(function (key) {
                        return places[key].name;
                    })
                    .join(" → ")}
            </div>
        `;
    }
        /* =========================================
       LOAD WEATHER
    ========================================= */

    async function loadWeather() {

        try {

            const response =
                await fetch(weatherUrl);

            if (!response.ok) {
                throw new Error(
                    "Weather request failed"
                );
            }

            const data =
                await response.json();

            const temperature =
                Math.round(
                    Number(
                        data.current.temperature_2m
                    )
                );

            const weatherCode =
                Number(
                    data.current.weather_code
                );

            const rainAmount =
                Number(
                    data.current.rain ||
                    data.current.precipitation ||
                    0
                );

            const weather =
                getWeatherDetails(
                    weatherCode,
                    rainAmount
                );

            const indiaTime =
                getIndiaTime();

            const period =
                getPeriod(indiaTime.hour);

            const suggestions =
                getSuggestions(
                    temperature,
                    weather,
                    period
                );


            if (weatherIcon) {
                weatherIcon.textContent =
                    weather.icon;
            }

            if (weatherTemperature) {
                weatherTemperature.textContent =
                    `${temperature}°C`;
            }

            if (weatherCondition) {
                weatherCondition.textContent =
                    weather.name;
            }


            if (
                weatherBackTitle &&
                weatherBackSummary &&
                weatherBackSuggestions
            ) {
                updateWeatherBack(
                    temperature,
                    weather,
                    period,
                    suggestions
                );
            }

        } catch (error) {

            console.error(
                "Weather error:",
                error
            );

            if (weatherIcon) {
                weatherIcon.textContent =
                    "⚠️";
            }

            if (weatherTemperature) {
                weatherTemperature.textContent =
                    "--°C";
            }

            if (weatherCondition) {
                weatherCondition.textContent =
                    "Weather unavailable";
            }

            if (weatherBackTitle) {
                weatherBackTitle.textContent =
                    "Suggestions unavailable";
            }

            if (weatherBackSummary) {
                weatherBackSummary.textContent =
                    "Check your internet connection.";
            }

            if (weatherBackSuggestions) {
                weatherBackSuggestions.innerHTML =
                    "";
            }
        }
    }


    /* =========================================
       TEMPLE STATUS
    ========================================= */

    function updateTempleStatus() {

        if (!templeCurrentStatus) {
            return;
        }

        const indiaTime =
            getIndiaTime();

        const currentMinutes =
            indiaTime.totalMinutes;

        const morningStart =
            (5 * 60) + 30;

        const morningEnd =
            (12 * 60) + 30;

        const eveningStart =
            (15 * 60) + 30;

        const eveningEnd =
            (21 * 60) + 30;


        if (
            currentMinutes >= morningStart &&
            currentMinutes < morningEnd
        ) {

            templeCurrentStatus.textContent =
                "Open for Morning Darshan";

            templeCurrentStatus.className =
                "temple-status-open";

        } else if (
            currentMinutes >= morningEnd &&
            currentMinutes < eveningStart
        ) {

            templeCurrentStatus.textContent =
                "Afternoon Break";

            templeCurrentStatus.className =
                "temple-status-closed";

        } else if (
            currentMinutes >= eveningStart &&
            currentMinutes < eveningEnd
        ) {

            templeCurrentStatus.textContent =
                "Open for Evening Darshan";

            templeCurrentStatus.className =
                "temple-status-open";

        } else {

            templeCurrentStatus.textContent =
                "Currently Closed";

            templeCurrentStatus.className =
                "temple-status-closed";
        }
    }


    /* =========================================
       FLIP CARD EVENTS
    ========================================= */

    if (mainWeatherCard) {

        mainWeatherCard.addEventListener(
            "click",
            function () {

                mainWeatherCard.classList.toggle(
                    "flipped"
                );
            }
        );
    }


    if (templeStatusCard) {

        templeStatusCard.addEventListener(
            "click",
            function () {

                templeStatusCard.classList.toggle(
                    "flipped"
                );
            }
        );
    }


    if (girivalamCard) {

        girivalamCard.addEventListener(
            "click",
            function () {

                girivalamCard.classList.toggle(
                    "flipped"
                );
            }
        );
    }


    if (emergencyCard) {

        emergencyCard.addEventListener(
            "click",
            function () {

                emergencyCard.classList.toggle(
                    "flipped"
                );
            }
        );
    }


    /* =========================================
       START HOMEPAGE FUNCTIONS
    ========================================= */

    loadWeather();

    updateTempleStatus();


    setInterval(
        loadWeather,
        15 * 60 * 1000
    );


    setInterval(
        updateTempleStatus,
        60 * 1000
    );

});