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
        } else if (elem.classList.contains("mess")){          
          elem.value = elem.value.replace(/[^А-Я0-9\s,\.!?;:=#$%№()-]/gi, "");
          //elem.value = elem.value.replace(/[^А-Я\s,.!?;:=#$%№()-]/gi, "");
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
              input.forEach((item) => {
                item.value = "";
              });
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

export default sendForm;