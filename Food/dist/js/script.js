/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
document.addEventListener('DOMContentLoaded', () => {
  const tabsContent = document.querySelectorAll('.tabcontent'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsParent = document.querySelector('.tabheader__items');
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }
  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer
  const deadline = '2023-06-24';
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - new Date();
    let days, hours, minutes, seconds;
    if (t <= 0) {
      days = hours = minutes = seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)), hours = Math.floor(t / (1000 * 60 * 60) % 24), minutes = Math.floor(t / (1000 * 60) % 60), seconds = Math.floor(t / 1000 % 60);
    }
    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
    };
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = t.days < 10 ? `0${t.days}` : t.days, hours.innerHTML = t.hours < 10 ? `0${t.hours}` : t.hours, minutes.innerHTML = t.minutes < 10 ? `0${t.minutes}` : t.minutes, seconds.innerHTML = t.seconds < 10 ? `0${t.seconds}` : t.seconds;
      if (t.total <= 0) clearInterval(timeInterval);
    }
  }
  setClock('.timer', deadline);
});
/******/ })()
;
//# sourceMappingURL=script.js.map