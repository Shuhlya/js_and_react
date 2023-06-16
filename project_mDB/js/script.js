/* Задания на урок:





4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
	movies: [
		'Логан',
		'Лига справедливости',
		'Ла-ла лэнд',
		'Одержимость',
		'Миротворец',
		'Скотт Пилигрим против...'
	]
};


let advBloks = document.querySelectorAll('.promo__adv > img'),
	genre = document.querySelector('.promo__genre'),
	promoBg = document.querySelector('.promo__bg'),
	movieList = document.querySelector('.promo__interactive-list'),

	li = document.createElement('li');


advBloks.forEach(element => {
	element.remove();
});

genre.textContent = 'драма';

promoBg.style.backgroundImage = 'url(img/bg.jpg)';

movieList.innerHTML = '';
movieDB.movies.sort().forEach(element => {
	movieList.innerHTML += `<li class="promo__interactive-item">${element.toUpperCase()}
                                <div class="delete"></div>
                            </li>`;
});

