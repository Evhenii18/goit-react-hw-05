import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
	const [movies, setMovies] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("query") || "";

	useEffect(() => {
		if (query) {
			fetchMoviesByQuery(query).then(setMovies);
		}
	}, [query]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const searchQuery = form.elements.query.value;
		setSearchParams({ query: searchQuery });
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					name="query"
					defaultValue={query}
					placeholder="Search movies"
				/>
				<button type="submit">Search</button>
			</form>
			<MovieList movies={movies} />
		</div>
	);
};

export default MoviesPage;
