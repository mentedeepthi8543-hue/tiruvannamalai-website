document.addEventListener("DOMContentLoaded", function () {

    const track =
        document.getElementById("girivalamTrack");

    const slides =
        document.querySelectorAll(".girivalam-slide");

    const previousButton =
        document.getElementById("previousSlide");

    const nextButton =
        document.getElementById("nextSlide");

    const sliderDots =
        document.getElementById("sliderDots");

    let currentSlide = 0;
    let autoSlideTimer;

    if (
        !track ||
        slides.length === 0 ||
        !previousButton ||
        !nextButton ||
        !sliderDots
    ) {
        return;
    }

    slides.forEach(function (_, index) {

        const dot =
            document.createElement("button");

        dot.className =
            index === 0
                ? "slider-dot active"
                : "slider-dot";

        dot.type = "button";

        dot.setAttribute(
            "aria-label",
            "Open image " + (index + 1)
        );

        dot.addEventListener(
            "click",
            function () {

                currentSlide = index;

                updateSlider();

                restartAutoSlide();
            }
        );

        sliderDots.appendChild(dot);
    });

    function updateSlider() {

        track.style.transform =
            "translateX(-" +
            currentSlide * 100 +
            "%)";

        const dots =
            document.querySelectorAll(
                ".slider-dot"
            );

        dots.forEach(
            function (dot, index) {

                dot.classList.toggle(
                    "active",
                    index === currentSlide
                );
            }
        );
    }

    function moveNext() {

        currentSlide =
            (currentSlide + 1) %
            slides.length;

        updateSlider();
    }

    function movePrevious() {

        currentSlide =
            (currentSlide - 1 + slides.length) %
            slides.length;

        updateSlider();
    }

    function startAutoSlide() {

        autoSlideTimer =
            setInterval(
                moveNext,
                3500
            );
    }

    function stopAutoSlide() {

        clearInterval(
            autoSlideTimer
        );
    }

    function restartAutoSlide() {

        stopAutoSlide();

        startAutoSlide();
    }

    nextButton.addEventListener(
        "click",
        function () {

            moveNext();

            restartAutoSlide();
        }
    );

    previousButton.addEventListener(
        "click",
        function () {

            movePrevious();

            restartAutoSlide();
        }
    );

    track.addEventListener(
        "mouseenter",
        function () {

            stopAutoSlide();
        }
    );

    track.addEventListener(
        "mouseleave",
        function () {

            restartAutoSlide();
        }
    );

    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;
        },
        {
            passive: true
        }
    );

    track.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            if (
                touchStartX - touchEndX > 50
            ) {
                moveNext();
            }

            if (
                touchEndX - touchStartX > 50
            ) {
                movePrevious();
            }

            restartAutoSlide();
        },
        {
            passive: true
        }
    );

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.hidden
            ) {
                stopAutoSlide();
            } else {
                restartAutoSlide();
            }
        }
    );

    updateSlider();

    startAutoSlide();
});