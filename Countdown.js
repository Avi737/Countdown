function updateTimer(deadline){
    // going to give us the new date and time when this function was called which is every second.
    // also getting back the date and time of the instance of updateTimer was called.
    // time  = deadline the point we're counting too - time of the function was called. (in milliseconds)
    // the object is going to work out based on the time difference.
    // Math Floor always round DOWN.
    // time / 1000  = 1000 converted to seconds, 60 converted min,60 is hours, 24 is days
    // time / 1000  = 1000 converted to seconds, 60 converted min,60 is hours % 24 == how many hours left in the particular day. 100 % 24 = 4 hours
    var time = deadline - new Date();
     return{
      'days': Math.floor( time/(1000*60*60*24) ),
      'hours': Math.floor( (time/(1000*60*60)) % 24),
      'minutes': Math.floor( (time/1000/60) %60 ),
      'seconds': Math.floor( (time/1000) %60 ),
      'total': time
    };
}


function  animateClock(span){
    span.className = "turn"; // giving a class turn into the injected span.
    setTimeout(function(){
        span.className = "";
    },700);
}



// SetInterval going to be fired every second.
function startTimer(id,deadline){
    var timerInterval = setInterval(function(){
    var clock = document.getElementById(id); //getting the match id from the DOM.
    var timer = updateTimer(deadline); // generating a function and injecting it a deadline.

    // ref to the HTML with div clock - concat the series of spans
    clock.innerHTML =  '<span>' + timer.days    + '</span>'
                      +'<span>' + timer.hours   + '</span>'
                      +'<span>' + timer.minutes + '</span>'
                      +'<span>' + timer.seconds + '</span>';



     // Animations
        var spans = clock.getElementsByTagName("span"); // will get all the above spans that been injected to the clock div.
        animateClock(spans[3]); // calling this function every second.
        if(timer.seconds == 59) animateClock(spans[2]);  // == 59 because we're going to be in a second 60 which is a minute.
        if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
        if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]); // when we getting to a new day.



    // Check for the end of timer.
        if(timer.total < 1){ //means the difference
            clearInterval(timerInterval);
            clock.innerHTML ='<span>0</span><span>0</span><span>0</span><span>0</span>';
            // when we're getting to the deadline, animation will take action.
            $('#countdown').css('display','none');
            $('#new-year').css('display','block');
           $('#new-year').addClass('animated wobble');
        }
    },1000);
}




// when the window loads fire this function.
window.onload = function(){
    //var deadline = new Date("January 1, 2017 00:00:00"); // Declare a deadline.
    var deadline = new Date("September 20, 2016 08:07:20");
    startTimer("clock",deadline); // we're going to inject into the clock id of the html the deadline.
};
