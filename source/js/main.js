'use strict';

var navigation = document.querySelector('.page-footer__nav-list');
var navigationButton = document.querySelector('.page-footer__button--nav');
var contacts = document.querySelector('.page-footer__contacts-content');
var contactsButton = document.querySelector('.page-footer__button--contacts');

var callRequestButton = document.querySelector('.page-header__call-request');
var popup = document.querySelector('.popup');
var overlay = document.querySelector('.popup__overlay');
var nameInput = document.querySelector('.popup input[name="name"]');
var phoneInput = document.querySelector('.popup input[name="phone"]');
var message = document.querySelector('.popup textarea');
var closeButton = document.querySelector('.popup__close-button');
var form = document.querySelector('.popup form');

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

var saveData = function () {
  localStorage.setItem('name', nameInput.textContent);
  localStorage.setItem('phone', phoneInput.textContent);
  localStorage.setItem('message', message.textContent);
};

var onNavButtonClick = function () {
  if (navigationButton.classList.contains('page-footer__button--opened')) {
    navigationButton.classList.remove('page-footer__button--opened');
    navigation.classList.remove('page-footer__nav-list--opened');
  } else {
    navigationButton.classList.add('page-footer__button--opened');
    navigation.classList.add('page-footer__nav-list--opened');
  }
};

var onContactsButtonClick = function () {
  if (contactsButton.classList.contains('page-footer__button--opened')) {
    contactsButton.classList.remove('page-footer__button--opened');
    contacts.classList.remove('page-footer__contacts-content--opened');
  } else {
    contactsButton.classList.add('page-footer__button--opened');
    contacts.classList.add('page-footer__contacts-content--opened');
  }
};

var onFormSubmit = function () {
  hide(popup);
  saveData();
  removeEventListeners();
};

var onCloseButtonClick = function () {
  hide(popup);
  removeEventListeners();
};

var onKeyPress = function (evt) {
  if (isEscKey(evt)) {
    hide(popup);
    removeEventListeners();
  }
};

var onOverlayClick = function () {
  hide(popup);
  removeEventListeners();
};

var onCallRequestButtonClick = function () {
  show(popup);
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
