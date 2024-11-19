import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieReviews = () => {
	const { movieId } = useParams();
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const fetchMovieReviews = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=304164cc1d44aff6dae4fbf67dcf5dc1`
				);
				setReviews(response.data.results);
			} catch (error) {
				console.error("Failed to fetch movie reviews:", error);
			}
		};

		fetchMovieReviews();
	}, [movieId]);

	return (
		<div>
			<h2>Reviews</h2>
			{reviews.length > 0 ? (
				<ul>
					{reviews.map((review) => (
						<li key={review.id}>
							<p>
								<strong>{review.author}</strong>: {review.content}
							</p>
						</li>
					))}
				</ul>
			) : (
				<p>No reviews available.</p>
			)}
		</div>
	);
};

MovieReviews.propTypes = {
	movieId: PropTypes.string.isRequired,
};

export default MovieReviews;
