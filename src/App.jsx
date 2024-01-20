import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GenresPage from "./pages/GenresPage";
import SideBar from "./components/SideBar";
import Account from "./pages/Account";
import NavBar from "./components/NavBar";
import Content from "./pages/Content";
import NotFoundPage from "./pages/NotFoundPage";
import ChartPage from "./pages/ChartPage";
import SearchPage from "./pages/searchPage";

const App = () => {
  const [popularContent, setPopularContent] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [moviesByGenres, setMoviesByGenres] = useState([]);
  const [topMoviesByGenres, setTopMoviesByGenres] = useState([]);
  const [tVShowsGenres, setTVShowsGenres] = useState([]);
  const [tVShowsByGenres, setTVShowsByGenres] = useState([]);
  const [topTvShowsByGenres, setTopTvShowsByGenres] = useState([]);
  const [darkTheme, setDarkTheme] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const breakpoint = 700;

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    // Pulizia dell'event listener al momento del unmount del componente
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const isMobile = windowWidth < breakpoint;

  const changeTheme = () => {
    setDarkTheme(!darkTheme);
    return darkTheme;
  };

  const closePopup = () => {
    setPopupVisible(!popupVisible);
    return popupVisible;
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "",
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
          // console.log([...topMovies, ...topTVShows]);
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
        setMovies(moviesByGenres);

        moviesByGenres.length > 11
          ? setTopMoviesByGenres(moviesByGenres.slice(0, 11))
          : setTopMoviesByGenres(moviesByGenres);

        // console.log(moviesByGenres);
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
        // console.log(tvShowsByGenres);
        setTvShows(tvShowsByGenres);

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
        {isMobile ? (
          <NavBar theme={darkTheme} />
        ) : (
          <SideBar
            filmCategorie={moviesGenres}
            serieCategorie={tVShowsGenres}
            changeTheme={changeTheme}
            theme={darkTheme}
          />
        )}

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
            <Route path="*" element={<NotFoundPage />} />
            <Route
              index
              element={
                <Home
                  popularContent={popularContent}
                  moviesGenres={moviesGenres}
                  tVShowsGenres={tVShowsGenres}
                  moviesByGenres={moviesByGenres}
                  tvShowsByGenres={tVShowsByGenres}
                  theme={darkTheme}
                  closePopup={closePopup}
                />
              }
            />
            <Route
              exact
              path="/home"
              element={
                <Home
                  popularContent={popularContent}
                  moviesGenres={moviesGenres}
                  tVShowsGenres={tVShowsGenres}
                  moviesByGenres={moviesByGenres}
                  tvShowsByGenres={tVShowsByGenres}
                  theme={darkTheme}
                  closePopup={closePopup}
                />
              }
            />
            <Route
              path="/genre/:genreId"
              element={
                <GenresPage
                  genres={moviesGenres}
                  tvShowsGenres={tVShowsGenres}
                  moviesByGenres={moviesByGenres}
                  tvShowByGenres={tVShowsByGenres}
                  theme={darkTheme}
                  closePopup={closePopup}
                />
              }
            />
            <Route
              path="/content/:contentId"
              element={
                <Content
                  popularContent={popularContent}
                  movies={movies}
                  tvShows={tvShows}
                  theme={darkTheme}
                  closePopup={closePopup}
                  popupVisible={popupVisible}
                />
              }
            />
            <Route
              path="/searchPage"
              element={<SearchPage theme={darkTheme} closePopup={closePopup} />}
            />
            <Route path="/account" element={<Account />} />
            <Route
              path="/chart"
              element={
                <ChartPage
                  popularContent={popularContent}
                  movies={moviesByGenres}
                  tvshows={tVShowsByGenres}
                  theme={darkTheme}
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
