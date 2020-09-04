window.addEventListener('DOMContentLoaded', function(){
  'use strict';

  function addTime (value) {
    if (value < 10) {
        return '0' + value;
    } else {
        return value;
    }
}

  //Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimerRemaing() {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining /60 ) % 60),
          hours = Math.floor(timeRemaining /60 / 60);
          return {timeRemaining, hours, minutes, seconds};
    }

    let addSetInterval = setInterval(updateClock, 1000);
    
    function updateClock(addSetInterval) {
      let timer = getTimerRemaing();

      timerHours.textContent = addTime(timer.hours);
      timerMinutes.textContent = addTime(timer.minutes);
      timerSeconds.textContent = addTime(timer.seconds);

     if (timer.timeRemaining > 0) {
       clearInterval(addSetInterval);                          
      } else if (timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }         
    }

    updateClock();  ;
  }

  countTimer('06 sept 2020');
});