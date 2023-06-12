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


for (let index = 0; index < personalMovieDB.count; index++) {
	let moviesName = '',
		moviesRating = '';

	while (!moviesName || moviesName.length > 50){
		moviesName = prompt('Один из последних просмотренных фильмов?', '');
	}
	while (!moviesRating){
		moviesRating = +prompt('На сколько оцените его?', '');
	}


	if (personalMovieDB.count < 10){
		alert('Просмотрено довольно мало фильмов');
	}else if (10 <= personalMovieDB.count <= 30){
		alert('Вы классический зритель');
	}else if (personalMovieDB.count > 30){
		alert('Вы киноман');
	}else{
		alert('Произошла ошибка');
	}

	personalMovieDB.movies[moviesName] = moviesRating;
	
}





