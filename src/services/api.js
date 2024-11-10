import axios from 'axios';

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDQxNjRjYzFkNDRhZmY2ZGFlNGZiZjY3ZGNmNWRjMSIsIm5iZiI6MTczMTI0MTc5MC4zNjYwMTE5LCJzdWIiOiI2NzMwYTU0MDZkZGRkODhkMDg5Y2I5ZTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tpvEIVvyal6AkRkm8JAYDLwRlzouilewaienCwoiRzY';


const instance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		Authorization: `Bearer ${API_TOKEN}`,
	},
});

export const fetchMovies = async (query) => {
	try {
		const response = await instance.get(`/search/movie?query=${query}`);
		return response.data.results; // Возвращаем результаты поиска
	} catch (error) {
		console.error("Ошибка при поиске фильмов:", error);
		throw error;
	}
};

export const fetchPopularMovies = async () => {
	try {
		const response = await instance.get("/movie/popular");
		return response.data.results; // Возвращаем популярные фильмы
	} catch (error) {
		console.error("Ошибка при получении популярных фильмов:", error);
		throw error;
	}
};

export { API_TOKEN };
