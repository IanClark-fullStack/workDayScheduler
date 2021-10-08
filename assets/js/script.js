// 1. init function to display the calender, with the current day at the top. 

// 2. On scroll, Each Row represents time-slots within standard bussines hours 

// 3. Compare each rows time-slot to the current time using moment and change color themes 1. past 2. present 3. future

// 4. Click functionality gives the user a chance to input text. 

// 5. Click functionality for save button = Log the text content of the current timeslot to localStorage 
    // change the value of the timeslot to value stored within local storage 

// WHEN I refresh the page
// THEN the saved events persist
// Get Moment JS Time Values 
var currentExactTime = moment().local().format('h:mm:ss a');
var startOfDay = moment(new Date(moment().set({'hour': 9, 'minute': 00, 'second': 00}).local()));
// 9



var workDayLength = 9;
var endOfDay = moment(new Date(moment().set({'hour': 5, 'minute': 00, 'second': 00}).local()));
// 5











// Current Day Displayed within JumboTron
var dayToday = $('#currentDay');
dayToday.text(moment().format("dddd, MMMM Do YYYY"));
var timeSlot = $('#time-slot');





var startHour = startOfDay.hour();
var i = 0;
function generateSchedule() {
    while (i < workDayLength) {

        // Pop Into Main 
        var mainWrapper = $('.container');
        // Grab the pre existing row
        var $currentTimeRow = $('<div>');
        // Create 3 Columns per Row 
        var $timeSlotCol = $('<div>');
        var $inputCol = $('<textarea>');
        var $saveCol = $('<button>');

        $currentTimeRow.attr('id', '#time-block-row');
        $currentTimeRow.attr('class', 'row my-3');
        // Assign bootstrap classes to each column
        $timeSlotCol.attr('class', 'col-2 col-xs-2 text-align-center hour');
        // $timeSlotCol.attr('id', 'hour');
        $timeSlotCol.text(`${startHour}`);
        $inputCol.attr('class', 'col-8 col-xs-8 save-input'); // Dynamically Change Class with Conditional 
        // $inputCol.attr('id', '#save-input');
      
        $saveCol.attr('class', 'col-2 col-xs-2 saveBtn');
        // $saveCol.attr('id', 'saveBtn');
        mainWrapper.append($currentTimeRow);
        // Populate the Row with 3 columns 
        $currentTimeRow.append($timeSlotCol);
        $currentTimeRow.append($inputCol);
        $currentTimeRow.append($saveCol);

        // On each iteration, I need to evaluate whether current time is less than timeSlot row,
        // if so, assign a new class to change color, 
        if (startHour < moment().hour()) {
            $inputCol.attr('style', 'background-color: var(--muted);'); 
        } else if (startHour === moment().hour()) {
            $inputCol.attr('style', 'background-color: var(--blue);');
        } else {$inputCol.attr('style', 'background-color: var(--bright);');}


        
        // Else if the current hour is equal to the text content of the timeSlot 

        // Else, it must be the future. 
        i++;
        startHour++;
        if (startHour > 12) {
            startHour = 1;
        }
       
    }
    $('.saveBtn').click(function() {
        var rowName = $(this).siblings('.hour').text();
        console.log(rowName);
        // get row text field class and row id values
        var textValue = $(this).siblings('.save-input').val();
        console.log(textValue);
    
    
        // save in localStorage
        localStorage.setItem(rowName, textValue);
    });
  
    
}    


    
   

    
// var fromLocal = localStorage.getItem($rowName);
// console.log(fromLocal);
// $inputCol.val(fromLocal);




var saveBtn = $('.saveBtn');
var inputVal = $('.save-input');





function rePopulate() {
    $('.hour').each(function() {
        var currentSlot = $(this).text();
     // each hour 
        var currentItem = localStorage.getItem(currentSlot);
        // Value stored at Hour
        

        if(currentItem !== null) {
            $(this).siblings('.save-input').val(currentItem);
        }
    });
}

generateSchedule();
rePopulate();