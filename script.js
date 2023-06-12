'use strict';

// Practice 1 -------------------------------------------------------

let numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

let personalMovieDB = {
	'count': numberOfFilms,
	'movies': {},
	'actors': {},
	'genres': [],
	'privat': false
};


for (let index = 0; index < 2; index++) {
	let moviesName = prompt('Один из последних просмотренных фильмов?', ''),
		moviesRating = +prompt('На сколько оцените его?', '');

	personalMovieDB.movies[moviesName] = moviesRating;
	
}





