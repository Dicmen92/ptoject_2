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
          let target = event.target;     //где был клик?
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
        
          popup.style.display = 'block';          
          animateOpen = requestAnimationFrame(animateFuncOpen);        
          popup.style.display = "block";      
          if (window.innerWidth <= 768) {
            cancelAnimationFrame(animateOpen);
            popup.style.opacity = 1;           
        }
      })
    });

    popup.addEventListener('click', (event) =>{   
      let target = event.target;      
      if (target.classList.contains('popup-close')) {
        animateClose = requestAnimationFrame(animateFuncClose);     
      } else {
        target = target.closest('.popup-content');  //возвращает ближайшего предка
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

      target = target.closest('.service-header-tab');  //возвращает ближайшего предка

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

  //слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'), //фото
    btn = document.querySelectorAll('.portfolio-btn'),  //кнопки вперед, назад
    //dot = document.querySelectorAll('.dot'),  //круглишки слайдера
    slider = document.querySelector('.portfolio-content'), //сам слайдер
    portfolioDots = document.querySelector('.portfolio-dots');

    let currentSlide = 0;  //движение слайдера
    let interval;

    //добавляем круглишки слайдера
    const addDots = () => {
      slide.forEach((item) => {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        portfolioDots.append(dot);
      })
    };
    
    addDots();

    const dots = portfolioDots.querySelectorAll('.dot');
    dots[0].classList.add('dot-active');


    const prevSlide = (elem, index, strClass) => {  //предыдущий слайд
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {  //следующий слайд
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {  //автоматическое воспроизведение слайдов
      prevSlide(slide, currentSlide, 'portfolio-item-active'); 
      prevSlide(dots, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) { //если доходим до посл. слайда, перекл. на первый
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active'); 
      nextSlide(dots, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => { //задаем скорость в сек, если не будет задана
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => { //остановка слайдера
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) { //если не содержит класс .portfolio-btn, .dot
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active'); 
      prevSlide(dots, currentSlide, 'dot-active'); 

      if (target.matches('#arrow-right')) {
        currentSlide++;        
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dots.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide <0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active'); 
      nextSlide(dots, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500);  //задаем скорость воспроизведения автом.слайд.

  };
  slider();

  //"Наша команда" смена картинки
  const dataImage = () => {    
    const commandPhoto = document.querySelectorAll('.command__photo');   

    commandPhoto.forEach((item, i) => {            
      item.addEventListener('mouseenter', (event) => {               
        event.target.src = event.target.dataset.img;
        event.target.dataset.img = `images/command/command-${i + 1}.jpg`;
      })
    });  
    commandPhoto.forEach((item, i) => {            
      item.addEventListener('mouseleave', (event) => {               
        event.target.src = event.target.dataset.img;
        event.target.dataset.img = `images/command/command-${i + 1}a.jpg`;
      })
    });   
    
  };
dataImage();

//Запрет на ввод симфолов кроме цифр
const calcNum = () => {  
  const calcBlock = document.querySelectorAll('.calc-block>input');
    calcBlock.forEach((item) => {      
      item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/g, '');        
      })
    }); 
};
calcNum();

//калькулятор
const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

  const countSum = () => {
    let total = 0,
    countValue = 1,
    dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value,
    squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10){
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }

    totalValue.textContent = total
    
  };

  calcBlock.addEventListener('change', (event) => {
    const target = event.target;

    if (target.matches('select') || target.matches('input')) {
      countSum();      
    }

  });

};
calc(100);


//send-ajax-form

const sendForm = () => {
  const errorMessage = "Что-то пошло не так...",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо, мы скоро с вами свяжемся!";

  const form = document.getElementById("form1"),
        form2 = document.getElementById("form2"),
        form3 = document.getElementById("form3");

  const forms = [];

  forms.push(form, form2, form3);  

  const statusMessage = document.createElement("div");
  //statusMessage.textContent = 'Проверка связи';
  statusMessage.style.cssText = `font-size: 2rem;
      color: white;`;

  forms.forEach((item) => {
    let input = item.querySelectorAll("input");
    [...input].forEach((elem) => {
      elem.addEventListener("input", () => {
        if (elem.classList.contains("form-phone")) {                    
          elem.setAttribute('maxlength', 11);
          elem.value = elem.value.replace(/[^\+\d]/g, "");
                  
        } else if (elem.classList.contains("form-email")) {
          return;
        } else {
          elem.value = elem.value.replace(/[^А-Я\s]/gi, "");
        }
      });
    });

    item.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = item.querySelectorAll("input");
      item.append(statusMessage);
      statusMessage.textContent = loadMessage;

      const formData = new FormData(item);
      let body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });            
        
        postData(body)
          .then((response) => {            
            if (response.status !== 200){
              throw new Error('status network not 200');
            }
            statusMessage.textContent = successMessage;
            if (item.id === 'form1' || item.id === 'form2'|| item.id === 'form3') {
            setTimeout(() => statusMessage.textContent = '', 2000)
          }
          input.forEach((item) => {
            item.value = "";
          });
          })
          .catch((error) => {
            statusMessage.textContent = errorMessage;
            setTimeout(() => statusMessage.textContent = '', 4000)
            console.error(error);
          });
    });

    const postData = (body) => {
      return fetch('./server.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON'          
        },
        body: JSON.stringify(body)
      });
    };

  });
   
};
sendForm();

});