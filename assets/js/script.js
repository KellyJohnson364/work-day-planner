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

for (let i=0; i<25; i++) {

let time=moment().startOf('day').add( i, "H")
let timeSlot=moment(time).format("hA")

let rowEl= $('<div class="row"></div>').appendTo(containerEl);
let hourEl =$('<div class="hour  col-1">' + timeSlot + '</div>')
let slotEl= $('<input type="text" class="col-9"/>')
let saveEl= $('<button type="submit" id="'+ i +'" class="glyphicon glyphicon-floppy-disk col-1 saveBtn"></button>')


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

// Store new entry to local storage when the save button is clicked

saveEl.on("click", function(event) {
  event.preventDefault();
let t = $(this).attr('id');
let entry = this.previousSibling.value
localStorage.setItem(t, JSON.stringify(entry))
})}

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