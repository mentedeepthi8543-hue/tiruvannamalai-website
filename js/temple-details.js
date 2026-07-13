document.addEventListener("DOMContentLoaded", function () {

    const openButton =
        document.getElementById("open360Button");

    const closeButton =
        document.getElementById("close360Button");

    const panoramaModal =
        document.getElementById("panoramaModal");

    const streetViewFrame =
        document.getElementById("templeStreetView");

    /*
        IMPORTANT:
        Replace the text below with the exact Google Street View
        embed URL copied from Google Maps.
    */

    const templeStreetViewURL =
        "PASTE_GOOGLE_STREET_VIEW_EMBED_URL_HERE";

    function openPanorama() {

        if (
            templeStreetViewURL ===
            "PASTE_GOOGLE_STREET_VIEW_EMBED_URL_HERE"
        ) {
            alert(
                "Please paste the Google Street View embed URL inside js/temple-details.js."
            );

            return;
        }

        if (!streetViewFrame || !panoramaModal) {
            return;
        }

        streetViewFrame.src =
            templeStreetViewURL;

        panoramaModal.classList.add("open");

        panoramaModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "panorama-open"
        );
    }

    function closePanorama() {

        if (!streetViewFrame || !panoramaModal) {
            return;
        }

        panoramaModal.classList.remove("open");

        panoramaModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "panorama-open"
        );

        streetViewFrame.src = "";
    }

    if (openButton) {
        openButton.addEventListener(
            "click",
            openPanorama
        );
    }

    if (closeButton) {
        closeButton.addEventListener(
            "click",
            closePanorama
        );
    }

    if (panoramaModal) {

        panoramaModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    panoramaModal
                ) {
                    closePanorama();
                }
            }
        );
    }

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                panoramaModal &&
                panoramaModal.classList.contains(
                    "open"
                )
            ) {
                closePanorama();
            }
        }
    );

});