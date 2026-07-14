"use strict";


/* =====================================================
   ELEMENTS
===================================================== */

const bookingForm =
    document.getElementById("templeBookingForm");

const summaryModal =
    document.getElementById("summaryModal");

const summaryContent =
    document.getElementById("summaryContent");

const closeSummaryButton =
    document.getElementById("closeSummaryButton");

const summaryBackdrop =
    document.getElementById("summaryBackdrop");

const editBookingButton =
    document.getElementById("editBookingButton");

const confirmBookingButton =
    document.getElementById("confirmBookingButton");

let pendingBookingData = null;


/* =====================================================
   DATE SETUP
===================================================== */

function getLocalDateString(date) {

    const year =
        date.getFullYear();

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function configureVisitDate() {

    const visitDateInput =
        document.getElementById("visitDate");

    if (!visitDateInput) {
        return;
    }

    const today =
        new Date();

    const maximumDate =
        new Date();

    maximumDate.setMonth(
        maximumDate.getMonth() + 6
    );

    visitDateInput.min =
        getLocalDateString(today);

    visitDateInput.max =
        getLocalDateString(maximumDate);
}


/* =====================================================
   FORM UTILITIES
===================================================== */

function getField(fieldId) {

    return document.getElementById(fieldId);
}


function showFieldError(
    field,
    message
) {

    if (!field) {
        return;
    }

    field.classList.add("invalid");

    const formGroup =
        field.closest(".form-group");

    if (!formGroup) {
        return;
    }

    const errorElement =
        formGroup.querySelector(
            ".error-message"
        );

    if (errorElement) {
        errorElement.textContent =
            message;
    }
}


function clearFieldError(field) {

    if (!field) {
        return;
    }

    field.classList.remove("invalid");

    const formGroup =
        field.closest(".form-group");

    if (!formGroup) {
        return;
    }

    const errorElement =
        formGroup.querySelector(
            ".error-message"
        );

    if (errorElement) {
        errorElement.textContent = "";
    }
}


function clearAllErrors() {

    document
        .querySelectorAll(
            ".form-group input, .form-group select"
        )
        .forEach(function (field) {

            clearFieldError(field);

        });

    const termsError =
        document.getElementById(
            "termsError"
        );

    if (termsError) {
        termsError.textContent = "";
    }
}


/* =====================================================
   VALIDATION
===================================================== */

function validateForm() {

    clearAllErrors();

    let isValid = true;
    let firstInvalidField = null;


    const requiredFields = [
        {
            id: "darshanType",
            message: "Please select a darshan type."
        },
        {
            id: "poojaType",
            message: "Please select a pooja type."
        },
        {
            id: "visitDate",
            message: "Please select a visit date."
        },
        {
            id: "timeSlot",
            message: "Please select a time slot."
        },
        {
            id: "numberOfPersons",
            message: "Enter the number of persons."
        },
        {
            id: "fullName",
            message: "Please enter the pilgrim name."
        },
        {
            id: "age",
            message: "Please enter the pilgrim age."
        },
        {
            id: "gender",
            message: "Please select gender."
        },
        {
            id: "phone",
            message: "Please enter a phone number."
        },
        {
            id: "email",
            message: "Please enter an email address."
        },
        {
            id: "idProofType",
            message: "Please select an ID proof."
        },
        {
            id: "idNumber",
            message: "Please enter the ID proof number."
        }
    ];


    requiredFields.forEach(
        function (fieldRule) {

            const field =
                getField(fieldRule.id);

            if (
                !field ||
                !String(field.value).trim()
            ) {

                showFieldError(
                    field,
                    fieldRule.message
                );

                isValid = false;

                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            }

        }
    );


    const fullName =
        getField("fullName");

    if (
        fullName &&
        fullName.value.trim() &&
        fullName.value.trim().length < 3
    ) {

        showFieldError(
            fullName,
            "Name must contain at least 3 characters."
        );

        isValid = false;

        firstInvalidField =
            firstInvalidField || fullName;
    }


    const age =
        getField("age");

    const ageValue =
        Number(age ? age.value : 0);

    if (
        age &&
        age.value &&
        (
            ageValue < 1 ||
            ageValue > 120
        )
    ) {

        showFieldError(
            age,
            "Enter a valid age between 1 and 120."
        );

        isValid = false;

        firstInvalidField =
            firstInvalidField || age;
    }


    const numberOfPersons =
        getField("numberOfPersons");

    const personsValue =
        Number(
            numberOfPersons
                ? numberOfPersons.value
                : 0
        );

    if (
        numberOfPersons &&
        numberOfPersons.value &&
        (
            personsValue < 1 ||
            personsValue > 10
        )
    ) {

        showFieldError(
            numberOfPersons,
            "You can book for 1 to 10 persons."
        );

        isValid = false;

        firstInvalidField =
            firstInvalidField ||
            numberOfPersons;
    }


    const phone =
        getField("phone");

    const phonePattern =
        /^[6-9][0-9]{9}$/;

    if (
        phone &&
        phone.value.trim() &&
        !phonePattern.test(
            phone.value.trim()
        )
    ) {

        showFieldError(
            phone,
            "Enter a valid 10-digit Indian phone number."
        );

        isValid = false;

        firstInvalidField =
            firstInvalidField || phone;
    }


    const email =
        getField("email");

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        email &&
        email.value.trim() &&
        !emailPattern.test(
            email.value.trim()
        )
    ) {

        showFieldError(
            email,
            "Enter a valid email address."
        );

        isValid = false;

        firstInvalidField =
            firstInvalidField || email;
    }


    const idNumber =
        getField("idNumber");

    if (
        idNumber &&
        idNumber.value.trim() &&
        idNumber.value.trim().length < 4
    ) {

        showFieldError(
            idNumber,
            "ID number must contain at least 4 characters."
        );

        isValid = false;

        firstInvalidField =
            firstInvalidField || idNumber;
    }


    const visitDate =
        getField("visitDate");

    if (
        visitDate &&
        visitDate.value
    ) {

        const selectedDate =
            new Date(
                `${visitDate.value}T00:00:00`
            );

        const today =
            new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {

            showFieldError(
                visitDate,
                "Visit date cannot be in the past."
            );

            isValid = false;

            firstInvalidField =
                firstInvalidField ||
                visitDate;
        }
    }


    const termsAccepted =
        getField("termsAccepted");

    if (
        !termsAccepted ||
        !termsAccepted.checked
    ) {

        const termsError =
            getField("termsError");

        if (termsError) {
            termsError.textContent =
                "Please confirm the declaration.";
        }

        isValid = false;

        firstInvalidField =
            firstInvalidField ||
            termsAccepted;
    }


    if (
        !isValid &&
        firstInvalidField
    ) {

        firstInvalidField.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        firstInvalidField.focus();
    }


    return isValid;
}


