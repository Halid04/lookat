import React, { useEffect, useState } from "react";

const Home = ({
  popularContent,
  moviesGenres,
  tVShowsGenres,
  moviesByGenres,
  tvShowsByGenres,
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

        setContentByGenres(contentByCategory);
      }
    };

    combineMoviesAndTVShowsByCategory();
  }, [categorie, moviesByGenres, tvShowsByGenres]);

  const getRandomSubset = (array, size) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(array.length, size));
  };

  return (
    <div>
      <div>
        <h1>Film e serie popolari</h1>
        {popularContent &&
          popularContent.map((item, index) => {
            let content = "";
            if (item.media_type === "movie") {
              content = item.title;
            } else if (item.media_type === "tv") {
              content = item.name;
            }

            return <p key={index}>{content}</p>;
          })}
      </div>
      <div>
        {categorie.map((category) => (
          <div key={category.id}>
            <h2>{category.name}</h2>
            {contentByGenres[category.id] &&
              contentByGenres[category.id].contents && (
                <ul>
                  {contentByGenres[category.id].contents.map((item, index) => (
                    <li key={index}>
                      {item.title || item.name}, {item.title ? "film" : "serie"}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
