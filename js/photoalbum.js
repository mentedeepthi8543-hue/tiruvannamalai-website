/* =====================================================
   PHOTO ALBUM DATA
===================================================== */

const photoAlbums = {

    temple: {
        title: "Arunachaleswarar Temple",
        description:
            "Temple towers, sacred architecture and beautiful views of Arunachaleswarar Temple.",

        images: [
            "images/photogallery/at1.jpg",
            "images/photogallery/at2.jpg",
            "images/photogallery/at3.jpg",
            "images/photogallery/at4.jpg",
            "images/photogallery/at5.jpg",
            "images/photogallery/at6.jpg"
        ]
    },

    girivalam: {
        title: "Girivalam",
        description:
            "Girivalam routes, devotees, spiritual maps and sacred landmarks around Arunachala Hill.",

        images: [
            "images/photogallery/g1.jpg",
            "images/photogallery/g2.jpg",
            "images/photogallery/g3.jpg",
            "images/photogallery/g4.jpg",
            "images/photogallery/g5.jpg",
            "images/photogallery/g6.jpg",
            "images/photogallery/g7.jpg",
            "images/photogallery/g8.jpg",
            "images/photogallery/g9.jpg"
        ]
    },

    meditation: {
        title: "Meditation & Ashrams",
        description:
            "Peaceful ashrams, meditation halls, saints and spiritual locations in Tiruvannamalai.",

        images: [
            "images/photogallery/ma1.jpg",
            "images/photogallery/ma2.jpg",
            "images/photogallery/ma3.jpg",
            "images/photogallery/ma4.jpg",
            "images/photogallery/ma5.jpg",
            "images/photogallery/ma6.jpg",
            "images/photogallery/ma7.jpg",
            "images/photogallery/ma8.jpg",
            "images/photogallery/ma9.jpg",
            "images/photogallery/ma10.jpg"
        ]
    },

    trekking: {
        title: "Trekking & Nature",
        description:
            "Arunachala trekking trails, Skandashramam, Virupaksha Cave, hills, steps and nature.",

        images: [
            "images/photogallery/t1.jpg",
            "images/photogallery/t2.jpg",
            "images/photogallery/t3.jpg",
            "images/photogallery/t4.jpg",
            "images/photogallery/t5.jpg",
            "images/photogallery/t6.jpg",
            "images/photogallery/t7.jpg",
            "images/photogallery/t8.jpg",
            "images/photogallery/t9.jpg",
            "images/photogallery/t10.jpg",
            "images/photogallery/t11.jpg",
            "images/photogallery/t12.jpg",
            "images/photogallery/t13.jpg"
        ]
    },

    other: {
        title: "Other Places",
        description:
            "Nearby attractions, dams, viewpoints and important places around Tiruvannamalai.",

        images: [
            "images/photogallery/o1.jpg",
            "images/photogallery/o2.jpg",
            "images/photogallery/o3.jpg"
        ]
    }

};


/* =====================================================
   VARIABLES
===================================================== */

let activeImages = [];
let activePhotoIndex = 0;


/* =====================================================
   OPEN ALBUM
===================================================== */

function openAlbum(albumName) {

    const album = photoAlbums[albumName];

    if (!album) {
        console.error("Album not found:", albumName);
        return;
    }

    const albumModal =
        document.getElementById("albumModal");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const photoGrid =
        document.getElementById("photoGrid");

    if (
        !albumModal ||
        !modalTitle ||
        !modalDescription ||
        !photoGrid
    ) {
        console.error("Album modal HTML elements are missing.");
        return;
    }

    modalTitle.textContent = album.title;
    modalDescription.textContent = album.description;

    photoGrid.innerHTML = "";
    activeImages = album.images;

    album.images.forEach(function (imagePath, index) {

        const photoItem =
            document.createElement("div");

        photoItem.className = "photo-item";

        photoItem.innerHTML = `
            <img
                src="${imagePath}"
                alt="${album.title} photo ${index + 1}"
                loading="lazy"
            >

            <div class="photo-overlay">

                <p>
                    ${album.title} ${index + 1}
                </p>

                <span class="view-icon">
                    🔍
                </span>

            </div>
        `;

        photoItem.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();
                openLightbox(index);

            }
        );

        photoGrid.appendChild(photoItem);

    });

    albumModal.classList.add("show");

    albumModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";
}


/* =====================================================
   CLOSE ALBUM
===================================================== */

function closeAlbum() {

    const albumModal =
        document.getElementById("albumModal");

    if (!albumModal) {
        return;
    }

    albumModal.classList.remove("show");

    albumModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}


/* =====================================================
   OPEN LIGHTBOX
===================================================== */

function openLightbox(index) {

    if (!activeImages.length) {
        return;
    }

    activePhotoIndex = index;

    updateLightbox();

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) {
        return;
    }

    lightbox.classList.add("show");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );
}


/* =====================================================
   UPDATE LIGHTBOX
===================================================== */

