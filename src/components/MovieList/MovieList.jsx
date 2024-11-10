import PropTypes from "prop-types";
import { Link } from "react-router-dom";



const MovieList = ({ movies }) => {
	return (
		<div>
			<ul>
				{movies.map((movie) => (
					<li key={movie.id}>
						<Link to={`/movies/${movie.id}`}>
							<img
								src={
									movie.poster_path
										? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
										: "https://via.placeholder.com/100x150?text=No+Image" // Заменить на изображение-заглушку
								}
								alt={movie.title}
								width={100}
							/>
							<h3>{movie.title}</h3>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

MovieList.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			poster_path: PropTypes.string, // Может быть пустым или null
		})
	).isRequired,
};

export default MovieList;
