//TMDB

const API_KEY = 'api_key=2a118e74310a169e4f3579e028212916',
    API_REQEST = 'https://api.themoviedb.org/3/discover/movie?' + API_KEY + '&language=en-UK&sort_by=popularity.desc&include_adult=false&include_video=true&page=1',
    URL_IMG = 'http://image.tmdb.org/t/p/w500',
    SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?' + API_KEY;
const main = document.querySelector('#main'),
    form = document.querySelector('#form'),
    search = document.querySelector('#search'),
    genresArr = {
        "genres": [{
            "id": 28,
            "name": "Action"
        }, {
            "id": 12,
            "name": "Adventure"
        }, {
            "id": 16,
            "name": "Animation"
        }, {
            "id": 35,
            "name": "Comedy"
        }, {
            "id": 80,
            "name": "Crime"
        }, {
            "id": 99,
            "name": "Documentary"
        }, {
            "id": 18,
            "name": "Drama"
        }, {
            "id": 10751,
            "name": "Family"
        }, {
            "id": 14,
            "name": "Fantasy"
        }, {
            "id": 36,
            "name": "History"
        }, {
            "id": 27,
            "name": "Horror"
        }, {
            "id": 10402,
            "name": "Music"
        }, {
            "id": 9648,
            "name": "Mystery"
        }, {
            "id": 10749,
            "name": "Romance"
        }, {
            "id": 878,
            "name": "Science Fiction"
        }, {
            "id": 10770,
            "name": "TV Movie"
        }, {
            "id": 53,
            "name": "Thriller"
        }, {
            "id": 10752,
            "name": "War"
        }, {
            "id": 37,
            "name": "Western"
        }]
    },
    searchBlock = document.querySelector('#search_block');
//константы для пагинации
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

let currentPage,
    nextPage,
    prevPage,
    lastUrl = '',
    totalPages;

// Функция получения фильма
function getMovies(url) {
    lastUrl = url;
    fetch(url).then(result => result.json()).then(data => {
        data.results.length = 8;
        // console.log(data);
        if (data.results.length !== 0) {
            showMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;
            current.innerText = currentPage;
            if (currentPage <= 1) {
                prev.classList.add('disabled');
                next.classList.remove('disabled');
            } else if (currentPage >= totalPages) {
                prev.classList.remove('disabled');
                next.classList.add('disabled');
            } else {
                prev.classList.remove('disabled');
                next.classList.remove('disabled');
            }
            search.scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            main.innerHTML = `<h2 class="no-exist">This movie don't exist</h2>`;
        }
    });
}


