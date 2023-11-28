import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Content = () => {
  const { contentId } = useParams(); // Ottieni l'ID dal routing

  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmFlNzZhMjc2M2I0ZmI5ODZlNTU4ZWYwZmQ3MmY0MiIsInN1YiI6IjY1NTNjNjI0NTM4NjZlMDBmZjA1ZmQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-6rC-PtHGkaLvToWNnErBnyqMkfx9FkK5YlL6n5zmvo",
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${contentId}?language=it-IT`,
          options
        );

        if (response.ok) {
          const movieData = await response.json();
          setMovieDetails(movieData);
        } else {
          throw new Error("Failed to fetch movie details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [contentId]);

  return (
    <div>
      {movieDetails ? (
        <div>
          <h1>{movieDetails.title}</h1>
          <p>{movieDetails.overview}</p>
          {/* Altri dettagli del film */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Content;
