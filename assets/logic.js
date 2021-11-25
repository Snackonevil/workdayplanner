$(document).ready(loadPage);

var planner = $('#planner');

var currHour = moment().format('H');
var today = moment().format('YYYY-MM-DD');
var hourNow = moment().format(`${today} ${currHour}`);

$('#todaysDate').text(moment().format('dddd, MMMM D, YYYY, h:mm a'));

let schedule = [
    {
        "hour": "08",
        "time": "8:00am",
        "event": ""
    },
    {
        "hour": "09",
        "time": "9:00am",
        "event": ""
    },
    {
        "hour": "10",
        "time": "10:00am",
        "event": ""
    },
    {
        "hour": "11",
        "time": "11:00am",
        "event": ""
    },
    {
        "hour": "12",
        "time": "12:00pm",
        "event": ""
    },
    {
        "hour": "13",
        "time": "1:00pm",
        "event": ""
    },
    {
        "hour": "14",
        "time": "2:00pm",
        "event": ""
    },
    {
        "hour": "15",
        "time": "3:00pm",
        "event": ""
    },
    {
        "hour": "16",
        "time": "4:00pm",
        "event": ""
    }
];

function loadPage () {
    var output = ''
    var events = JSON.parse(localStorage.getItem('events'))
    if (events == null) {
        localStorage.setItem('events', JSON.stringify(schedule))
        var events = JSON.parse(localStorage.getItem('events'))
    }

    events.forEach((event, i) => {
        var colorClass = ''
        if (moment(hourNow).isBefore(`${today} ${event.hour}`, 'hour') === false) {
            colorClass = 'past'
        } else {
            colorClass = 'future'
        }
        if (moment(hourNow).isSame(`${today} ${event.hour}`, 'hour') === true){
            colorClass = 'now'
        }

         output +=
        `<div class="row mb-1 border-bottom">
            <div class="col-lg-1 p-3 align-middle text-end">${event.time}</div>
            <textarea id="${i}" class="col-lg-10 ${colorClass}" disabled>${event.event}</textarea>
            <button type="button" data-toggle="button" aria-pressed="false" autocomplete="off" class="bi bi-gear col-lg-1 btn btn-outline-primary p-3"></button>
        </div>`
    })

    planner.html(output)

};

// If click ? unlock textarea and change icon : lock text area and save content
$('.container').on('click', ('button'), (e) => {
    var events = JSON.parse(localStorage.getItem('events'))
    var icon = $(e.currentTarget)
    var slot = icon.siblings()[1].id
    var task = $(`#${slot}`)

    if (icon.attr( 'aria-pressed' ) === 'false') {
        icon.removeClass('bi-gear')
        icon.addClass('bi-save')
        icon.siblings().removeAttr('disabled')
    } else {
        events[slot].event = task.val();
        localStorage.setItem('events', JSON.stringify(events));
        icon.removeClass('bi-save');
        icon.addClass('bi-gear');
        icon.siblings().attr('disabled', '');
    }

});