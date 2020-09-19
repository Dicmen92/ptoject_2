'use strict'; 

import "@babel/polyfill";
import "nodelist-foreach-polyfill"; 
import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";
import "cross-browser-polyfill";
import "ie11-scroll-into-view";
import "dom-node-polyfills";

import elementClosest from 'element-closest';
elementClosest(window);

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