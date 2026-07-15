"use strict";


const hotelData = {

    "hotel-arunachala": {
        name: "Hotel Arunachala",
        category: "Temple-Near Family Stay",
        shortDescription:
            "Comfortable family accommodation close to Arunachaleswarar Temple.",

        description:
            "Hotel Arunachala provides convenient accommodation for pilgrims, families and visitors. The property offers comfortable rooms, easy temple access, reception assistance and essential facilities required for a peaceful stay in Tiruvannamalai.",

        location:
            "Near Arunachaleswarar Temple, Tiruvannamalai",

        mapQuery:
            "Hotel Arunachala Tiruvannamalai",

        checkIn: "12:00 PM",
        checkOut: "11:00 AM",

        images: [
            "images/card_images/hotels.jpg",
            "images/hotel1.jpg",
            "images/hotel2.jpg"
        ],

        amenities: [
            "📶 Free Wi-Fi",
            "❄️ Air-Conditioned Rooms",
            "🅿️ Parking",
            "👨‍👩‍👧 Family Rooms",
            "🚿 Hot Water",
            "🛎️ Reception Support",
            "📺 Television",
            "🔌 Power Backup"
        ],

        rooms: [
            {
                name: "Standard Room",
                description: "Suitable for two guests with essential facilities.",
                price: "₹1,500 onwards"
            },
            {
                name: "Deluxe Room",
                description: "Spacious air-conditioned room for couples or families.",
                price: "₹2,200 onwards"
            },
            {
                name: "Family Room",
                description: "Larger room suitable for three to five guests.",
                price: "₹3,200 onwards"
            }
        ],

        nearby: [
            ["🛕 Arunachaleswarar Temple", "Near"],
            ["🚶 Girivalam Route", "500 m"],
            ["🚌 Bus Stand", "1.2 km"],
            ["🚉 Railway Station", "2.5 km"]
        ]
    },


    "hotel-himalayaa": {
        name: "Hotel Himalayaa",
        category: "Premium Stay",
        shortDescription:
            "Premium rooms and modern facilities on Polur Road.",

        description:
            "Hotel Himalayaa is suitable for families and travellers looking for comfortable premium accommodation. The hotel provides modern rooms, parking, reception support and convenient access to major Tiruvannamalai locations.",

        location:
            "Polur Road, Vengikkal, Tiruvannamalai",

        mapQuery:
            "Hotel Himalayaa Tiruvannamalai",

        checkIn: "12:00 PM",
        checkOut: "11:00 AM",

        images: [
            "images/hotel2.jpg",
            "images/card_images/hotels.jpg",
            "images/hotel1.jpg"
        ],

        amenities: [
            "📶 Free Wi-Fi",
            "❄️ Premium AC Rooms",
            "🅿️ Secure Parking",
            "🍽️ Restaurant",
            "🛗 Lift",
            "👨‍👩‍👧 Family Rooms",
            "🛎️ 24×7 Reception",
            "🚕 Travel Assistance"
        ],

        rooms: [
            {
                name: "Deluxe Room",
                description: "Premium room suitable for two guests.",
                price: "₹3,200 onwards"
            },
            {
                name: "Executive Room",
                description: "Spacious room with additional seating.",
                price: "₹4,200 onwards"
            },
            {
                name: "Family Suite",
                description: "Large suite designed for family accommodation.",
                price: "₹5,500 onwards"
            }
        ],

        nearby: [
            ["🛕 Temple", "4 km"],
            ["🚉 Railway Station", "3 km"],
            ["🚌 Bus Stand", "3.5 km"],
            ["🚶 Girivalam Route", "4 km"]
        ]
    },


    "athena-hotel": {
        name: "Athena Hotel",
        category: "Premium Family Hotel",
        shortDescription:
            "Family-friendly premium hotel with modern facilities.",

        description:
            "Athena Hotel provides spacious accommodation for families, couples and groups. Visitors can enjoy comfortable rooms, peaceful surroundings and convenient services during their stay in Tiruvannamalai.",

        location:
            "Tiruvannamalai",

        mapQuery:
            "Athena Hotel Tiruvannamalai",

        checkIn: "1:00 PM",
        checkOut: "11:00 AM",

        images: [
            "images/card_images/hotels.jpg",
            "images/hotel2.jpg",
            "images/hotel1.jpg"
        ],

        amenities: [
            "📶 Wi-Fi",
            "🏊 Swimming Pool",
            "🍽️ Restaurant",
            "🅿️ Parking",
            "❄️ Air Conditioning",
            "👨‍👩‍👧 Family Rooms",
            "🛎️ Reception",
            "🚿 Hot Water"
        ],

        rooms: [
            {
                name: "Premium Room",
                description: "Comfortable premium room for two guests.",
                price: "₹4,000 onwards"
            },
            {
                name: "Family Room",
                description: "Spacious room for families and small groups.",
                price: "₹5,000 onwards"
            },
            {
                name: "Suite",
                description: "Large suite with comfortable seating area.",
                price: "₹6,500 onwards"
            }
        ],

        nearby: [
            ["🛕 Temple", "Short drive"],
            ["🧘 Ramana Ashram", "Nearby"],
            ["🚶 Girivalam Route", "Nearby"],
            ["🚌 Bus Stand", "Short drive"]
        ]
    }

};