/* =====================================================
   COLLECT FORM DATA
===================================================== */

function collectBookingData() {

    return {

        darshanType:
            getField("darshanType").value,

        poojaType:
            getField("poojaType").value,

        visitDate:
            getField("visitDate").value,

        timeSlot:
            getField("timeSlot").value,

        numberOfPersons:
            Number(
                getField(
                    "numberOfPersons"
                ).value
            ),

        fullName:
            getField("fullName")
                .value
                .trim(),

        age:
            Number(
                getField("age").value
            ),

        gender:
            getField("gender").value,

        phone:
            getField("phone")
                .value
                .trim(),

        email:
            getField("email")
                .value
                .trim()
                .toLowerCase(),

        idProofType:
            getField("idProofType")
                .value,

        idNumber:
            getField("idNumber")
                .value
                .trim()
                .toUpperCase()

    };
}


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDisplayDate(dateString) {

    if (!dateString) {
        return "";
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


/* =====================================================
   SUMMARY
===================================================== */

function buildSummary(data) {

    summaryContent.innerHTML = `

        <div class="summary-grid">

            <div class="summary-item">
                <span>Darshan Type</span>
                <strong>${escapeHtml(data.darshanType)}</strong>
            </div>

            <div class="summary-item">
                <span>Pooja Type</span>
                <strong>${escapeHtml(data.poojaType)}</strong>
            </div>

            <div class="summary-item">
                <span>Visit Date</span>
                <strong>${escapeHtml(formatDisplayDate(data.visitDate))}</strong>
            </div>

            <div class="summary-item">
                <span>Time Slot</span>
                <strong>${escapeHtml(data.timeSlot)}</strong>
            </div>

            <div class="summary-item">
                <span>Number of Persons</span>
                <strong>${data.numberOfPersons}</strong>
            </div>

            <div class="summary-item">
                <span>Primary Pilgrim</span>
                <strong>${escapeHtml(data.fullName)}</strong>
            </div>

            <div class="summary-item">
                <span>Age / Gender</span>
                <strong>${data.age} / ${escapeHtml(data.gender)}</strong>
            </div>

            <div class="summary-item">
                <span>Phone</span>
                <strong>+91 ${escapeHtml(data.phone)}</strong>
            </div>

            <div class="summary-item full">
                <span>Email</span>
                <strong>${escapeHtml(data.email)}</strong>
            </div>

            <div class="summary-item">
                <span>ID Proof Type</span>
                <strong>${escapeHtml(data.idProofType)}</strong>
            </div>

            <div class="summary-item">
                <span>ID Proof Number</span>
                <strong>${escapeHtml(data.idNumber)}</strong>
            </div>

        </div>
    `;
}


function openSummary() {

    if (!summaryModal) {
        return;
    }

    summaryModal.classList.add("show");

    summaryModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function closeSummary() {

    if (!summaryModal) {
        return;
    }

    summaryModal.classList.remove("show");

    summaryModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}


/* =====================================================
   BOOKING ID
===================================================== */

function createBookingId(
    visitDate
) {

    const compactDate =
        String(visitDate)
            .replaceAll("-", "");

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let randomPart = "";

    for (
        let index = 0;
        index < 6;
        index += 1
    ) {

        randomPart +=
            characters.charAt(
                Math.floor(
                    Math.random() *
                    characters.length
                )
            );
    }

    return `TVM-${compactDate}-${randomPart}`;
}


/* =====================================================
   SAVE BOOKING
===================================================== */

function saveBooking(data) {

    const completedBooking = {

        ...data,

        bookingId:
            createBookingId(
                data.visitDate
            ),

        bookingStatus:
            "Valid",

        entryStatus:
            "Not Used",

        paymentStatus:
            "Payment Not Enabled",

        createdAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        "currentTempleBooking",
        JSON.stringify(
            completedBooking
        )
    );


    let allBookings = [];

    try {

        const existingBookings =
            JSON.parse(
                localStorage.getItem(
                    "templeBookings"
                ) || "[]"
            );

        if (
            Array.isArray(
                existingBookings
            )
        ) {
            allBookings =
                existingBookings;
        }

    } catch (error) {

        console.error(
            "Could not read previous bookings:",
            error
        );
    }


    allBookings.push(
        completedBooking
    );


    localStorage.setItem(
        "templeBookings",
        JSON.stringify(
            allBookings
        )
    );


    return completedBooking;
}


/* =====================================================
   SECURITY HELPER
===================================================== */

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =====================================================
   EVENTS
===================================================== */

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (!validateForm()) {
                return;
            }

            pendingBookingData =
                collectBookingData();

            buildSummary(
                pendingBookingData
            );

            openSummary();

        }
    );


    bookingForm
        .querySelectorAll(
            "input, select"
        )
        .forEach(function (field) {

            field.addEventListener(
                "input",
                function () {

                    clearFieldError(field);

                }
            );

            field.addEventListener(
                "change",
                function () {

                    clearFieldError(field);

                }
            );

        });
}


