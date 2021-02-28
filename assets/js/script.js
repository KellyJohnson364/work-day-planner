let currentDayEl = $('#currentDay');
let containerEl = $('.container')



// builds the schedule within the container div

for (let i=8; i<18; i++) {

let time=moment().startOf('day').add( i, "H")
let timeSlot=moment(time).format("hA")

let rowEl= $('<div class="row"></div>').appendTo(containerEl);
let hourEl =$('<div class="hour  col-1">' + timeSlot + '</div>')
let slotEl= $('<input type="text" class="col-9"/>')
let saveEl= $('<div type="submit" id="'+ i +'"class=" col-1 saveBtn"></div>')
let iconEl=$('<i class="glyphicon glyphicon-floppy-disk"></i>')

rowEl.append(hourEl, slotEl, saveEl);
saveEl.append(iconEl)

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
  let today = moment().format('dddd, MMMM Do');
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