//массив ативного жанра фильма 
let activeGenre = [];
// добавление раскрывающего списка жанров
function getGenres(type) {
    searchBlock.innerHTML = '';
    const select = document.createElement('select');
    select.classList.add('genres');
    searchBlock.appendChild(select);
    genresArr.genres.forEach((item) => {
        for (let i = 0; i <= genresArr.genres.length; i++) {
            let elm = genresArr.genres[i];
            const option = document.createElement('option');
            option.id = elm.id;
            option.textContent = elm.name;
            //активация жанра по клику
            option.addEventListener('click', () => {
                if (activeGenre == 0) {
                    activeGenre.push(elm.id);
                } else {
                    activeGenre.splice(0, 1);
                    activeGenre.push(elm.id);
                }
                // console.log(activeGenre);
                getMovies(API_REQEST + '&with_genres=' + encodeURI(activeGenre));
                genreSelection();
            });
            select.appendChild(option);
        }
    });
}
// показывать активный жанр фильма
function genreSelection() {
    const removeSelect = document.querySelectorAll('option');
    removeSelect.forEach(e => {
        e.classList.remove('select');
    });
    if (activeGenre.lenght != 0) {
        activeGenre.forEach(id => {
            const selectTag = document.getElementById(id);
            selectTag.classList.add('select');
        });
    }
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {
            overview,
            poster_path,
            release_date,
            title,
            vote_average,
            id,
            original_title
        } = movie;
        const movieBlock = document.createElement('div');
        movieBlock.classList.add('movie');
        movieBlock.id = `${id}`;
        movieBlock.innerHTML = `
        <img src="${poster_path ? URL_IMG + poster_path : "/img/no_poster.jpg"}"alt="${title}">
        <div class="movie-info">
            <h3 class="movie_title">${title}</h3>
        </div>
        <div class="overview">
            <span class="release">${release_date}</span>
            <span class="rating ${getVoteColor(vote_average)}">${vote_average}</span>
            <h3 class="decription"> Overview</h3>
            <span class="txt">${overview}</span>
        </div>
        `;
        main.appendChild(movieBlock);
        document.getElementById(id).addEventListener('click', () => {
            openNav(movie);
        });
    });
}
const overleyContent = document.getElementById('overlay-content');
// взято с www.w3schools.com/howto/howto_js_fullscreen_overlay.asp
/* Open when someone clicks on the span element */
function openNav(movie) {
    let id = movie.id;
    fetch('https://api.themoviedb.org/3/movie/' + id + '/videos?' + API_KEY).then(res => res.json()).then(videoData => {
        console.log(videoData);
        if (videoData) {
            document.getElementById("myNav").style.display = "block";
            if (videoData.results.length > 0) {
                let embed = [];
                let dotsVideoSlide = [];
                videoData.results.forEach((video, index) => {
                    let {
                        key,
                        name,
                        site
                    } = video;
                    if (site == "YouTube") {
                        embed.push(`
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    `);
                    dotsVideoSlide.push(`
                    <span class="dot-slide">${index + 1}</span>
                    `);
                    }
                });

                const content =`
                <h1 class="movie_title">${movie.original_title}</h1>
                <br/>

                ${embed.join('')}
                <br/>
                <div class="dots-slide">${dotsVideoSlide.join('')}</div>
                `;
                overleyContent.innerHTML = content;
                activeSlide = 0;
                showVideos();
            } else {
                overleyContent.innerHTML = `<h1>Video no found</h1>`;
            }
        }
        console.log(movie.id);
    });
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.display = "none";
}
// Функция видео
let activeSlide = 0,
    totalVideos = 0;

function showVideos(){
    let embedVideo = document.querySelectorAll('.embed');
    let dotActive = document.querySelectorAll('.dot-slide');
    totalVideos = embedVideo.length;
    embedVideo.forEach((embedTag, index) => {
        if( activeSlide == index){
            embedTag.classList.add('show');
            embedTag.classList.remove('hide');
        }else{
            embedTag.classList.add('hide'); 
            embedTag.classList.remove('show');
        }
    });
    dotActive.forEach((e, index) => {
        if (activeSlide == index){
            e.classList.add('dot_active');
        }else{
            e.classList.remove('dot_active');
        }
    });
}

const arrowLeft = document.getElementById('arrow-left'),
      arrowRight = document.getElementById('arrow-right');

arrowLeft.addEventListener('click', () =>{
    if (activeSlide > 0){
        activeSlide--;
    }else{
        activeSlide = totalVideos-1;
    }
    showVideos();
});
arrowRight.addEventListener('click', () =>{
    if (activeSlide < (totalVideos-1)){
        activeSlide++;
    }else{
        activeSlide = 0;
    }
    showVideos();
});

//оценка фильма
function getVoteColor(vote) {
    let voteRes = vote >= 7 ? 'rating-height' : 'rating-low';
    return voteRes;
}

// поиск фильма
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    // возвращаем список фильмов соотвествующий запросу, если ничего не вводим в поиск тогда ......
    //возвращаемся на изначальную страницу
    if (searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm);
    } else {
        getMovies(API_REQEST);
    }
});


//переход по старницам
prev.addEventListener('click', () => {
    if (prevPage > 0) {
        pageCall(prevPage);
    }
});
next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        pageCall(nextPage);
    }
});

function pageCall(page) {
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length - 1].split('=');
    if (key[0] != 'page') {
        let url = lastUrl + '&page=' + page;
        getMovies(url);
    } else {
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length - 1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b;
        getMovies(url);
    }
}

// Добавление именя пользователя на страницу из  LocalStorage
const userActive = document.querySelector('.user');

let userLocal = JSON.parse(localStorage.getItem('connected-user'));

userActive.innerHTML = `${userLocal.name}`;


getMovies(API_REQEST);
getGenres(genresArr);
