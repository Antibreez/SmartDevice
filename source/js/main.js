/*eslint-disable*/

'use strict';

var body = document.querySelector('body');

var navigation = document.querySelector('.page-footer__nav-list');
var navigationButton = document.querySelector('.page-footer__button--nav');
var contacts = document.querySelector('.page-footer__contacts-content');
var contactsButton = document.querySelector('.page-footer__button--contacts');

var callRequestButton = document.querySelector('.page-header__call-request');
var popup = document.querySelector('.popup');
var overlay = document.querySelector('.popup__overlay');
var nameInput = document.querySelector('.popup input[name="name"]');
var phonePopupInput = document.querySelector('.popup input[name="phone"]');
var phoneQuestionInput = document.querySelector('.question input[name="phone"]');
var message = document.querySelector('.popup textarea');
var closeButton = document.querySelector('.popup__close-button');
var form = document.querySelector('.popup form');

var scrollLink = document.querySelector('.promo__scroll');
var advantages = document.getElementById('advantages');

var maskOptions = {
  mask: '+{7}(000)000-00-00'
};

var maskQuestion = IMask(phoneQuestionInput, maskOptions);
var maskPopup = IMask(phonePopupInput, maskOptions);

// Плавный скролл
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) {
    return self.pageYOffset;
  }
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop) {
    return document.documentElement.scrollTop;
  }
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) {
    return document.body.scrollTop;
  }
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  } return y;
}

function scroll(distance) {
  return 'window.scrollTo(0, ' + distance + ')';
}

function smoothScroll(elm) {
  var startY = currentYPosition();
  var stopY = elmYPosition(elm);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY); return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 20) {
    speed = 20;
  }
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(scroll(leapY), timer * speed);
      leapY += step; if (leapY > stopY) {
        leapY = stopY;
      }
      timer++;
    } return;
  }
  for (var j = startY; j > stopY; j -= step) {
    setTimeout(scroll(leapY), timer * speed);
    leapY -= step; if (leapY < stopY) {
      leapY = stopY;
      timer++;
    }
  }
}

var isEscKey = function (evt) {
  return evt.key === 'Esc' || evt.key === 'Escape';
};

var show = function (element) {
  element.classList.remove('hidden');
  nameInput.focus();
};

var hide = function (element) {
  return element.classList.add('hidden');
};

var addUnscrollClass = function () {
  body.style.height = '100vh';
  body.style.overflow = 'hidden';
};

var removeUnscrollClass = function () {
  body.style.height = 'auto';
  body.style.overflow = 'auto';
};

var saveData = function () {
  localStorage.setItem('name', nameInput.textContent);
  localStorage.setItem('phone', phonePopupInput.textContent);
  localStorage.setItem('message', message.textContent);
};

var onPromoScrollClick = function (evt) {
  evt.preventDefault();
  smoothScroll(advantages);
};

var onNavButtonClick = function () {
  if (navigationButton.classList.contains('page-footer__button--opened')) {
    navigationButton.classList.remove('page-footer__button--opened');
    navigation.classList.remove('page-footer__nav-list--opened');
  } else {
    navigationButton.classList.add('page-footer__button--opened');
    navigation.classList.add('page-footer__nav-list--opened');

    if (contactsButton.classList.contains('page-footer__button--opened')) {
      contactsButton.classList.remove('page-footer__button--opened');
      contacts.classList.remove('page-footer__contacts-content--opened');
    }
  }
};

var onContactsButtonClick = function () {
  if (contactsButton.classList.contains('page-footer__button--opened')) {
    contactsButton.classList.remove('page-footer__button--opened');
    contacts.classList.remove('page-footer__contacts-content--opened');
  } else {
    contactsButton.classList.add('page-footer__button--opened');
    contacts.classList.add('page-footer__contacts-content--opened');

    if (navigationButton.classList.contains('page-footer__button--opened')) {
      navigationButton.classList.remove('page-footer__button--opened');
      navigation.classList.remove('page-footer__nav-list--opened');
    }
  }
};

var onFormSubmit = function () {
  hide(popup);
  removeUnscrollClass();
  saveData();
  removeEventListeners();
};

var onCloseButtonClick = function () {
  hide(popup);
  removeUnscrollClass();
  removeEventListeners();
};

var onKeyPress = function (evt) {
  if (isEscKey(evt)) {
    hide(popup);
    removeUnscrollClass();
    removeEventListeners();
  }
};

var onOverlayClick = function () {
  hide(popup);
  removeUnscrollClass();
  removeEventListeners();
};

var onCallRequestButtonClick = function () {
  show(popup);
  addUnscrollClass();
  addEventListeners();
};

var addEventListeners = function () {
  form.addEventListener('submit', onFormSubmit);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onKeyPress);
  overlay.addEventListener('click', onOverlayClick);
};

var removeEventListeners = function () {
  form.removeEventListener('submit', onFormSubmit);
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onKeyPress);
  overlay.removeEventListener('click', onOverlayClick);
};

navigationButton.addEventListener('click', onNavButtonClick);
contactsButton.addEventListener('click', onContactsButtonClick);
callRequestButton.addEventListener('click', onCallRequestButtonClick);
scrollLink.addEventListener('click', onPromoScrollClick);
