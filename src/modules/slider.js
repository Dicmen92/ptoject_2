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

export default slider;