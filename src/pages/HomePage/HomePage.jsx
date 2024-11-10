import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
	const [movies, setMovies] = useState([]);
	const apiKey = "304164cc1d44aff6dae4fbf67dcf5dc1";

	useEffect(() => {
		axios
			.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
			.then((response) => setMovies(response.data.results))
			.catch((error) => console.error(error));
	}, []);

	return <MovieList movies={movies} />;
};

export default HomePage;
