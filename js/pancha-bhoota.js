document.addEventListener(
    "DOMContentLoaded",
    function () {

        // =========================================
        // MOBILE NAVIGATION
        // =========================================

        const mobileMenuButton =
            document.getElementById(
                "mobileMenuButton"
            );

        const panchaNavLinks =
            document.getElementById(
                "panchaNavLinks"
            );


        if (
            mobileMenuButton &&
            panchaNavLinks
        ) {

            mobileMenuButton.addEventListener(
                "click",
                function () {

                    panchaNavLinks.classList.toggle(
                        "active"
                    );

                    mobileMenuButton.textContent =
                        panchaNavLinks.classList.contains(
                            "active"
                        )
                            ? "✕"
                            : "☰";

                }
            );

        }


        // =========================================
        // ELEMENT IMAGE SLIDER
        // =========================================

        const elementSliderTrack =
            document.getElementById(
                "elementSliderTrack"
            );

        const elementPrev =
            document.getElementById(
                "elementPrev"
            );

        const elementNext =
            document.getElementById(
                "elementNext"
            );

        const sliderDots =
            document.getElementById(
                "sliderDots"
            );

        const elementSlides =
            elementSliderTrack
                ? Array.from(
                    elementSliderTrack.querySelectorAll(
                        ".element-slide"
                    )
                )
                : [];

        let currentSlideIndex = 0;
        let sliderTimer = null;


        function createSliderDots() {

            if (!sliderDots) {
                return;
            }

            sliderDots.innerHTML = "";

            elementSlides.forEach(
                function (slide, index) {

                    const dot =
                        document.createElement(
                            "button"
                        );

                    dot.type = "button";

                    dot.className =
                        "slider-dot";

                    dot.setAttribute(
                        "aria-label",
                        "Show temple " + (index + 1)
                    );

                    dot.addEventListener(
                        "click",
                        function () {

                            showElementSlide(index);

                            restartElementSlider();

                        }
                    );

                    sliderDots.appendChild(dot);

                }
            );

        }


        function updateSliderDots() {

            if (!sliderDots) {
                return;
            }

            const dots =
                sliderDots.querySelectorAll(
                    ".slider-dot"
                );

            dots.forEach(
                function (dot, index) {

                    dot.classList.toggle(
                        "active",
                        index === currentSlideIndex
                    );

                }
            );

        }


        function showElementSlide(index) {

            if (
                !elementSliderTrack ||
                elementSlides.length === 0
            ) {
                return;
            }

            if (index < 0) {
                index =
                    elementSlides.length - 1;
            }

            if (
                index >=
                elementSlides.length
            ) {
                index = 0;
            }

            currentSlideIndex = index;

            elementSliderTrack.scrollTo({
                left:
                    elementSliderTrack.clientWidth *
                    currentSlideIndex,
                behavior: "smooth"
            });

            updateSliderDots();

        }


        function showNextElementSlide() {

            showElementSlide(
                currentSlideIndex + 1
            );

        }


        function showPreviousElementSlide() {

            showElementSlide(
                currentSlideIndex - 1
            );

        }


        function stopElementSlider() {

            if (sliderTimer) {

                window.clearInterval(
                    sliderTimer
                );

                sliderTimer = null;

            }

        }


        function startElementSlider() {

            if (
                !elementSliderTrack ||
                elementSlides.length === 0
            ) {
                return;
            }

            stopElementSlider();

            sliderTimer =
                window.setInterval(
                    showNextElementSlide,
                    4000
                );

        }


        function restartElementSlider() {

            stopElementSlider();
            startElementSlider();

        }


        if (elementNext) {

            elementNext.addEventListener(
                "click",
                function () {

                    showNextElementSlide();
                    restartElementSlider();

                }
            );

        }


        if (elementPrev) {

            elementPrev.addEventListener(
                "click",
                function () {

                    showPreviousElementSlide();
                    restartElementSlider();

                }
            );

        }


        if (elementSliderTrack) {

            elementSliderTrack.addEventListener(
                "mouseenter",
                stopElementSlider
            );

            elementSliderTrack.addEventListener(
                "mouseleave",
                startElementSlider
            );

        }


        window.addEventListener(
            "resize",
            function () {

                if (!elementSliderTrack) {
                    return;
                }

                elementSliderTrack.scrollTo({
                    left:
                        elementSliderTrack.clientWidth *
                        currentSlideIndex,
                    behavior: "auto"
                });

            }
        );


        createSliderDots();
        showElementSlide(0);
        startElementSlider();


        // =========================================
        // SEARCH TEMPLE CARDS
        // =========================================

        const panchaSearch =
            document.getElementById(
                "panchaSearch"
            );

        const clearSearchButton =
            document.getElementById(
                "clearSearchButton"
            );

        const panchaCards =
            document.querySelectorAll(
                ".pancha-temple-card"
            );

        const noResults =
            document.getElementById(
                "noResults"
            );


        function filterPanchaTemples() {

            if (!panchaSearch) {
                return;
            }

            const searchValue =
                panchaSearch.value
                    .trim()
                    .toLowerCase();

            let visibleCards = 0;


            panchaCards.forEach(
                function (card) {

                    const searchData =
                        (
                            card.dataset.name || ""
                        ).toLowerCase();

                    const isVisible =
                        searchData.includes(
                            searchValue
                        );

                    card.style.display =
                        isVisible
                            ? "block"
                            : "none";

                    if (isVisible) {
                        visibleCards += 1;
                    }

                }
            );


            if (noResults) {

                noResults.style.display =
                    visibleCards === 0
                        ? "block"
                        : "none";

            }

        }


        if (panchaSearch) {

            panchaSearch.addEventListener(
                "input",
                filterPanchaTemples
            );

        }


        if (
            clearSearchButton &&
            panchaSearch
        ) {

            clearSearchButton.addEventListener(
                "click",
                function () {

                    panchaSearch.value = "";

                    filterPanchaTemples();

                    panchaSearch.focus();

                }
            );

        }


        // =========================================
        // TEMPLE INFORMATION
        // =========================================

        const templeInformation = {

            earth: {
                icon: "🌍",
                element: "Earth Element",
                title:
                    "Ekambareswarar Temple",
                location:
                    "Kanchipuram, Tamil Nadu",
                description:
                    "Ekambareswarar Temple is one of the most important Shiva temples in Kanchipuram. Lord Shiva is worshipped here as Prithvi Lingam, representing the Earth element.",
                significance:
                    "The Earth element represents stability, patience, strength, fertility and the physical foundation of life."
            },

            water: {
                icon: "💧",
                element: "Water Element",
                title:
                    "Jambukeswarar Temple",
                location:
                    "Thiruvanaikaval, Tamil Nadu",
                description:
                    "Jambukeswarar Temple is located near Tiruchirappalli. The Shiva Lingam is associated with a natural underground water source and represents the Water element.",
                significance:
                    "Water represents purity, emotion, compassion, adaptability and the continuous flow of life."
            },

            fire: {
                icon: "🔥",
                element: "Fire Element",
                title:
                    "Arunachaleswarar Temple",
                location:
                    "Tiruvannamalai, Tamil Nadu",
                description:
                    "Arunachaleswarar Temple represents the Fire element. Lord Shiva is worshipped as Arunachala, and the sacred Arunachala Hill is considered a manifestation of Shiva.",
                significance:
                    "Fire represents transformation, spiritual illumination, courage, energy and the destruction of ignorance."
            },

            air: {
                icon: "🌬️",
                element: "Air Element",
                title:
                    "Srikalahasteeswara Temple",
                location:
                    "Srikalahasti, Andhra Pradesh",
                description:
                    "Srikalahasteeswara Temple represents the Air element. Lord Shiva is worshipped as Vayu Lingam, symbolizing the invisible movement of life energy.",
                significance:
                    "Air represents breath, movement, freedom, communication and the life force present in all living beings."
            },

            space: {
                icon: "✨",
                element: "Space Element",
                title:
                    "Thillai Nataraja Temple",
                location:
                    "Chidambaram, Tamil Nadu",
                description:
                    "At Chidambaram, Shiva is worshipped as Nataraja, the cosmic dancer, and also as the invisible Akasha Lingam representing the Space element.",
                significance:
                    "Space represents consciousness, openness, infinity, silence and the divine field in which all creation exists."
            }

        };


        // =========================================
        // MODAL
        // =========================================

        const templeModal =
            document.getElementById(
                "templeModal"
            );

        const modalClose =
            document.getElementById(
                "modalClose"
            );

        const modalElementIcon =
            document.getElementById(
                "modalElementIcon"
            );

        const modalElementName =
            document.getElementById(
                "modalElementName"
            );

        const modalTitle =
            document.getElementById(
                "modalTitle"
            );

        const modalLocation =
            document.getElementById(
                "modalLocation"
            );

        const modalDescription =
            document.getElementById(
                "modalDescription"
            );

        const modalSignificance =
            document.getElementById(
                "modalSignificance"
            );


        function openTempleModal(
            templeKey
        ) {

            const temple =
                templeInformation[
                    templeKey
                ];

            if (
                !temple ||
                !templeModal
            ) {
                return;
            }

            modalElementIcon.textContent =
                temple.icon;

            modalElementName.textContent =
                temple.element;

            modalTitle.textContent =
                temple.title;

            modalLocation.textContent =
                "📍 " + temple.location;

            modalDescription.textContent =
                temple.description;

            modalSignificance.textContent =
                temple.significance;

            templeModal.classList.add(
                "open"
            );

            templeModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "modal-open"
            );

        }


        function closeTempleModal() {

            if (!templeModal) {
                return;
            }

            templeModal.classList.remove(
                "open"
            );

            templeModal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }


        const knowMoreButtons =
            document.querySelectorAll(
                ".know-more-button"
            );


        knowMoreButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openTempleModal(
                            button.dataset.temple
                        );

                    }
                );

            }
        );


        if (modalClose) {

            modalClose.addEventListener(
                "click",
                closeTempleModal
            );

        }


        if (templeModal) {

            templeModal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target.classList.contains(
                            "modal-overlay"
                        )
                    ) {
                        closeTempleModal();
                    }

                }
            );

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    templeModal &&
                    templeModal.classList.contains(
                        "open"
                    )
                ) {
                    closeTempleModal();
                }

            }
        );

    }
);