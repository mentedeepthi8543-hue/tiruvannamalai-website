const chantCards = document.querySelectorAll(".chant-card");
const mainChantPlayer = document.getElementById("mainChantPlayer");

chantCards.forEach((card) => {

    card.addEventListener("click", () => {

        const videoId = card.dataset.video;

        if (!videoId || videoId.startsWith("VIDEO_ID")) {

            alert(
                "Please add the YouTube video ID inside this chant card."
            );

            return;
        }

        chantCards.forEach((item) => {
            item.classList.remove("active");
        });

        card.classList.add("active");

        mainChantPlayer.src =
            `https://www.youtube.com/embed/${videoId}?autoplay=1`;

        document
            .getElementById("featuredChant")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});