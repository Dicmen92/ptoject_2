'use strict'; 

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import dataImage from './modules/dataImage';
import calcNum from './modules/calcNum';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

  //Timer
  countTimer('20 sept 2020');
   //меню 
  toggleMenu();
  //popup  
  togglePopup();
  //табы 
  tabs();
  //слайдер  
  slider();
  //"Наша команда" смsена картинки  
  dataImage();
  //Запрет на ввод симфолов кроме цифр
  calcNum();
  //калькулятор  
  calc(100);
  //send-ajax-form  
  sendForm();