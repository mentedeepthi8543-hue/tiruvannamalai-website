document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // MOBILE MENU
    // =========================================

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const navigationLinks =
        document.getElementById("jyotiNavLinks");

    if (mobileMenuButton && navigationLinks) {

        mobileMenuButton.addEventListener(
            "click",
            function () {

                navigationLinks.classList.toggle("active");

                mobileMenuButton.textContent =
                    navigationLinks.classList.contains("active")
                        ? "✕"
                        : "☰";

            }
        );

    }


    // =========================================
    // SEARCH DETAILED CARDS
    // =========================================

    const searchInput =
        document.getElementById("jyotirlingaSearch");

    const clearSearchButton =
        document.getElementById("clearSearchButton");

    const cards =
        document.querySelectorAll(".jyotirlinga-card");

    const noResults =
        document.getElementById("noResults");


    function filterJyotirlingas() {

        if (!searchInput) {
            return;
        }

        const searchValue =
            searchInput.value
                .trim()
                .toLowerCase();

        let visibleCards = 0;

        cards.forEach(function (card) {

            const searchData =
                (
                    card.dataset.name || ""
                ).toLowerCase();

            const isVisible =
                searchData.includes(searchValue);

            card.style.display =
                isVisible ? "flex" : "none";

            if (isVisible) {
                visibleCards += 1;
            }

        });

        if (noResults) {

            noResults.style.display =
                visibleCards === 0
                    ? "block"
                    : "none";

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterJyotirlingas
        );

    }


    if (
        clearSearchButton &&
        searchInput
    ) {

        clearSearchButton.addEventListener(
            "click",
            function () {

                searchInput.value = "";

                filterJyotirlingas();

                searchInput.focus();

            }
        );

    }


    // =========================================
    // TEMPLE INFORMATION
    // =========================================

    const templeInformation = {

        somnath: {
            title: "Somnath Jyotirlinga",
            location: "Prabhas Patan, Gujarat",
            description:
                "Somnath is traditionally revered as the first of the twelve Jyotirlingas. The temple stands near the Arabian Sea and represents endurance, faith and renewal.",
            significance:
                "The shrine symbolizes the eternal nature of devotion and the power to rebuild life after hardship."
        },

        mallikarjuna: {
            title: "Mallikarjuna Jyotirlinga",
            location: "Srisailam, Andhra Pradesh",
            description:
                "Mallikarjuna is situated on the sacred Srisailam hills beside the Krishna River. Lord Shiva is worshipped as Mallikarjuna and Goddess Parvati as Bhramaramba.",
            significance:
                "The shrine represents the divine union of Shiva and Shakti and is deeply associated with family blessings."
        },

        mahakaleshwar: {
            title: "Mahakaleshwar Jyotirlinga",
            location: "Ujjain, Madhya Pradesh",
            description:
                "Mahakaleshwar is worshipped as the Lord of Time. The temple is known for the sacred Bhasma Aarti performed during the early morning.",
            significance:
                "It reminds devotees to overcome fear, accept change and use time with spiritual awareness."
        },

        omkareshwar: {
            title: "Omkareshwar Jyotirlinga",
            location: "Mandhata Island, Madhya Pradesh",
            description:
                "Omkareshwar stands on Mandhata Island in the Narmada River. The island is traditionally believed to resemble the sacred Om symbol.",
            significance:
                "The shrine represents the primordial sound Om and the unity of all existence."
        },

        kedarnath: {
            title: "Kedarnath Jyotirlinga",
            location: "Rudraprayag, Uttarakhand",
            description:
                "Kedarnath is situated in the Himalayan mountains at a high altitude. It is surrounded by snow-covered peaks and extraordinary natural beauty.",
            significance:
                "The difficult pilgrimage symbolizes determination, surrender and spiritual purification."
        },

        bhimashankar: {
            title: "Bhimashankar Jyotirlinga",
            location: "Pune District, Maharashtra",
            description:
                "Bhimashankar is situated in the Sahyadri hills amid forests and wildlife. It is also associated with the origin of the Bhima River.",
            significance:
                "The shrine represents Shiva's power to destroy negativity and protect sincere devotees."
        },

        kashi: {
            title: "Kashi Vishwanath Jyotirlinga",
            location: "Varanasi, Uttar Pradesh",
            description:
                "Kashi Vishwanath is located in the sacred city of Varanasi beside the River Ganga. Shiva is worshipped here as Vishwanath, Lord of the Universe.",
            significance:
                "The shrine represents spiritual liberation, knowledge and freedom from fear."
        },

        trimbakeshwar: {
            title: "Trimbakeshwar Jyotirlinga",
            location: "Nashik, Maharashtra",
            description:
                "Trimbakeshwar is located near Brahmagiri Hills, traditionally regarded as the source region of the Godavari River.",
            significance:
                "It is associated with purification, sacred water and harmony between creation, preservation and transformation."
        },

        vaidyanath: {
            title: "Vaidyanath Jyotirlinga",
            location: "Deoghar, Jharkhand",
            description:
                "Vaidyanath is worshipped as the divine physician. The shrine is associated with healing, devotion and the legend of Ravana.",
            significance:
                "Devotees pray here for physical healing, emotional strength and relief from suffering."
        },

        nageshwar: {
            title: "Nageshwar Jyotirlinga",
            location: "Near Dwarka, Gujarat",
            description:
                "Nageshwar is associated with Lord Shiva's protection from poison, fear and negative influences.",
            significance:
                "The shrine inspires courage, protection and freedom from harmful thoughts."
        },

        rameshwaram: {
            title: "Rameshwaram Jyotirlinga",
            location: "Rameswaram, Tamil Nadu",
            description:
                "Ramanathaswamy Temple is closely connected with the Ramayana tradition. It is renowned for its long temple corridors and sacred water wells.",
            significance:
                "The shrine represents humility, devotion, duty and the harmony between Lord Rama and Lord Shiva."
        },

        grishneshwar: {
            title: "Grishneshwar Jyotirlinga",
            location: "Ellora, Maharashtra",
            description:
                "Grishneshwar is located near the famous Ellora Caves. It is traditionally regarded as the twelfth Jyotirlinga.",
            significance:
                "The shrine represents faith, compassion and the transformation of sorrow into devotion."
        }

    };


    // =========================================
    // MODAL
    // =========================================

    const modal =
        document.getElementById("templeModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalLocation =
        document.getElementById("modalLocation");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalSignificance =
        document.getElementById("modalSignificance");


    function openTempleModal(templeKey) {

        const temple =
            templeInformation[templeKey];

        if (
            !temple ||
            !modal ||
            !modalTitle ||
            !modalLocation ||
            !modalDescription ||
            !modalSignificance
        ) {
            return;
        }

        modalTitle.textContent =
            temple.title;

        modalLocation.textContent =
            "📍 " + temple.location;

        modalDescription.textContent =
            temple.description;

        modalSignificance.textContent =
            temple.significance;

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeTempleModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    const detailsButtons =
        document.querySelectorAll(".details-button");

    detailsButtons.forEach(
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


    if (modal) {

        modal.addEventListener(
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
                modal &&
                modal.classList.contains("open")
            ) {
                closeTempleModal();
            }

        }
    );


    // =========================================
    // JYOTIRLINGA IMAGE SCROLLER
    // =========================================

    const jyotiImageTrack =
        document.getElementById("jyotiImageTrack");

    const jyotiImagePrev =
        document.getElementById("jyotiImagePrev");

    const jyotiImageNext =
        document.getElementById("jyotiImageNext");

    let jyotiImageTimer = null;


    function getScrollAmount() {

        if (!jyotiImageTrack) {
            return 342;
        }

        const firstCard =
            jyotiImageTrack.querySelector(
                ".jyoti-image-card"
            );

        if (!firstCard) {
            return 342;
        }

        const trackStyles =
            window.getComputedStyle(
                jyotiImageTrack
            );

        const gap =
            parseFloat(
                trackStyles.columnGap ||
                trackStyles.gap ||
                "22"
            );

        return firstCard.offsetWidth + gap;

    }


    function moveJyotiImages(direction) {

        if (!jyotiImageTrack) {
            return;
        }

        jyotiImageTrack.scrollBy({
            left:
                direction *
                getScrollAmount(),
            behavior: "smooth"
        });

    }


    function stopJyotiImageSlider() {

        if (jyotiImageTimer) {

            window.clearInterval(
                jyotiImageTimer
            );

            jyotiImageTimer = null;

        }

    }


    function startJyotiImageSlider() {

        if (!jyotiImageTrack) {
            return;
        }

        stopJyotiImageSlider();

        jyotiImageTimer =
            window.setInterval(
                function () {

                    const reachedEnd =
                        jyotiImageTrack.scrollLeft +
                        jyotiImageTrack.clientWidth >=
                        jyotiImageTrack.scrollWidth - 10;

                    if (reachedEnd) {

                        jyotiImageTrack.scrollTo({
                            left: 0,
                            behavior: "smooth"
                        });

                    } else {

                        moveJyotiImages(1);

                    }

                },
                3000
            );

    }


    if (jyotiImagePrev) {

        jyotiImagePrev.addEventListener(
            "click",
            function () {

                moveJyotiImages(-1);
                startJyotiImageSlider();

            }
        );

    }


    if (jyotiImageNext) {

        jyotiImageNext.addEventListener(
            "click",
            function () {

                moveJyotiImages(1);
                startJyotiImageSlider();

            }
        );

    }


    if (jyotiImageTrack) {

        jyotiImageTrack.addEventListener(
            "mouseenter",
            stopJyotiImageSlider
        );

        jyotiImageTrack.addEventListener(
            "mouseleave",
            startJyotiImageSlider
        );

        jyotiImageTrack.addEventListener(
            "focusin",
            stopJyotiImageSlider
        );

        jyotiImageTrack.addEventListener(
            "focusout",
            startJyotiImageSlider
        );

        startJyotiImageSlider();

    }

});