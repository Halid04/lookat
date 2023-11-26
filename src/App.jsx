import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import GenresPage from "./pages/GenresPage";
import SideBar from "./components/SideBar";

const App = () => {
  const [popularContent, setPopularContent] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [moviesByGenres, setMoviesByGenres] = useState([]);
  const [topMoviesByGenres, setTopMoviesByGenres] = useState([]);
  const [tVShowsGenres, setTVShowsGenres] = useState([]);
  const [tVShowsByGenres, setTVShowsByGenres] = useState([]);
  const [topTvShowsByGenres, setTopTvShowsByGenres] = useState([]);
  const [darkTheme, setDarkTheme] = useState(true);

  const changeTheme = () => {
    setDarkTheme(!darkTheme);
    return darkTheme;
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmFlNzZhMjc2M2I0ZmI5ODZlNTU4ZWYwZmQ3MmY0MiIsInN1YiI6IjY1NTNjNjI0NTM4NjZlMDBmZjA1ZmQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-6rC-PtHGkaLvToWNnErBnyqMkfx9FkK5YlL6n5zmvo",
    },
  };

  useEffect(() => {
    const fetchDataPopularContent = () => {
      fetch(
        "https://api.themoviedb.org/3/trending/all/day?language=it-IT",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          let trendingMovies = response.results.filter((item) => {
            return item.media_type == "movie";
          });

          let trendingTVShows = response.results.filter((item) => {
            return item.media_type == "tv";
          });

          trendingMovies = trendingMovies.sort(
            (a, b) => b.popularity - a.popularity
          );

          trendingTVShows = trendingTVShows.sort(
            (a, b) => b.popularity - a.popularity
          );

          let topMovies;
          let topTVShows;

          trendingMovies.length > 5
            ? (topMovies = trendingMovies.slice(0, 5))
            : (topMovies = trendingMovies);

          trendingTVShows.length > 5
            ? (topTVShows = trendingTVShows.slice(0, 5))
            : (topTVShows = trendingTVShows);

          setPopularContent([...topMovies, ...topTVShows]);
        })
        .catch((err) => console.error(err));
    };
    fetchDataPopularContent();
  }, []);

  useEffect(() => {
    const fetchDataMoviesGenres = async () => {
      try {
        const responseGenres = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=it",
          options
        );
        const dataGenres = await responseGenres.json();
        setMoviesGenres(dataGenres);

        const genrePromises = dataGenres.genres.map(async (genre) => {
          const responseMovies = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=it-IT&page=1&sort_by=popularity.desc&with_genres=${genre.id}`,
            options
          );
          const moviesData = await responseMovies.json();

          const filteredMovies = moviesData.results;
          return { genre_id: genre.id, movies: filteredMovies };
        });

        const moviesByGenres = await Promise.all(genrePromises);

        moviesByGenres.length > 11
          ? setTopMoviesByGenres(moviesByGenres.slice(0, 11))
          : setTopMoviesByGenres(moviesByGenres);

        setMoviesByGenres(moviesByGenres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataMoviesGenres();
  }, []);

  useEffect(() => {
    const fetchDataTVShowsGenres = async () => {
      try {
        const responseGenres = await fetch(
          "https://api.themoviedb.org/3/genre/tv/list?language=it",
          options
        );
        const dataGenres = await responseGenres.json();
        setTVShowsGenres(dataGenres);

        const genrePromises = dataGenres.genres.map(async (genre) => {
          const responseTVShows = await fetch(
            `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=it-IT&page=1&sort_by=popularity.desc&with_genres=${genre.id}`,
            options
          );
          const tvShowsData = await responseTVShows.json();

          const filteredTVShows = tvShowsData.results;
          return { genre_id: genre.id, tvShows: filteredTVShows };
        });

        const tvShowsByGenres = await Promise.all(genrePromises);

        tvShowsByGenres.length > 11
          ? setTopTvShowsByGenres(tvShowsByGenres.slice(0, 11))
          : setTopTvShowsByGenres(tvShowsByGenres);

        setTVShowsByGenres(tvShowsByGenres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataTVShowsGenres();
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <SideBar
          filmCategorie={moviesGenres}
          serieCategorie={tVShowsGenres}
          changeTheme={changeTheme}
          theme={darkTheme}
        />

        <div
          className="temp"
          style={{
            color: darkTheme
              ? "var(--text-color-dark-theme)"
              : "var(--text-color-light-theme)",
            backgroundColor: darkTheme
              ? "var(--bg-dark-color)"
              : "var(--bg-light-color)",
          }}
        >
          <Routes>
            <Route index element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route
              path="/genre/:genreId"
              element={
                <GenresPage
                  genres={moviesGenres}
                  tvShowsGenres={tVShowsGenres}
                  moviesByGenres={moviesByGenres}
                  tvShowByGenres={tVShowsByGenres}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

/* <button
        onClick={() => {
          console.log("10 Film e Serie Tv popolari", popularContent);
        }}
      >
        Trending Content
      </button>

      <button
        onClick={() => {
          console.log("Categorie Film", moviesGenres);
        }}
      >
        Movies Genres
      </button>

      <button
        onClick={() => {
          console.log("Categorie ogni Film", moviesByGenres);
        }}
      >
        Movies By Genres
      </button>

      <button
        onClick={() => {
          console.log("Top Categorie ogni Film", topMoviesByGenres);
        }}
      >
        Top Movies By Genres
      </button>

      <button
        onClick={() => {
          console.log("Categorie Serie TV", tVShowsGenres);
        }}
      >
        TV Shows Genres
      </button>

      <button
        onClick={() => {
          console.log("Categorie ogni Serie TV", tVShowsByGenres);
        }}
      >
        TV Shows By Genres
      </button>

      <button
        onClick={() => {
          console.log("Top Categorie ogni Serie TV", topTvShowsByGenres);
        }}
      >
        Top TV Shows By Genres
      </button> */
