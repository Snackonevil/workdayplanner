$(document).ready(loadPage)
var planner = $('#planner')

var currHour = moment().format('H');
var today = moment().format('YYYY-MM-DD')
var hourNow = moment().format(`${today} ${currHour}`)
$('#todaysDate').text(moment().format('dddd, MMMM D, YYYY, h:mm a'));

var todaytest = moment().format('YYYY-MM-DD H')

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
]



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
        } else if (moment(hourNow).isSame(`${today} ${event.hour}`, 'hour') === true){
            hour = 'now'
        } else {
            colorClass = 'future'
        }
        // console.log(event)
        // console.log(i)
         output +=
        `<div  class="row mb-1 border-bottom">
            <div class="col-lg-1 p-3 align-middle text-end">${event.time}</div>
            <textarea id="${i}" data-slot="${i}" class="col-lg-10 ${colorClass}" disabled>${event.event}</textarea>
            <button type="button" data-toggle="button" aria-pressed="false" autocomplete="off" class="bi bi-gear col-lg-1 btn btn-outline-primary p-3"></button>
        </div>`
    })
    // console.log(output)
    planner.html(output)

}

function savePage () {
    var save = JSON.stringify(events)
    localStorage.setItem('events', save)
}

// If click ? unlock textarea and change icon : lock text area and save content
$('.container').on('click', ('button'), (e) => {
    var events = JSON.parse(localStorage.getItem('events'))
    var icon = $(e.currentTarget)
    var textArea = icon.siblings()[1]
    var slot = textArea.dataset.slot
    var stuff = $(`#${slot}`)

    
    if (icon.attr( 'aria-pressed' ) === 'false') {
        icon.removeClass('bi-gear')
        icon.addClass('bi-save')
        icon.siblings().removeAttr('disabled')

    } else {
        events[slot].event = stuff.val()
        localStorage.setItem('events', JSON.stringify(events))
        icon.removeClass('bi-save');
        icon.addClass('bi-gear');
        icon.siblings().attr('disabled', '')
    }

    
})

// hour1Btn.click((e) => {
// // console.log(e.target)
//     var icon = $(e.currentTarget)
//     if (hour1Btn.attr( 'aria-pressed' ) === 'false') {
//         icon.removeClass('bi-gear')
//         icon.addClass('bi-save')
//         $('#hour-1 textarea').removeAttr('disabled')
//     } else {
//         icon.removeClass('bi-save');
//         icon.addClass('bi-gear');
//         $('#hour-1 textarea').attr('disabled', '')
//     }
//     console.log(icon)
// });

// hour2Btn.click((e) => {

//     var icon = $(e.currentTarget)
//     if (hour2Btn.attr( 'aria-pressed' ) === 'false') {
//         icon.removeClass('bi-gear')
//         icon.addClass('bi-save')
//     } else {
//         icon.removeClass('bi-save');
//         icon.addClass('bi-gear');
//     }

// });


// moment(moment().format('h')).isBefore('8')
