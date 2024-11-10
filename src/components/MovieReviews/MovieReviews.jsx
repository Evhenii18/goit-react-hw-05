import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieReviews = () => {
	const { movieId } = useParams();
	const [reviews, setReviews] = useState([]);
	const apiKey = "304164cc1d44aff6dae4fbf67dcf5dc1";

	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
			)
			.then((response) => setReviews(response.data.results))
			.catch((error) => console.error(error));
	}, [movieId]);

	return (
		<div>
			<h3>Reviews</h3>
			<ul>
				{reviews.map((review) => (
					<li key={review.id}>{review.content}</li>
				))}
			</ul>
		</div>
	);
};

export default MovieReviews;
