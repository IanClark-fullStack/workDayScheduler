// Get Moment JS Time Values 
var currentExactTime = moment().local().format('h:mm:ss a');
var startOfDay = moment(new Date(moment().set({'hour': 9, 'minute': 00, 'second': 00}).local())); // 9

var workDayLength = 9;
var endOfDay = moment(new Date(moment().set({'hour': 5, 'minute': 00, 'second': 00}).local())); // 5

// Paint the Current Day & Time to the Page,  Displayed within JumboTron
var dayToday = $('#currentDay'); // Grab the El by ID 
dayToday.text(moment().format("dddd, MMMM Do YYYY")); // Add the Day as text
var displayTime = $('<h4>'); // Dynamically Create a Heading 
displayTime.text(currentExactTime); // Add the time as Heading Text 
dayToday.append(displayTime); // Paint the heading under the day today title


var startHour = startOfDay.hour(); // Grab the current hour 
var i = 0; // Initialize a variable to increase in functionality
// Generate the Schedule Elements
function generateSchedule() {
    while (i < workDayLength) { // While I is less than a 9 hour day
        // Pop Into Main 
        var mainWrapper = $('.container');
        // Create a Row 
        var $currentTimeRow = $('<div>');
        // Create 3 Columns per Row 
        var $timeSlotCol = $('<div>'); // The hour
        var $inputCol = $('<textarea>'); // The Action Items
        var $saveCol = $('<button>'); // The floppiest disk 

        $currentTimeRow.attr('id', '#time-block-row'); // Assign the row an ID 
        // Assign bootstrap classes to each column
        $currentTimeRow.attr('class', 'row my-3');
        $timeSlotCol.attr('class', 'col-2 col-xs-2 text-align-center hour');
        $inputCol.attr('class', 'col-8 col-xs-8 save-input'); // Dynamically Change Class with Conditional 
        $saveCol.attr('class', 'col-2 col-xs-2 saveBtn');
        $timeSlotCol.text(`${startHour}`); // Assign the Time column a text value equal to the current hour. 
        // Paint the Row to the Page 
        mainWrapper.append($currentTimeRow);
        // Populate the Row with 3 Fresh columns 
        $currentTimeRow.append($timeSlotCol);
        $currentTimeRow.append($inputCol);
        $currentTimeRow.append($saveCol);
        // On each iteration, evaluate whether current time is less than timeSlot row,
        if (startHour < moment().hour()) { // If so, 
            $inputCol.attr('style', 'background-color: var(--muted);'); // assign a new class to change color,
        } else if (startHour === moment().hour()) { // Else if, the hour is equal to the current hour, 
            $inputCol.attr('style', 'background-color: var(--blue);'); // assign a new class to change color,
        } else {$inputCol.attr('style', 'background-color: var(--bright);');} // in every other case, it must be the future.

        
        i++; // When finsihed with generating a row, increment I by the value of 1 
        startHour++; // Then, increment the current hour so we know we have the correct value for the next iteration. 
        // Account for military time. 
        if (startHour > 12) {
            startHour = 1;
        }
    } // End the while loop 

    $('.saveBtn').click(function() {
        var rowName = $(this).siblings('.hour').text(); // Time value in the time column 
        var textValue = $(this).siblings('.save-input').val(); // Value entered into the textarea
        // save in localStorage, where the hour is the key and the action item is the value. 
        localStorage.setItem(rowName, textValue);
    });  
} // End the generate schedule function

// Create a function that will pull content and from local storage and paint it to the page
function rePopulate() { 
    $('.hour').each(function() { // Four each hour class 
        var currentSlot = $(this).text(); // each hour 
        var currentItem = localStorage.getItem(currentSlot); // Value stored at Hour
        if(currentItem !== null) {
            $(this).siblings('.save-input').val(currentItem);
        }
    });
}

generateSchedule(); // Create the schedule
rePopulate(); // Execute local storage pull 