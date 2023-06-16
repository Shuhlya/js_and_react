'use strict';

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
	'private': false,

	rememberMyFilms: function (){
		for (let index = 0; index < this.count; index++) {
			let moviesName = '',
				moviesRating = '';
		
			while (!moviesName || moviesName.length > 50){
				moviesName = prompt('Один из последних просмотренных фильмов?', '').trim();
			}
			while (!moviesRating){
				moviesRating = +prompt('На сколько оцените его?', '');
			}
			this.movies[moviesName] = moviesRating;
		}},
	detectedPersonalLevel: function (){
		if (this.count < 10){
			alert('Просмотрено довольно мало фильмов');
		}else if (10 <= this.count <= 30){
			alert('Вы классический зритель');
		}else if (this.count > 30){
			alert('Вы киноман');
		}else{
			alert('Произошла ошибка');
		}},
	showMyDB: function(){
		if (!this.private){
			console.log(this);
		}},
	writeYourGenres: function (){
		for(let i = 1; i <= 3; i++){
			let gen = prompt(`Ваш любимый жанр под номеров ${i}`, '').trim();
			!gen? --i : this.genres.push(gen);
		}
		this.genres.forEach((element, i) => {
			console.log(`Любимый жанр ${i+1} - это ${element}`);
		});
	},
	toggleVisibleMyDB: function (){
		this.private? this.private = false : this.private = true;
	}
};


personalMovieDB.rememberMyFilms();
personalMovieDB.detectedPersonalLevel();
personalMovieDB.showMyDB();
personalMovieDB.writeYourGenres();
