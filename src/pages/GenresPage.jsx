import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import ContentCard from "../components/contentCard";

const GenresPage = ({
  genres,
  tvShowsGenres,
  moviesByGenres,
  tvShowByGenres,
  theme,
  closePopup,
}) => {
  const { genreId } = useParams();
  const [movieGenreIdAndName, setMovieGenreIdAndName] = useState(null);
  const [tvShowGenreIdAndName, setTvShowGenreIdAndName] = useState(null);
  const [moviesOfGenre, setMoviesOfGenre] = useState(null);
  const [tvShowOfGenre, setTvShowOfGenre] = useState(null);
  const [contents, setContents] = useState(null);
  const [genreName, setGenreName] = useState(null);

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
        console.log("movie", findMoviesOfGenre);
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
        console.log("tv", findTvShowOfGenre);
        setTvShowOfGenre(findTvShowOfGenre);
      }
    };

    getTvShowOfGenre();
  }, [tvShowByGenres, tvShowGenreIdAndName]);

  useEffect(() => {
    const combineContent = () => {
      let contents;
      if (
        moviesOfGenre &&
        moviesOfGenre.movies &&
        moviesOfGenre.movies.length > 0
      ) {
        contents = [...moviesOfGenre.movies];
      }

      if (
        tvShowOfGenre &&
        tvShowOfGenre.tvShows &&
        tvShowOfGenre.tvShows.length > 0
      ) {
        contents = [...tvShowOfGenre.tvShows];
      }
      // console.log("contents", contents);
      setContents(contents);
    };
    combineContent();
  }, [moviesOfGenre, tvShowOfGenre]);

  return (
    <div>
      {movieGenreIdAndName ? (
        <h2 style={{ marginLeft: "1rem" }}>{movieGenreIdAndName?.name}</h2>
      ) : (
        <h2 style={{ marginLeft: "1rem" }}>{tvShowGenreIdAndName?.name}</h2>
      )}
      {contents && contents.length > 0 ? (
        <div className="genrePage">
          {contents.map((item, index) => (
            <ContentCard
              key={index}
              theme={theme}
              poster={
                item.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
                  : `https://image.tmdb.org/t/p/original/${item.poster_path}`
              }
              valutazione={item.vote_average}
              annoUscita={
                item.release_date
                  ? new Date(item.release_date).getFullYear()
                  : item.first_air_date
                  ? new Date(item.first_air_date).getFullYear()
                  : new Date().getFullYear()
              }
              genere={
                movieGenreIdAndName
                  ? movieGenreIdAndName?.name
                  : tvShowGenreIdAndName?.name
              }
              contentID={item.id}
              contentName={item?.name ? item?.name : item?.title}
              closePopup={closePopup}
            />
          ))}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default GenresPage;
