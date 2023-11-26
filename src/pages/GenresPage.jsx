import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";

const GenresPage = ({
  genres,
  tvShowsGenres,
  moviesByGenres,
  tvShowByGenres,
}) => {
  const { genreId } = useParams();
  const [movieGenreIdAndName, setMovieGenreIdAndName] = useState(null);
  const [tvShowGenreIdAndName, setTvShowGenreIdAndName] = useState(null);
  const [moviesOfGenre, setMoviesOfGenre] = useState(null);
  const [tvShowOfGenre, setTvShowOfGenre] = useState(null);

  useEffect(() => {
    setMoviesOfGenre(null);
    setTvShowOfGenre(null);

    const getMovieGenreIdAndName = () => {
      if (genres.genres && genres.genres.length > 0) {
        const genreInfo = genres.genres.find(
          (genre) => genre.id === parseInt(genreId)
        );
        setMovieGenreIdAndName(genreInfo);
      }
    };

    getMovieGenreIdAndName();
  }, [genres, genreId]);

  useEffect(() => {
    const getTvShowGenreIdAndName = () => {
      if (tvShowsGenres.genres && tvShowsGenres.genres.length > 0) {
        const genreInfo = tvShowsGenres.genres.find(
          (genre) => genre.id === parseInt(genreId)
        );
        setTvShowGenreIdAndName(genreInfo);
      }
    };

    getTvShowGenreIdAndName();
  }, [tvShowsGenres, genreId]);

  useEffect(() => {
    const getMoviesOfGenre = () => {
      if (moviesByGenres && moviesByGenres.length > 0 && movieGenreIdAndName) {
        const findMoviesOfGenre = moviesByGenres.find((movie) => {
          return movie.genre_id === parseInt(movieGenreIdAndName?.id);
        });
        setMoviesOfGenre(findMoviesOfGenre);
      }
    };

    getMoviesOfGenre();
  }, [moviesByGenres, movieGenreIdAndName]);

  useEffect(() => {
    const getTvShowOfGenre = () => {
      if (tvShowByGenres && tvShowByGenres.length > 0 && tvShowGenreIdAndName) {
        const findTvShowOfGenre = tvShowByGenres.find((tvShow) => {
          return tvShow.genre_id === parseInt(tvShowGenreIdAndName?.id);
        });
        setTvShowOfGenre(findTvShowOfGenre);
      }
    };

    getTvShowOfGenre();
  }, [tvShowByGenres, tvShowGenreIdAndName]);

  if (!movieGenreIdAndName && !tvShowGenreIdAndName) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {moviesOfGenre &&
        moviesOfGenre.movies &&
        moviesOfGenre.movies.length > 0 && (
          <>
            {moviesOfGenre.movies.map((movie) => (
              <p key={movie.id}>{movie.original_title}, film</p>
            ))}
          </>
        )}
      {tvShowOfGenre &&
        tvShowOfGenre.tvShows &&
        tvShowOfGenre.tvShows.length > 0 && (
          <>
            {tvShowOfGenre.tvShows.map((tvShow) => (
              <p key={tvShow.id}>{tvShow.name}, serie</p>
            ))}
          </>
        )}
    </div>
  );
};

export default GenresPage;