if (closeSummaryButton) {

    closeSummaryButton.addEventListener(
        "click",
        closeSummary
    );
}


if (summaryBackdrop) {

    summaryBackdrop.addEventListener(
        "click",
        closeSummary
    );
}


if (editBookingButton) {

    editBookingButton.addEventListener(
        "click",
        function () {

            closeSummary();

            bookingForm.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );
}


if (confirmBookingButton) {

    confirmBookingButton.addEventListener(
        "click",
        function () {

            if (!pendingBookingData) {
                return;
            }

            confirmBookingButton.disabled =
                true;

            confirmBookingButton.textContent =
                "Generating Ticket...";

            try {

                saveBooking(
                    pendingBookingData
                );

                window.setTimeout(
                    function () {

                        window.location.href =
                            "booking-success.html";

                    },
                    500
                );

            } catch (error) {

                console.error(
                    "Booking could not be saved:",
                    error
                );

                alert(
                    "Unable to generate the ticket. Please try again."
                );

                confirmBookingButton.disabled =
                    false;

                confirmBookingButton.innerHTML =
                    "Confirm & Generate Ticket <span>✓</span>";
            }

        }
    );
}


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            summaryModal &&
            summaryModal.classList.contains(
                "show"
            )
        ) {

            closeSummary();
        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

configureVisitDate();