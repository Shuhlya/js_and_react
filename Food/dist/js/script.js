/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
window.addEventListener('DOMContentLoaded', function () {
  // Tabs

  let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
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
  tabsParent.addEventListener('click', function (event) {
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

  // Timer

  const deadline = '2023-06-27';
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor(t / 1000 % 60),
      minutes = Math.floor(t / 1000 / 60 % 60),
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock('.timer', deadline);

  // Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, 300000);
  // Изменил значение, чтобы не отвлекало

  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);

  // Используем классы для создание карточек меню

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parent.append(element);
    }
  }
  const getResource = async url => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    return await res.json();
  };
  getResource('http://localhost:3000/menu').then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });

  // Forms

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });
    return await res.json();
  };
  forms.forEach(item => {
    bindPostData(item);
  });
  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData('http://localhost:3000/requests', JSON.stringify(json)).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  //Slider

  const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    next = document.querySelector('.offer__slider-next'),
    prev = document.querySelector('.offer__slider-prev'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesFields = document.querySelector('.offer_slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;
  let sliderIndex = 1,
    offset = 0;
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${sliderIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = sliderIndex;
  }
  slidesFields.style.width = `${100 * slides.length}%`;
  slidesFields.style.display = `flex`;
  slidesFields.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = 'relative';
  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
  slider.append(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
    if (i == 0) dot.style.opacity = 1;
    indicators.append(dot);
  }
  const dots = document.querySelectorAll('.dot');
  function setDotsOpacity() {
    dots.forEach((item, index) => {
      item.style.opacity = '0.5';
      if (index == sliderIndex - 1) item.style.opacity = '1';
    });
  }
  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }
  next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesFields.style.transform = `translateX(-${offset}px)`;
    if (sliderIndex == slides.length) {
      sliderIndex = 1;
    } else {
      sliderIndex++;
    }
    if (slides.length < 10) {
      current.textContent = `0${sliderIndex}`;
    } else {
      current.textContent = sliderIndex;
    }
    setDotsOpacity();
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesFields.style.transform = `translateX(-${offset}px)`;
    if (sliderIndex == 1) {
      sliderIndex = slides.length;
    } else {
      sliderIndex--;
    }
    if (slides.length < 10) {
      current.textContent = `0${sliderIndex}`;
    } else {
      current.textContent = sliderIndex;
    }
    setDotsOpacity();
  });
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      sliderIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesFields.style.transform = `translateX(-${offset}px)`;
      dot.style.opacity = '1';
      setDotsOpacity();
    });
  });
  // showSlides(sliderIndex);

  // function showSlides(n){
  //     if (n > slides.length) sliderIndex = 1;
  //     if (n < 1) sliderIndex = slides.length;

  //     slides.forEach(item=>item.classList.add('hide')); 

  //     slides[sliderIndex-1].classList.remove('hide');

  //     current.textContent = (sliderIndex > 9)? sliderIndex: `0${sliderIndex}`;

  // };

  // function plusSlider(n){
  //     showSlides(sliderIndex += n);
  // }

  // next.addEventListener('click', ()=>{
  //     plusSlider(1);
  // })
  // prev.addEventListener('click', ()=>{
  //     plusSlider(-1);
  // })

  const result = document.querySelector('.calculating__result span');
  let height,
    weight,
    age,
    sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female',
    active = localStorage.getItem('active') ? localStorage.getItem('active') : '1.375';
  function initDefaultParameter(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.classList.remove('calculating__choose-item_active');
      if (localStorage.getItem('sex') === el.getAttribute('id')) {
        el.classList.add('calculating__choose-item_active');
        sex = localStorage.getItem('sex');
      }
      if (localStorage.getItem('active') === el.getAttribute('data-active')) {
        el.classList.add('calculating__choose-item_active');
        active = localStorage.getItem('active');
      }
    });
  }
  initDefaultParameter('#gender div');
  initDefaultParameter('.calculating__choose_big div');
  function calcCal() {
    if (!sex || !height || !weight || !age || !active) {
      result.textContent = '______';
    } else {
      if (sex == 'female') {
        result.textContent = Math.round(active * (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age));
      } else {
        result.textContent = Math.round(active * (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age));
      }
    }
  }
  calcCal();
  function getStaticElement(parentsSelector) {
    const elements = document.querySelectorAll(`${parentsSelector} div`);
    elements.forEach(element => {
      element.addEventListener('click', e => {
        if (e.target.getAttribute('data-active')) {
          active = +e.target.getAttribute('data-active');
          localStorage.setItem('active', active);
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', sex);
        }
        elements.forEach(element => {
          element.classList.remove('calculating__choose-item_active');
        });
        e.target.classList.add('calculating__choose-item_active');
        calcCal();
      });
    });
  }
  function getInputFields(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcCal();
    });
  }
  getStaticElement('#gender');
  getStaticElement('.calculating__choose_big');
  getInputFields('#height');
  getInputFields('#weight');
  getInputFields('#age');
});
/******/ })()
;
//# sourceMappingURL=script.js.map