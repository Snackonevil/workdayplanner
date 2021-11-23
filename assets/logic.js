var todaysDate = $('#todaysDate');
var currHour = moment().format('h');

todaysDate.text(moment().format('dddd, MMMM D, YYYY, h:mm a'));


// var hour1Btn = $('.row .btn');


const hour1Btn = $('#hour-1 .btn');
const hour2 = $('#hour-2');
const hour3 = $('#hour-3');
const hour4 = $('#hour-4');
const hour5 = $('#hour-5');
const hour6 = $('#hour-6');
const hour7 = $('#hour-7');
const hour8 = $('#hour-8');

let colorCode = () => {

}

hour1Btn.click((e) => {

    var icon = $(e.currentTarget)
    if (hour1Btn.attr( 'aria-pressed' ) === 'false') {
        icon.removeClass('bi-gear')
        icon.addClass('bi-save')
    } else {
        icon.removeClass('bi-save');
        icon.addClass('bi-gear');
    }
})


// moment(moment().format('h')).isBefore('8')

// $('.btn').each(() => {
//     if (moment(moment().format('h')).isBefore('8')) {
//         console.log('cool')
//     }
//     }
// )