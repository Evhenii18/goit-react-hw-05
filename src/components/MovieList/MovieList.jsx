import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
	const location = useLocation();

	return (
		<ul>
			{movies.map(({ id, title }) => (
				<li key={id}>
					<Link
						to={`/movies/${id}`}
						state={{ from: location }}
					>
						{title}
					</Link>
				</li>
			))}
		</ul>
	);
};

// Валідація пропсів
MovieList.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default MovieList;
