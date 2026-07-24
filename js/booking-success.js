"use strict";


/* =====================================================
   ELEMENTS
===================================================== */

const noBookingCard =
    document.getElementById("noBookingCard");

const ticketWrapper =
    document.getElementById("ticketWrapper");

const digitalTicket =
    document.getElementById("digitalTicket");

const downloadTicketButton =
    document.getElementById(
        "downloadTicketButton"
    );

const saveQrButton =
    document.getElementById(
        "saveQrButton"
    );

const printTicketButton =
    document.getElementById(
        "printTicketButton"
    );

let currentBooking = null;


/* =====================================================
   UTILITIES
===================================================== */

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );

    if (element) {
        element.textContent =
            value ?? "—";
    }
}


function formatDisplayDate(dateString) {

    if (!dateString) {
        return "—";
    }

    const date =
        new Date(
            `${dateString}T00:00:00`
        );

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    ).format(date);
}


function maskIdNumber(idNumber) {

    const value =
        String(idNumber || "");

    if (value.length <= 4) {
        return value;
    }

    const visiblePart =
        value.slice(-4);

    return `${"*".repeat(
        Math.max(
            4,
            value.length - 4
        )
    )}${visiblePart}`;
}


/* =====================================================
   READ BOOKING
===================================================== */

function readCurrentBooking() {

    try {

        const storedBooking =
            localStorage.getItem(
                "currentTempleBooking"
            );

        if (!storedBooking) {
            return null;
        }

        const parsedBooking =
            JSON.parse(storedBooking);

        if (
            !parsedBooking ||
            !parsedBooking.bookingId
        ) {
            return null;
        }

        return parsedBooking;

    } catch (error) {

        console.error(
            "Could not read booking data:",
            error
        );

        return null;
    }
}


/* =====================================================
   DISPLAY TICKET
===================================================== */

function displayTicket(booking) {

    setText(
        "ticketBookingId",
        booking.bookingId
    );

    setText(
        "qrBookingId",
        booking.bookingId
    );

    setText(
        "ticketFullName",
        booking.fullName
    );

    setText(
        "ticketVisitDate",
        formatDisplayDate(
            booking.visitDate
        )
    );

    setText(
        "ticketTimeSlot",
        booking.timeSlot
    );

    setText(
        "ticketPersons",
        booking.numberOfPersons
    );

    setText(
        "ticketDarshanType",
        booking.darshanType
    );

    setText(
        "ticketPoojaType",
        booking.poojaType
    );

    setText(
        "ticketAgeGender",
        `${booking.age} / ${booking.gender}`
    );

    setText(
        "ticketPhone",
        `+91 ${booking.phone}`
    );

    setText(
        "ticketIdProof",
        `${booking.idProofType} - ${maskIdNumber(
            booking.idNumber
        )}`
    );

    setText(
        "ticketEntryStatus",
        booking.entryStatus || "Not Used"
    );
}


/* =====================================================
   QR CODE
===================================================== */

function createQrCode(booking) {

    const qrContainer =
        document.getElementById(
            "qrcode"
        );

    if (!qrContainer) {
        return;
    }

    qrContainer.innerHTML = "";


    const qrTicketData =
    `Booking ID: ${booking.bookingId}
Name: ${booking.fullName}
Members: ${booking.numberOfPersons}
Date: ${booking.visitDate}
Slot: ${booking.timeSlot}
Status: Valid`;



    if (
        typeof window.QRCode ===
        "undefined"
    ) {

        qrContainer.innerHTML = `
            <p style="
                padding:15px;
                color:#b23b22;
                font-size:12px;
                line-height:1.5;
            ">
                QR library did not load.
                Please check your internet connection
                and refresh the page.
            </p>
        `;

        return;
    }


    new QRCode(
    qrContainer,
    {
        text: qrTicketData,

        width: 175,
        height: 175,

        colorDark: "#173c30",
        colorLight: "#ffffff",

        correctLevel:
            QRCode.CorrectLevel.M
    }
);
}


/* =====================================================
   DOWNLOAD TICKET
===================================================== */

async function downloadTicket() {

    if (
        !digitalTicket ||
        typeof window.html2canvas ===
            "undefined"
    ) {

        alert(
            "Ticket download library did not load. Check the internet and refresh."
        );

        return;
    }


    downloadTicketButton.disabled =
        true;

    downloadTicketButton.textContent =
        "Preparing Ticket...";


    try {

        const canvas =
            await window.html2canvas(
                digitalTicket,
                {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff"
                }
            );


        const downloadLink =
            document.createElement("a");

        downloadLink.download =
            `${currentBooking.bookingId}-ticket.png`;

        downloadLink.href =
            canvas.toDataURL(
                "image/png"
            );

        document.body.appendChild(
            downloadLink
        );

        downloadLink.click();

        downloadLink.remove();

    } catch (error) {

        console.error(
            "Ticket download failed:",
            error
        );

        alert(
            "Unable to download the ticket. Please try again."
        );

    } finally {

        downloadTicketButton.disabled =
            false;

        downloadTicketButton.textContent =
            "⬇ Download Ticket";
    }
}


/* =====================================================
   SAVE QR
===================================================== */

function saveQrImage() {

    const qrContainer =
        document.getElementById(
            "qrcode"
        );

    if (!qrContainer) {
        return;
    }


    const qrCanvas =
        qrContainer.querySelector(
            "canvas"
        );

    const qrImage =
        qrContainer.querySelector(
            "img"
        );

    let imageData = "";


    if (qrCanvas) {

        imageData =
            qrCanvas.toDataURL(
                "image/png"
            );

    } else if (qrImage) {

        imageData =
            qrImage.src;
    }


    if (!imageData) {

        alert(
            "QR code is not ready yet. Please wait and try again."
        );

        return;
    }


    const downloadLink =
        document.createElement("a");

    downloadLink.download =
        `${currentBooking.bookingId}-QR.png`;

    downloadLink.href =
        imageData;

    document.body.appendChild(
        downloadLink
    );

    downloadLink.click();

    downloadLink.remove();
}


/* =====================================================
   PRINT
===================================================== */

function printTicket() {

    window.print();
}


/* =====================================================
   INITIALIZE
===================================================== */

function initializePage() {

    currentBooking =
        readCurrentBooking();


    if (!currentBooking) {

        if (noBookingCard) {
            noBookingCard.hidden =
                false;
        }

        if (ticketWrapper) {
            ticketWrapper.hidden =
                true;
        }

        return;
    }


    if (noBookingCard) {
        noBookingCard.hidden =
            true;
    }

    if (ticketWrapper) {
        ticketWrapper.hidden =
            false;
    }


    displayTicket(
        currentBooking
    );


    window.setTimeout(
        function () {

            createQrCode(
                currentBooking
            );

        },
        100
    );
}


/* =====================================================
   EVENTS
===================================================== */

if (downloadTicketButton) {

    downloadTicketButton.addEventListener(
        "click",
        downloadTicket
    );
}


if (saveQrButton) {

    saveQrButton.addEventListener(
        "click",
        saveQrImage
    );
}


if (printTicketButton) {

    printTicketButton.addEventListener(
        "click",
        printTicket
    );
}


document.addEventListener(
    "DOMContentLoaded",
    initializePage
);