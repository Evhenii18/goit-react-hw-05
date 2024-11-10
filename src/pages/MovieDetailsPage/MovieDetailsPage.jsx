import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import axios from "axios";

const MovieDetailsPage = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	const [cast, setCast] = useState(null);
	const [reviews, setReviews] = useState(null);
	const [showCast, setShowCast] = useState(false);
	const [showReviews, setShowReviews] = useState(false);

	const apiKey = "304164cc1d44aff6dae4fbf67dcf5dc1";

	useEffect(() => {
		// Получаем данные о фильме
		axios
			.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
			.then((response) => setMovie(response.data))
			.catch((error) => console.error("Error fetching movie details:", error));

		// Получаем информацию о касте
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
			)
			.then((response) => setCast(response.data.cast))
			.catch((error) => console.error("Error fetching movie cast:", error));

		// Получаем отзывы
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
			)
			.then((response) => setReviews(response.data.results))
			.catch((error) => console.error("Error fetching movie reviews:", error));
	}, [movieId]);



	const handleToggleCast = () => {
		setShowCast((prevState) => !prevState);
		setShowReviews(false);
	};

	const handleToggleReviews = () => {
		setShowReviews((prevState) => !prevState);
		setShowCast(false);
	};

	return (
		<div>
			{movie && (
				<>
					<h2>{movie.title}</h2>
					<img
						src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						alt={movie.title}
						width={300}
					/>
					<p>{movie.overview}</p>
					<button onClick={handleToggleCast}>Show Cast</button>
					<button onClick={handleToggleReviews}>Show Reviews</button>

					{/* Каст */}
					{showCast && cast && (
						<div>
							<h3>Cast:</h3>
							<ul>
								{cast.slice(0, 5).map(
									(
										actor // Отображаем первых 5 актеров
									) => (
										<li key={actor.cast_id}>
											{actor.profile_path ? (
												<img
													src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
													alt={actor.name}
													width={100}
												/>
											) : (
												<img
													src="https://via.placeholder.com/100x150?text=No+Image"
													alt="No Image"
													width={100}
												/>
											)}
											<p>
												{actor.name} as {actor.character}
											</p>
										</li>
									)
								)}
							</ul>
						</div>
					)}

					{/* Отзывы */}
					{showReviews && reviews && (
						<div>
							<h3>Reviews:</h3>
							<ul>
								{reviews.slice(0, 3).map(
									(
										review // Отображаем первые 3 отзыва
									) => (
										<li key={review.id}>
											<p>{review.author}</p>
											<p>{review.content}</p>
										</li>
									)
								)}
							</ul>
						</div>
					)}
				</>
			)}

			<Outlet />
		</div>
	);
};

export default MovieDetailsPage;
