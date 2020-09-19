const calcNum = () => {  
  const calcBlock = document.querySelectorAll('.calc-block>input');
    calcBlock.forEach((item) => {      
      item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/g, '');        
      })
    }); 
};

export default calcNum;