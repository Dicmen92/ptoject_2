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

export default toggleMenu;