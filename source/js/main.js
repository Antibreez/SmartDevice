'use strict';

var navigation = document.querySelector('.page-footer__nav-list');
var navigationButton = document.querySelector('.page-footer__button--nav');
var contacts = document.querySelector('.page-footer__contacts-content');
var contactsButton = document.querySelector('.page-footer__button--contacts');

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

navigationButton.addEventListener('click', onNavButtonClick);
contactsButton.addEventListener('click', onContactsButtonClick);
