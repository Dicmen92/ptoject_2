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

export default togglePopup;