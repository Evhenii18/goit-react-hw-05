import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
	fetchMovieCast,
	fetchMovieReviews,
	fetchMovieById,
} from "../../../src/services/api";

const MovieDetailsPage = () => {
	const { movieId } = useParams(); // Получаем movieId из URL
	const [movie, setMovie] = useState(null);
	const [cast, setCast] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [showCast, setShowCast] = useState(false);
	const [showReviews, setShowReviews] = useState(false);

	useEffect(() => {
		if (!movieId) return;

		const fetchMovieData = async () => {
			try {
				const movieData = await fetchMovieById(movieId);
				setMovie(movieData);

				const castData = await fetchMovieCast(movieId);
				setCast(castData);

				const reviewsData = await fetchMovieReviews(movieId);
				setReviews(reviewsData);
			} catch (error) {
				console.error("Error fetching movie data:", error);
			}
		};

		fetchMovieData();
	}, [movieId]);

	const toggleCast = () => setShowCast((prev) => !prev);
	const toggleReviews = () => setShowReviews((prev) => !prev);

	return (
		<div>
			{movie ? (
				<div>
					<h1>{movie.title}</h1>
					<p>{movie.overview}</p>
					<img
						src={movie.posterUrl}
						alt={movie.title}
					/>

					{/* Отображение жанров */}
					<div>
						<h3>Genres: {movie.genres}</h3>
					</div>

					{/* Отображение рейтинга */}
					<div>
						<h3>Rating: {movie.rating} / 10</h3>
					</div>

					{/* Раскрывающийся список актеров */}
					<div>
						<button onClick={toggleCast}>
							{showCast ? "Hide Cast" : "Show Cast"}
						</button>
						{showCast && (
							<ul>
								{cast.length > 0 ? (
									cast.map((actor) => (
										<li key={actor.id}>
											<img
												src={actor.profileUrl}
												alt={actor.name}
												style={{
													width: "50px",
													height: "75px",
													marginRight: "10px",
												}}
											/>
											{actor.name}
										</li>
									))
								) : (
									<li>No cast information available</li>
								)}
							</ul>
						)}
					</div>

					{/* Раскрывающийся список отзывов */}
					<div>
						<button onClick={toggleReviews}>
							{showReviews ? "Hide Reviews" : "Show Reviews"}
						</button>
						{showReviews && (
							<ul>
								{reviews.length > 0 ? (
									reviews.map((review) => (
										<li key={review.id}>
											<p>
												<strong>{review.author}</strong>: {review.content}
											</p>
										</li>
									))
								) : (
									<li>No reviews available</li>
								)}
							</ul>
						)}
					</div>
				</div>
			) : (
				<p>Loading movie data...</p>
			)}
		</div>
	);
};

export default MovieDetailsPage;
