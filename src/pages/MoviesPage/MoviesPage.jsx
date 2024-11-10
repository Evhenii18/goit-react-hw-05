// src/pages/MoviesPage/MoviesPage.jsx

import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom"; // Используем useLocation для получения текущего пути

const MoviesPage = ({ movies }) => {
  const location = useLocation(); // Получаем текущий путь с помощью useLocation

  // Проверяем, находимся ли мы на главной странице ("/")
  const isHomePage = location.pathname === "/";

  return (
    <div>
      {isHomePage && movies.length > 0 && (
        <h2>Trending Today</h2> // Показываем заголовок только на главной странице
      )}

      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                />
                <h3>{movie.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        // Показываем сообщение "No result" только если фильмы не найдены
        !isHomePage && <p>No result</p>
      )}
    </div>
  );
};

MoviesPage.propTypes = {
  movies: PropTypes.array.isRequired,
};




// Додаємо валідацію пропсів
MoviesPage.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			poster_path: PropTypes.string,
		})
	).isRequired,
};

export default MoviesPage;
