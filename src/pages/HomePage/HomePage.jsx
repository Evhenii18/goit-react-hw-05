import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetchMovies().then(setMovies);
	}, []);

	return (
		<div>
			<h1>Trending Movies</h1>
			<MovieList movies={movies} />
		</div>
	);
};

export default HomePage;
