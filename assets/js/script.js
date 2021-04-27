let currentDayEl = $('#currentDay');
let containerEl = $('.container')

$(window).scroll(function() {    // this will work when your window scrolled.
  var height = $(window).scrollTop();  //getting the scrolling height of window
  if(height  > 100) {
    $("#currentDay").css({"position": "fixed"});
  } else{
    $("#currentDay").css({"position": "relative"});
  }
});

// builds the schedule within the container div
let dayTitle= $("<div class='title'>Day's Appointments</div>").appendTo(containerEl);
for (let i=0; i<18; i++) {

let time=moment().startOf('day').add( i, "H")
let timeSlot=moment(time).format("ha")

let rowEl= $('<div class="row"></div>').appendTo(containerEl);
let hourEl =$('<div class="hour  col-1"><strong>' + timeSlot + '</strong></div>')
let slotEl= $('<input type="text" class="col-9"/>')
let saveEl= $('<button type="submit" id='+ i +' class="glyphicon glyphicon-floppy-disk col-1 saveBtn"></button>')


rowEl.append(hourEl, slotEl, saveEl);


// assigns classes to the slots based on time

if (moment().diff(moment(time, 'hours')) < 0) {
  slotEl.addClass('future')
}
else if(moment().diff(moment(time, 'hours')) > 3600000) {
  slotEl.addClass('past')
} 
else {
  slotEl.addClass('present')
}
//Checks local storage for stored appointments

let remember = localStorage.getItem(i);

if (remember) {
  let appt = JSON.parse(remember);
  slotEl.attr('value', appt)
}
}
let weekTitle= $("<div class='title'>Week's Appointments</div>").appendTo(containerEl);
for (let k=0; k<7; k++) {

  let day=moment().startOf('week').add( k, "d")
  let daySlot=moment(day).format("ddd")
  
  let dayRowEl= $('<div class="row dayRow"></div>').appendTo(containerEl);
  let dayEl =$('<div class="hour  col-1"><strong>' + daySlot + '</strong></div>')
  let daySlotEl= $('<input type="text" class="col-9"/>')
  let daySaveEl= $('<button type="submit" id=' + k +' class="glyphicon glyphicon-floppy-disk col-1 saveBtn"></button>')
  
  console.log((moment().diff(moment(day, 'd'))))
  
  dayRowEl.append(dayEl, daySlotEl, daySaveEl);
  
  if (moment().diff(moment(day, 'd')) < 0) {
    daySlotEl.addClass('future')
  }
  else if(moment().diff(moment(day, 'd')) > 86400000) {
    daySlotEl.addClass('past')
  } 
  else {
    daySlotEl.addClass('present')
  }
  let recall = localStorage.getItem(k);

  if (recall) {
    let appoint = JSON.parse(recall);
    daySlotEl.attr('value', appoint)
}}


// Store new entry to local storage when the save button is clicked

$('.saveBtn').on("click", function(event) {
  event.preventDefault();
let t = $(this).attr('id');
let entry = this.previousSibling.value
localStorage.setItem(t, JSON.stringify(entry))
})

// function to diplay the correct day at top of page

function displayDay() {
  let today = moment().format('dddd, MMMM Do, h:mm a');
  currentDayEl.text(today);
}

displayDay();

// Ensures the page reloads on the hour

function newHour() {
  if ((moment().format("m") == 0) && (moment().format("s")) == 0) {
    console.log(moment())
    location.reload();
  }
}
setInterval(newHour, 1000);
setInterval(displayDay, 1000);