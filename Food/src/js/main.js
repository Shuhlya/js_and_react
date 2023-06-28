import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

    calc();
    cards();
    forms(modalTimerId, 'form');
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        sliderS: '.offer__slider',
        slidesS: '.offer__slide',
        nextS: '.offer__slider-next',
        prevS: '.offer__slider-prev',
        totalS: '#total',
        currentS: '#current',
        slidesWrapperS: '.offer__slider-wrapper',
        slidesFieldsS: '.offer_slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2023-06-29');
});