let currentDayEl = $('#currentDay');
let containerEl = $('.container')
let time




for (let i=1; i<18; i++) {

 time=moment().startOf('day').add( i, "h")


let rowEl= $('<div class="row ' + i +' "></div>').appendTo(containerEl);
let hourEl =$('<div class="hour ' + i +' col-2">' + moment(time._d).format('hA') + '</div>')
let slotEl= $('<textarea class=" ' + i +' col-8"></textarea>')
let saveEl= $('<div type="submit" class=" col-1 saveBtn"></div>')
let iconEl=$('<i class="glyphicon glyphicon-floppy-disk"></i>')
rowEl.append(hourEl, slotEl, saveEl);
saveEl.append(iconEl)


if (moment().diff(moment(time._d, 'hours')) < 0) {
  slotEl.addClass('future')
}

else if(moment().diff(moment(time._d, 'hours')) > 3600000) {
  slotEl.addClass('past')
}  

else {
  slotEl.addClass('present')
}


}





function displayDay() {
  var today = moment().format('dddd, MMMM Do');
  currentDayEl.text(today);
}

















displayDay();