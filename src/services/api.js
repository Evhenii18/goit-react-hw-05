const API_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDQxNjRjYzFkNDRhZmY2ZGFlNGZiZjY3ZGNmNWRjMSIsIm5iZiI6MTczMjAxOTkwMi43ODg3MzY2LCJzdWIiOiI2NzMwYTU0MDZkZGRkODhkMDg5Y2I5ZTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.DfwTXXK9LdWuoY4Y2if3t6LSc6RsEwFjUxjIpLjF044';  // Ваш Bearer Token
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchMovies = async () => {
	const response = await fetch(`${API_URL}/trending/movie/week`, {
		method: 'GET',
		headers: {
			'Authorization': BEARER_TOKEN,  // Передаем Bearer Token в заголовке
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();
	return data.results.map((movie) => ({
		...movie,
		posterUrl: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
	}));
};

export const fetchMovieReviews = async (movieId) => {
	const response = await fetch(`${API_URL}/movie/${movieId}/reviews`, {
		method: 'GET',
		headers: {
			'Authorization': BEARER_TOKEN, 
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch reviews');
	}

	const data = await response.json();
	return data.results; 
};


export const fetchMoviesByQuery = async (query) => {
	const response = await fetch(`${API_URL}/search/movie?query=${query}`, {
		method: 'GET',
		headers: {
			'Authorization': BEARER_TOKEN,  // Передаем Bearer Token в заголовке
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();
	return data.results;
};

export const fetchMovieById = async (movieId) => {
	const response = await fetch(`${API_URL}/movie/${movieId}`, {
		method: 'GET',
		headers: {
			'Authorization': BEARER_TOKEN,  // Передаем Bearer Token в заголовке
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();

	// Получаем жанры фильма
	const genres = data.genres ? data.genres.map((genre) => genre.name).join(', ') : 'N/A';

	// Получаем рейтинг зрителей
	const rating = data.vote_average || 'N/A';  // Если рейтинг не найден, возвращаем 'N/A'

	return {
		...data,
		posterUrl: data.poster_path ? `${IMAGE_BASE_URL}${data.poster_path}` : null,
		genres,  // Добавляем жанры
		rating,  // Добавляем рейтинг зрителей
	};
};


export const fetchMovieCast = async (movieId) => {
	const response = await fetch(`${API_URL}/movie/${movieId}/credits`, {
		method: 'GET',
		headers: {
			'Authorization': BEARER_TOKEN,
			'Content-Type': 'application/json',
		},
	});
	

	const data = await response.json();
	return data.cast.map((actor) => ({
		...actor,
		profileUrl: actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : null,
	}));
};
