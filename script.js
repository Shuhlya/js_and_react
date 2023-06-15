'use strict';

// Practice 1 -------------------------------------------------------

let numberOfFilms;

function start(){
	numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

	while(numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)){
		numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
	}
}

start();

let personalMovieDB = {
	'count': numberOfFilms,
	'movies': {},
	'actors': {},
	'genres': [],
	'private': false
};

function rememberMyFilms(){
	for (let index = 0; index < personalMovieDB.count; index++) {
		let moviesName = '',
			moviesRating = '';
	
		while (!moviesName || moviesName.length > 50){
			moviesName = prompt('Один из последних просмотренных фильмов?', '').trim();
		}
		while (!moviesRating){
			moviesRating = +prompt('На сколько оцените его?', '');
		}
		personalMovieDB.movies[moviesName] = moviesRating;
	}	
}

rememberMyFilms();



function detectedPersonalLevel(){
	if (personalMovieDB.count < 10){
		alert('Просмотрено довольно мало фильмов');
	}else if (10 <= personalMovieDB.count <= 30){
		alert('Вы классический зритель');
	}else if (personalMovieDB.count > 30){
		alert('Вы киноман');
	}else{
		alert('Произошла ошибка');
	}
}

detectedPersonalLevel();

function showMyDB(){
	if (!personalMovieDB.privat){
		console.log(personalMovieDB);
	}
}

showMyDB();

function writeYourGenres(){
	for(let i = 1; i <= 3; i++){
		personalMovieDB.genres.push = prompt(`Ваш любимый жанр под номеров ${i}`, '').trim();
	}
}
