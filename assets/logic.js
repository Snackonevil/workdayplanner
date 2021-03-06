$(document).ready(loadPage);

// Main area for hour slots
const planner = $("#planner");

// Variables for moment.js formats to compare time
// (see lines 72 - 84)
var currHour = moment().format("H");
var today = moment().format("YYYY-MM-DD");
var hourNow = moment().format(`${today} ${currHour}`);

// Current time in header
$("#todaysDate").text(moment().format("dddd, MMMM D, YYYY, h:mm a"));

// Array of hour slots to be stored
let schedule = [
    {
        hour: "8",
        time: "8:00am", // Label for slot
        event: "", // Text of event in hour slot
    },
    {
        hour: "9",
        time: "9:00am",
        event: "",
    },
    {
        hour: "10",
        time: "10:00am",
        event: "",
    },
    {
        hour: "11",
        time: "11:00am",
        event: "",
    },
    {
        hour: "12",
        time: "12:00pm",
        event: "",
    },
    {
        hour: "13",
        time: "1:00pm",
        event: "",
    },
    {
        hour: "14",
        time: "2:00pm",
        event: "",
    },
    {
        hour: "15",
        time: "3:00pm",
        event: "",
    },
    {
        hour: "16",
        time: "4:00pm",
        event: "",
    },
];

// Load the hour slots onto the page;
function loadPage() {
    // Empty variable to store string interpolation;
    var output = "";
    // Pull and parse 'events' array;
    var events = JSON.parse(localStorage.getItem("events"));
    // If nothing currently in local storage, store empty schedule array and pull from storage as 'events';
    if (events == null) {
        localStorage.setItem("events", JSON.stringify(schedule));
        var events = JSON.parse(localStorage.getItem("events"));
    }

    // Iterate through array of hour slots;
    events.forEach((event, i) => {
        // Determine color of hour slot based on time;
        var colorClass = "";
        if (parseInt(currHour) < parseInt(event.hour)) {
            colorClass = "future";
        } else if (parseInt(currHour) > parseInt(event.hour)) {
            colorClass = "past";
        }
        if (parseInt(currHour) === parseInt(event.hour)) {
            colorClass = "now";
        }

        // Populate output variable with HTML using string interpolation and template literals;
        output += `<div class="row mb-1 border-bottom">
            <div class="col-lg-1 p-3 align-middle text-end">${event.time}</div>
            <textarea id="${i}" class="col-lg-10 ${colorClass}" disabled>${event.event}</textarea>
            <button type="button" data-toggle="button" aria-pressed="false" autocomplete="off" class="bi bi-gear col-lg-1 btn btn-outline-primary p-3"></button>
        </div>`;
    });

    // Write output variable into planner div;
    planner.html(output);
}

// If button is clicked ? unlock textarea and change icon
//      : lock text area and save content;
$(".container").on("click", "button", e => {
    // Retrieve data from local storage and store in variable;
    var events = JSON.parse(localStorage.getItem("events"));
    // Stores current target if it's a button in the planner div;
    var icon = $(e.currentTarget);
    // Stores textarea ID (index 1 in sibling array of target);
    var slot = icon.siblings()[1].id;
    // Stores template literal to JQuery ID selector;
    var task = $(`#${slot}`);

    // Change icon in button and enable textarea;
    if (icon.attr("aria-pressed") === "false") {
        icon.removeClass("bi-gear");
        icon.addClass("bi-save");
        icon.siblings().removeAttr("disabled");
    } else {
        // Change icon in button, add event text to corresponding slot, and disable textarea;
        // Save entry to local storage;
        events[slot].event = task.val();
        localStorage.setItem("events", JSON.stringify(events));
        icon.removeClass("bi-save");
        icon.addClass("bi-gear");
        icon.siblings().attr("disabled", "");
    }
});
