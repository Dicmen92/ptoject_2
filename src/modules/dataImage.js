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
export default dataImage;