function updateLightbox() {

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCaption =
        document.getElementById("lightboxCaption");

    if (!lightboxImage || !lightboxCaption) {
        return;
    }

    lightboxImage.src =
        activeImages[activePhotoIndex];

    lightboxCaption.textContent =
        `Photo ${activePhotoIndex + 1} of ${activeImages.length}`;
}


/* =====================================================
   NEXT / PREVIOUS LIGHTBOX PHOTO
===================================================== */

function changePhoto(direction) {

    if (!activeImages.length) {
        return;
    }

    activePhotoIndex += direction;

    if (activePhotoIndex < 0) {
        activePhotoIndex =
            activeImages.length - 1;
    }

    if (
        activePhotoIndex >=
        activeImages.length
    ) {
        activePhotoIndex = 0;
    }

    updateLightbox();
}


/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("show");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =====================================================
   COVER SLIDER DATA
===================================================== */

const coverSliderData = {

    temple: photoAlbums.temple.images,

    girivalam: photoAlbums.girivalam.images,

    meditation: photoAlbums.meditation.images,

    trekking: photoAlbums.trekking.images,

    other: photoAlbums.other.images

};


const coverSliderIndexes = {
    temple: 0,
    girivalam: 0,
    meditation: 0,
    trekking: 0,
    other: 0
};


const coverSliderIntervals = {};


/* =====================================================
   SHOW COVER SLIDE
===================================================== */

function showCoverSlide(albumName, newIndex) {

    const slider = document.querySelector(
        `[data-album-slider="${albumName}"]`
    );

    const images =
        coverSliderData[albumName];

    if (!slider || !images || !images.length) {
        return;
    }

    if (newIndex < 0) {
        newIndex = images.length - 1;
    }

    if (newIndex >= images.length) {
        newIndex = 0;
    }

    coverSliderIndexes[albumName] =
        newIndex;

    const imageElement =
        slider.querySelector(".album-slide-image");

    if (!imageElement) {
        return;
    }

    imageElement.classList.add("changing");

    window.setTimeout(function () {

        imageElement.src =
            images[newIndex];

        imageElement.alt =
            `${albumName} album photo ${newIndex + 1}`;

        imageElement.classList.remove("changing");

    }, 180);

    updateCoverDots(albumName);
}


/* =====================================================
   SIDE ARROW BUTTONS
===================================================== */

function moveCoverSlide(albumName, direction) {

    const currentIndex =
        coverSliderIndexes[albumName] || 0;

    showCoverSlide(
        albumName,
        currentIndex + direction
    );

    restartCoverSlider(albumName);
}


/* =====================================================
   CREATE DOTS
===================================================== */

function createCoverDots(albumName) {

    const slider = document.querySelector(
        `[data-album-slider="${albumName}"]`
    );

    const images =
        coverSliderData[albumName];

    if (!slider || !images) {
        return;
    }

    const dotsContainer =
        slider.querySelector(".cover-dots");

    if (!dotsContainer) {
        return;
    }

    dotsContainer.innerHTML = "";

    images.forEach(function (_, index) {

        const dot =
            document.createElement("button");

        dot.type = "button";
        dot.className = "cover-dot";

        dot.setAttribute(
            "aria-label",
            `View photo ${index + 1}`
        );

        dot.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                showCoverSlide(
                    albumName,
                    index
                );

                restartCoverSlider(
                    albumName
                );

            }
        );

        dotsContainer.appendChild(dot);

    });

    updateCoverDots(albumName);
}


/* =====================================================
   UPDATE ACTIVE DOT
===================================================== */

function updateCoverDots(albumName) {

    const slider = document.querySelector(
        `[data-album-slider="${albumName}"]`
    );

    if (!slider) {
        return;
    }

    const dots =
        slider.querySelectorAll(".cover-dot");

    dots.forEach(function (dot, index) {

        dot.classList.toggle(
            "active",
            index === coverSliderIndexes[albumName]
        );

    });
}


/* =====================================================
   START AUTOMATIC SLIDER
===================================================== */

function startCoverSlider(albumName) {

    window.clearInterval(
        coverSliderIntervals[albumName]
    );

    coverSliderIntervals[albumName] =
        window.setInterval(function () {

            showCoverSlide(
                albumName,
                coverSliderIndexes[albumName] + 1
            );

        }, 3500);
}


function restartCoverSlider(albumName) {

    startCoverSlider(albumName);
}


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        const lightbox =
            document.getElementById("lightbox");

        const albumModal =
            document.getElementById("albumModal");

        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains("show")
        ) {
            closeLightbox();
            return;
        }

        if (
            event.key === "Escape" &&
            albumModal &&
            albumModal.classList.contains("show")
        ) {
            closeAlbum();
            return;
        }

        if (
            lightbox &&
            lightbox.classList.contains("show")
        ) {

            if (event.key === "ArrowRight") {
                changePhoto(1);
            }

            if (event.key === "ArrowLeft") {
                changePhoto(-1);
            }

        }

    }
);


/* =====================================================
   INITIALIZE PAGE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        Object.keys(
            coverSliderData
        ).forEach(function (albumName) {

            createCoverDots(albumName);

            showCoverSlide(
                albumName,
                0
            );

            startCoverSlider(
                albumName
            );

        });

    }
);