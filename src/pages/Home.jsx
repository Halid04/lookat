import React, { useEffect, useState } from "react";
import BillboardSlider from "../components/BillboardSlider";
import NavBar from "../components/NavBar";
import ContentCard from "../components/contentCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Home = ({
  popularContent,
  moviesGenres,
  tVShowsGenres,
  moviesByGenres,
  tvShowsByGenres,
  theme,
}) => {
  const [categorie, setCategorie] = useState([]);
  const [contentByGenres, setContentByGenres] = useState({});

  useEffect(() => {
    const contentByGenre = () => {
      if (
        moviesGenres?.genres?.length > 0 &&
        tVShowsGenres?.genres?.length > 0
      ) {
        const combinedGenres = [
          ...moviesGenres.genres,
          ...tVShowsGenres.genres,
        ];

        const uniqueGenres = Array.from(
          new Map(combinedGenres.map((genre) => [genre.id, genre])).values()
        );
        // console.log("category", tvShowsByGenres);

        setCategorie(uniqueGenres);
      }
    };

    contentByGenre();
  }, [moviesGenres, tVShowsGenres]);

  useEffect(() => {
    const combineMoviesAndTVShowsByCategory = () => {
      if (
        categorie.length > 0 &&
        moviesByGenres.length > 0 &&
        tvShowsByGenres.length > 0
      ) {
        const contentByCategory = {};
        // console.log(moviesByGenres);

        categorie.forEach((category) => {
          const moviesInCategory =
            moviesByGenres.find((item) => item.genre_id === category.id)
              ?.movies || [];
          const tvShowsInCategory =
            tvShowsByGenres.find((item) => item.genre_id === category.id)
              ?.tvShows || [];

          let selectedContents = [];

          if (moviesInCategory.length > 0 && tvShowsInCategory.length > 0) {
            selectedContents = getRandomSubset(
              [...moviesInCategory, ...tvShowsInCategory],
              11
            );
          } else if (moviesInCategory.length > 0) {
            selectedContents = getRandomSubset(moviesInCategory, 11);
          } else if (tvShowsInCategory.length > 0) {
            selectedContents = getRandomSubset(tvShowsInCategory, 11);
          }

          if (selectedContents.length > 0) {
            contentByCategory[category.id] = {
              category: category.name,
              contents: selectedContents,
            };
          }
        });

        // console.log("cbc", contentByCategory);
        setContentByGenres(contentByCategory);
      }
    };

    combineMoviesAndTVShowsByCategory();
  }, [categorie, moviesByGenres, tvShowsByGenres]);

  const getRandomSubset = (array, size) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(array.length, size));
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div>
      <BillboardSlider popularContent={popularContent} theme={theme} />

      <div className={`sliderRow ${theme ? "darkTheme" : "lightTheme"}`}>
        {categorie.map((category) => (
          <div key={category.id}>
            <Link
              to={`/genre/${category.id}`}
              style={{
                textDecoration: "none",
                color: theme
                  ? "var(--text-color-dark-theme)"
                  : "var(--text-color-light-theme)",
                transition: "0.2s",
              }}
            >
              <h2 className="categoryName" style={{ marginLeft: "1rem" }}>
                {category.name}{" "}
                <span
                  style={{
                    color: theme
                      ? "var(--secondary-color-dark-theme)"
                      : "var(--secondary-color-light-theme)",
                  }}
                >
                  {">"}
                </span>
              </h2>
            </Link>

            {contentByGenres[category.id] &&
            contentByGenres[category.id].contents ? (
              <Slider {...settings}>
                {contentByGenres[category.id].contents.map((item, index) => (
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
                    genere={category.name}
                    contentID={item.id}
                  />
                ))}
              </Slider>
            ) : (
              <div className="sliderLoading"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
