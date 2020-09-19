const toggleMenu = () => {

  const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        alink = menu.querySelectorAll('a'),       
        lilink = menu.querySelectorAll('li');

      const handlerMenu = () =>  menu.classList.toggle('active-menu');               

      btnMenu.addEventListener('click', handlerMenu); 

      lilink.forEach((item) => {
        item.addEventListener("click", (event) => {
        let target = event.target;    //где был клик?        
        if (target === item) {
          menu.classList.remove('active-menu');
        }          
        });
      });         

      menu.addEventListener('click', (event) => {
        let target = event.target;     //где был клик?  
        //console.log(target);       

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