const defaultHotelKey =
    "hotel-arunachala";

const queryParameters =
    new URLSearchParams(
        window.location.search
    );

const hotelKey =
    queryParameters.get("hotel") ||
    defaultHotelKey;

const selectedHotel =
    hotelData[hotelKey] ||
    hotelData[defaultHotelKey];


let currentGalleryIndex = 0;


function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


function buildMapUrl(query) {

    return (
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(query)
    );
}


function renderRooms() {

    const roomGrid =
        document.getElementById("roomGrid");

    roomGrid.innerHTML = "";

    selectedHotel.rooms.forEach(function (room) {

        const card =
            document.createElement("article");

        card.className = "room-card";

        card.innerHTML = `
            <div class="room-icon">🛏️</div>
            <h3>${room.name}</h3>
            <p>${room.description}</p>
            <strong>${room.price}</strong>
        `;

        roomGrid.appendChild(card);
    });
}


function renderAmenities() {

    const container =
        document.getElementById(
            "amenitiesList"
        );

    container.innerHTML = "";

    selectedHotel.amenities.forEach(
        function (amenity) {

            const item =
                document.createElement("div");

            item.className =
                "amenity-item";

            item.textContent =
                amenity;

            container.appendChild(item);
        }
    );
}


function renderNearbyPlaces() {

    const nearbyGrid =
        document.getElementById(
            "nearbyGrid"
        );

    nearbyGrid.innerHTML = "";

    selectedHotel.nearby.forEach(
        function (place) {

            const item =
                document.createElement("div");

            item.className =
                "nearby-item";

            item.innerHTML = `
                <span>${place[0]}</span>
                <strong>${place[1]}</strong>
            `;

            nearbyGrid.appendChild(item);
        }
    );
}


function updateGallery() {

    const galleryImage =
        document.getElementById(
            "galleryImage"
        );

    const galleryCounter =
        document.getElementById(
            "galleryCounter"
        );

    galleryImage.src =
        selectedHotel.images[
            currentGalleryIndex
        ];

    galleryImage.alt =
        `${selectedHotel.name} photo ${
            currentGalleryIndex + 1
        }`;

    galleryCounter.textContent =
        `${currentGalleryIndex + 1} / ${
            selectedHotel.images.length
        }`;
}


function changeGallery(direction) {

    currentGalleryIndex += direction;

    if (currentGalleryIndex < 0) {
        currentGalleryIndex =
            selectedHotel.images.length - 1;
    }

    if (
        currentGalleryIndex >=
        selectedHotel.images.length
    ) {
        currentGalleryIndex = 0;
    }

    updateGallery();
}


function initializeHotelPage() {

    document.title =
        `${selectedHotel.name} | Tiruvannamalai Guide`;

    setText(
        "hotelCategory",
        selectedHotel.category
    );

    setText(
        "hotelName",
        selectedHotel.name
    );

    setText(
        "hotelShortDescription",
        selectedHotel.shortDescription
    );

    setText(
        "aboutHeading",
        `About ${selectedHotel.name}`
    );

    setText(
        "hotelDescription",
        selectedHotel.description
    );

    setText(
        "hotelLocation",
        selectedHotel.location
    );

    setText(
        "checkInTime",
        selectedHotel.checkIn
    );

    setText(
        "checkOutTime",
        selectedHotel.checkOut
    );

    setText(
        "sidebarCategory",
        selectedHotel.category
    );


    const heroImage =
        document.getElementById(
            "heroHotelImage"
        );

    heroImage.src =
        selectedHotel.images[0];

    heroImage.alt =
        selectedHotel.name;


    const bookingUrl =
        `hotel-booking.html?hotel=${encodeURIComponent(
            hotelKey
        )}`;

    document.getElementById(
        "heroBookButton"
    ).href = bookingUrl;

    document.getElementById(
        "sidebarBookButton"
    ).href = bookingUrl;


    const mapUrl =
        buildMapUrl(
            selectedHotel.mapQuery
        );

    document.getElementById(
        "heroMapButton"
    ).href = mapUrl;


    renderRooms();
    renderAmenities();
    renderNearbyPlaces();
    updateGallery();
}


document.getElementById(
    "galleryPrevious"
).addEventListener(
    "click",
    function () {
        changeGallery(-1);
    }
);


document.getElementById(
    "galleryNext"
).addEventListener(
    "click",
    function () {
        changeGallery(1);
    }
);


document.getElementById(
    "galleryImage"
).addEventListener(
    "click",
    function () {

        const popup =
            document.getElementById(
                "imagePopup"
            );

        document.getElementById(
            "popupImage"
        ).src =
            selectedHotel.images[
                currentGalleryIndex
            ];

        popup.classList.add("show");

        popup.setAttribute(
            "aria-hidden",
            "false"
        );
    }
);


document.getElementById(
    "closeImagePopup"
).addEventListener(
    "click",
    function () {

        const popup =
            document.getElementById(
                "imagePopup"
            );

        popup.classList.remove("show");

        popup.setAttribute(
            "aria-hidden",
            "true"
        );
    }
);


document.addEventListener(
    "DOMContentLoaded",
    initializeHotelPage
);