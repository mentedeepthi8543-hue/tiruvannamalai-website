document.addEventListener("DOMContentLoaded", function () {

    const quotes = [

        "A peaceful mind is the greatest temple in which divine wisdom can live.",

        "Strength is not always loud. Sometimes it is quietly choosing patience over anger.",

        "When the mind becomes silent, the heart begins to hear its deepest wisdom.",

        "Let your honesty become your worship and your kindness become your devotion.",

        "You cannot control every event, but you can choose how peacefully you respond.",

        "The past is a lesson, not a home. Carry its wisdom and release its pain.",

        "Discipline is the bridge between the life you imagine and the life you create.",

        "Every sunrise is another opportunity to think clearly, act kindly and begin again.",

        "Faith does not remove difficulty. It gives you courage to move through it.",

        "Chant Om Namah Shivaya through peaceful thoughts, truthful words and compassionate actions."

    ];


    const todayQuote = document.getElementById("todayQuote");
    const todayDate = document.getElementById("todayDate");
    const newQuoteButton = document.getElementById("newQuoteButton");
    const shareButtons = document.querySelectorAll(".share-quote");
    const copyMessage = document.getElementById("copyMessage");


    /* Show current date */

    const currentDate = new Date();

    todayDate.textContent = currentDate.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


    /* Daily quote based on date */

    const dayNumber = currentDate.getDate();

    const dailyQuoteIndex = dayNumber % quotes.length;

    todayQuote.textContent = quotes[dailyQuoteIndex];


    /* Show another random quote */

    newQuoteButton.addEventListener("click", function () {

        let randomIndex = Math.floor(
            Math.random() * quotes.length
        );

        todayQuote.style.opacity = "0";

        setTimeout(function () {

            todayQuote.textContent = quotes[randomIndex];

            todayQuote.style.opacity = "1";

        }, 250);

    });


    /* Copy individual quote */

    shareButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card = button.closest(".wisdom-card");

            const quote = card
                .querySelector("blockquote")
                .textContent
                .trim();

            navigator.clipboard
                .writeText(quote)
                .then(function () {

                    copyMessage.classList.add("show");

                    setTimeout(function () {

                        copyMessage.classList.remove("show");

                    }, 2000);

                })
                .catch(function () {

                    alert("Unable to copy this quote.");

                });

        });

    });

});