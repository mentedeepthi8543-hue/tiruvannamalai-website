"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("hotelSearchInput");
    const filterButtons = document.querySelectorAll(".hotel-filter-button");
    const hotelCards = document.querySelectorAll(".all-hotel-card");
    const visibleHotelCount = document.getElementById("visibleHotelCount");

    let selectedFilter = "all";

    function filterHotels() {
        const searchText = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        let visibleCount = 0;

        hotelCards.forEach(function (card) {
            const hotelName = (
                card.dataset.name || ""
            ).toLowerCase();

            const categories = (
                card.dataset.category || ""
            ).toLowerCase();

            const matchesSearch =
                hotelName.includes(searchText);

            const matchesFilter =
                selectedFilter === "all" ||
                categories.includes(selectedFilter);

            const shouldShow =
                matchesSearch && matchesFilter;

            card.style.display = shouldShow ? "" : "none";

            if (shouldShow) {
                visibleCount++;
            }
        });

        if (visibleHotelCount) {
            visibleHotelCount.textContent = visibleCount;
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterHotels);
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            selectedFilter =
                button.dataset.filter || "all";

            filterHotels();
        });
    });

    filterHotels();
});