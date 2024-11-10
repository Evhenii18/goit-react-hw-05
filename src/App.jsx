import { useState, useEffect } from "react";
import {
	Route,
	Routes,
	NavLink,
	useLocation, // Импортируем useLocation для проверки текущего пути
} from "react-router-dom";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { fetchMovies, fetchPopularMovies } from "./services/api";
import styles from "./App.module.css";

const App = () => {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);

	// Функция для поиска фильмов
	const handleSearch = async (e) => {
		e.preventDefault();
		if (query.trim() === "") return;

		try {
			const results = await fetchMovies(query); 
			setMovies(results);
		} catch (error) {
			console.error("Ошибка при поиске фильмов:", error);
		}
	};

	// Получаем популярные фильмы при монтировании компонента
	useEffect(() => {
		const getPopularMovies = async () => {
			try {
				const results = await fetchPopularMovies();
				setPopularMovies(results);
			} catch (error) {
				console.error("Ошибка при загрузке популярных фильмов:", error);
			}
		};

		getPopularMovies();
	}, []);

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};

	// Получаем текущий путь с помощью useLocation
	const location = useLocation();

	return (
		<div>
			<header>
				{/* Добавим навигацию */}
				<nav className={styles.nav}>
					<NavLink to="/">
						<button>Home</button>
					</NavLink>
					<NavLink to="/movies">
						<button>Movies</button>
					</NavLink>
				</nav>

				{/* Форма для поиска отображается только на странице "/movies" */}
				{location.pathname === "/movies" && (
					<form onSubmit={handleSearch}>
						<input
							type="text"
							value={query}
							onChange={handleInputChange}
							placeholder="Search for movies..."
						/>
						<button type="submit">Search</button>
					</form>
				)}
			</header>

			<main>
				<Routes>
					{/* Главная страница с популярными фильмами */}
					<Route
						path="/"
						element={<MoviesPage movies={popularMovies} />} // Показываем популярные фильмы на главной
					/>
					{/* Страница поиска фильмов */}
					<Route
						path="/movies"
						element={<MoviesPage movies={movies} />} // Показываем фильмы по запросу
					/>
					{/* Страница с деталями фильма */}
					<Route
						path="/movies/:movieId"
						element={<MovieDetailsPage />}
					/>
					{/* Страница с ошибкой, если путь не найден */}
					<Route
						path="*"
						element={<NotFoundPage />}
					/>
				</Routes>
			</main>
		</div>
	);
};

export default App;
