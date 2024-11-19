import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieCast = () => {
	const { movieId } = useParams();
	const [cast, setCast] = useState([]);

	useEffect(() => {
		const fetchMovieCast = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=304164cc1d44aff6dae4fbf67dcf5dc1`
				);
				setCast(response.data.cast);
			} catch (error) {
				console.error("Failed to fetch movie cast:", error);
			}
		};

		fetchMovieCast();
	}, [movieId]);

	return (
		<div>
			<h2>Cast</h2>
			<ul>
				{cast.map((actor) => (
					<li key={actor.id}>
						<p>{actor.name}</p>
						{actor.profile_path && (
							<img
								src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
								alt={actor.name}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

MovieCast.propTypes = {
	movieId: PropTypes.string.isRequired,
};

export default MovieCast;
