var todaysDate = $('#todaysDate');

todaysDate.text(moment().format('dddd, MMMM D, YYYY, h:mm a'));

var hour1Btn = $('.row .btn');

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