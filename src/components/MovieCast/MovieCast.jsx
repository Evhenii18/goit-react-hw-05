import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieCast = () => {
	const { movieId } = useParams();
	const [cast, setCast] = useState([]);
	const apiKey = "304164cc1d44aff6dae4fbf67dcf5dc1";

	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
			)
			.then((response) => setCast(response.data.cast))
			.catch((error) => console.error(error));
	}, [movieId]);

	return (
		<div>
			<h3>Cast</h3>
			<ul>
				{cast.map((actor) => (
					<li key={actor.id}>{actor.name}</li>
				))}
			</ul>
		</div>
	);
};

export default MovieCast;
