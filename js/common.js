/* =========================================================
   COMMON JAVASCRIPT
   Shared functions used by multiple website pages
========================================================= */

function getIndiaTime() {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).formatToParts(new Date());

    let hour = 0;
    let minute = 0;

    parts.forEach(function (part) {
        if (part.type === "hour") {
            hour = Number(part.value);
        }

        if (part.type === "minute") {
            minute = Number(part.value);
        }
    });

    return {
        hour: hour,
        minute: minute,
        totalMinutes: (hour * 60) + minute
    };
}

function getPeriod(hour) {
    if (hour >= 4 && hour < 8) {
        return {
            name: "Early Morning",
            key: "early"
        };
    }

    if (hour >= 8 && hour < 11) {
        return {
            name: "Morning",
            key: "morning"
        };
    }

    if (hour >= 11 && hour < 16) {
        return {
            name: "Afternoon",
            key: "afternoon"
        };
    }

    if (hour >= 16 && hour < 19) {
        return {
            name: "Evening",
            key: "evening"
        };
    }

    return {
        name: "Night",
        key: "night"
    };
}