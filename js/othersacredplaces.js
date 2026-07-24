document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // MOBILE NAVIGATION
    // =========================================

    const mobileMenuButton = document.getElementById(
        "mobileMenuButton"
    );

    const navbarMenu = document.getElementById(
        "navbarMenu"
    );

    if (mobileMenuButton && navbarMenu) {

        mobileMenuButton.addEventListener(
            "click",
            function () {

                navbarMenu.classList.toggle(
                    "active"
                );

                if (
                    navbarMenu.classList.contains(
                        "active"
                    )
                ) {
                    mobileMenuButton.textContent = "✕";
                } else {
                    mobileMenuButton.textContent = "☰";
                }

            }
        );

        const navigationLinks =
            navbarMenu.querySelectorAll("a");

        navigationLinks.forEach(
            function (navigationLink) {

                navigationLink.addEventListener(
                    "click",
                    function () {

                        navbarMenu.classList.remove(
                            "active"
                        );

                        mobileMenuButton.textContent =
                            "☰";

                    }
                );

            }
        );

    }


    // =========================================
    // IMAGE SLIDERS
    // =========================================

    const sliders =
        document.querySelectorAll("[data-slider]");

    sliders.forEach(
        function (slider) {

            const track =
                slider.querySelector(".slider-track");

            const images =
                slider.querySelectorAll(
                    ".slider-track img"
                );

            const previousButton =
                slider.querySelector(
                    ".slider-previous"
                );

            const nextButton =
                slider.querySelector(
                    ".slider-next"
                );

            const dotsContainer =
                slider.querySelector(
                    ".slider-dots"
                );

            let currentImageIndex = 0;
            let autoSlideInterval = null;


            // Create navigation dots

            images.forEach(
                function (image, imageIndex) {

                    const dot =
                        document.createElement(
                            "button"
                        );

                    dot.type = "button";
                    dot.className = "slider-dot";

                    dot.setAttribute(
                        "aria-label",
                        "Show image " +
                        (imageIndex + 1)
                    );

                    dot.addEventListener(
                        "click",
                        function () {

                            currentImageIndex =
                                imageIndex;

                            updateSlider();
                            restartAutoSlide();

                        }
                    );

                    dotsContainer.appendChild(dot);

                }
            );


            const dots =
                dotsContainer.querySelectorAll(
                    ".slider-dot"
                );


            function updateSlider() {

                track.style.transform =
                    "translateX(-" +
                    currentImageIndex * 100 +
                    "%)";

                dots.forEach(
                    function (dot, dotIndex) {

                        dot.classList.toggle(
                            "active",
                            dotIndex ===
                            currentImageIndex
                        );

                    }
                );

            }


            function showNextImage() {

                currentImageIndex =
                    (currentImageIndex + 1) %
                    images.length;

                updateSlider();

            }


            function showPreviousImage() {

                currentImageIndex =
                    (
                        currentImageIndex -
                        1 +
                        images.length
                    ) %
                    images.length;

                updateSlider();

            }


            function startAutoSlide() {

                autoSlideInterval =
                    window.setInterval(
                        showNextImage,
                        4500
                    );

            }


            function stopAutoSlide() {

                if (autoSlideInterval) {

                    window.clearInterval(
                        autoSlideInterval
                    );

                    autoSlideInterval = null;

                }

            }


            function restartAutoSlide() {

                stopAutoSlide();
                startAutoSlide();

            }


            previousButton.addEventListener(
                "click",
                function () {

                    showPreviousImage();
                    restartAutoSlide();

                }
            );


            nextButton.addEventListener(
                "click",
                function () {

                    showNextImage();
                    restartAutoSlide();

                }
            );


            slider.addEventListener(
                "mouseenter",
                stopAutoSlide
            );


            slider.addEventListener(
                "mouseleave",
                startAutoSlide
            );


            // Touch swipe support

            let touchStartX = 0;
            let touchEndX = 0;

            slider.addEventListener(
                "touchstart",
                function (event) {

                    touchStartX =
                        event.changedTouches[0]
                            .screenX;

                    stopAutoSlide();

                },
                {
                    passive: true
                }
            );


            slider.addEventListener(
                "touchend",
                function (event) {

                    touchEndX =
                        event.changedTouches[0]
                            .screenX;

                    const swipeDistance =
                        touchStartX -
                        touchEndX;

                    if (
                        Math.abs(swipeDistance) >
                        50
                    ) {

                        if (swipeDistance > 0) {
                            showNextImage();
                        } else {
                            showPreviousImage();
                        }

                    }

                    startAutoSlide();

                },
                {
                    passive: true
                }
            );


            updateSlider();
            startAutoSlide();

        }
    );


    // =========================================
    // LANGUAGE SELECTOR
    // =========================================

    const languageSelect =
        document.getElementById(
            "languageSelect"
        );

    if (languageSelect) {

        languageSelect.addEventListener(
            "change",
            function () {

                const selectedLanguage =
                    languageSelect.value;

                document.documentElement.lang =
                    selectedLanguage;

                /*
                Connect this section to your
                translations.js file later.
                */

            }
        );

    }

});