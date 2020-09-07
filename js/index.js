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
  countTimer('10 sept 2020');


   //меню
   const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu');

        const handlerMenu = () =>  menu.classList.toggle('active-menu');

        btnMenu.addEventListener('click', handlerMenu);

        menu.addEventListener('click', (event) => {
          let target = event.target;
          if (target.classList.contains('close-btn')) {
            handlerMenu();         //тогда убираем
          } else {
            target = target.classList.remove('active-menu');
            
            if (!target) {
              handlerMenu();
            }
          }

        });       
  };
  toggleMenu();

  //closeBtn.addEventListener('click', handlerMenu);
        //menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));


  //popup
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close');

        //анимация popup 
        let animateOpen, animateClose;
        let count = 0; 
        
        const animateFuncOpen = () => {
          animateOpen = requestAnimationFrame(animateFuncOpen);
          count += 0.05;
          if (count < 1) {
            popup.style.opacity = count;
          } else {
              cancelAnimationFrame(animateOpen);
          }
      };

      const animateFuncClose = () => {
        animateClose = requestAnimationFrame(animateFuncClose);
        count -= 0.05;
        if (count >= 0) {
          popup.style.opacity = count;
        } else {
            cancelAnimationFrame(animateClose);
            popup.style.display = "none";
        }
    };
      //конец анимации

      popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
        if (window.innerWidth > 768) {
          popup.style.display = 'block';          
          animateOpen = requestAnimationFrame(animateFuncOpen);        
          popup.style.display = "block";      
        }
      })
    });

    popup.addEventListener('click', (event) =>{   
      let target = event.target;      
      if (target.classList.contains('popup-close')) {
        animateClose = requestAnimationFrame(animateFuncClose);     
      } else {
        target = target.closest('.popup-content');
        if (!target){
          animateClose = requestAnimationFrame(animateFuncClose); 
        }
      }
    });
  };
  togglePopup();

  //табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i  = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;

      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }   
  });
};
  tabs();

});