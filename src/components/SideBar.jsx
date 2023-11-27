import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({ filmCategorie, serieCategorie, changeTheme, theme }) => {
  const [categorie, setCategorie] = useState();
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  useEffect(() => {
    const getCategorie = () => {
      if (
        filmCategorie.genres &&
        filmCategorie.genres.length > 0 &&
        serieCategorie.genres &&
        serieCategorie.genres.length > 0
      ) {
        // console.log("Categorie film:", filmCategorie);
        // console.log("Categorie serie TV:", serieCategorie);
        const combinedGenres = [
          ...filmCategorie.genres,
          ...serieCategorie.genres,
        ];

        const uniqueGenres = Array.from(
          new Map(combinedGenres.map((genre) => [genre.id, genre])).values()
        );

        setCategorie(uniqueGenres);
      }
    };
    getCategorie();
  }, [filmCategorie, serieCategorie]);

  return (
    <div
      className="sideBarContainer"
      style={{
        backgroundColor: theme
          ? "var(--primary-color-dark-theme)"
          : "var(--primary-color-light-theme)",
      }}
    >
      <Link
        to={`/home`}
        className="logoContainer"
        style={{
          backgroundImage: theme
            ? "url(/src/images/logoDarkMode.png"
            : "url(/src/images/logoLightMode.png",
        }}
      ></Link>
      <div className="accountWhatchListWrap">
        <div className="watchListLinkContainer">
          <div
            className="watchListIcon"
            style={{
              backgroundImage: theme
                ? "url(/src/images/watchListIcon.png)"
                : "url(/src/images/watchListLightIcon.png)",
            }}
          ></div>
          <p
            className="textWatchList"
            style={{
              color: theme
                ? "var(--text-color-dark-theme)"
                : "var(--text-color-light-theme)",
            }}
          >
            WatchList
          </p>
        </div>
        <div className="accountLinkContainer">
          <div
            className="accountIcon"
            style={{
              backgroundImage: theme
                ? "url(/src/images/accountIcon.png)"
                : "url(/src/images/accountLightIcon.png)",
            }}
          ></div>
          <p
            className="textAccount"
            style={{
              color: theme
                ? "var(--secondary-color-dark-theme)"
                : "var(--secondary-color-light-theme)",
            }}
          >
            Account
          </p>
        </div>
      </div>

      <div className="categorieWrap">
        <p
          className="textCategorie"
          style={{
            color: theme ? "rgba(255, 255, 255, 0.68)" : "rgb(16 16 16 / 82%)",
          }}
        >
          CATEGORIE
        </p>
        <div className="categorieContainer">
          {categorie &&
            categorie.map((item) => {
              return (
                <Link
                  to={`/genre/${item.id}`}
                  key={item.id}
                  onClick={() => setSelectedGenreId(item.id)}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <p
                    style={{
                      color: theme
                        ? "var(--text-color-dark-theme)"
                        : "var(--text-color-light-theme)",
                      opacity: selectedGenreId === item.id && "0.6",
                    }}
                  >
                    {item.name}
                  </p>
                </Link>
              );
            })}
        </div>
      </div>

      <div className="viewModeContainer" onClick={changeTheme}>
        <div
          className="viewModeIcon"
          style={{
            backgroundImage: theme
              ? "url(/src/images/sunIcon.png)"
              : "url(/src/images/moonIcon.png)",
          }}
        ></div>
        <p
          className="textViewMode"
          style={{
            color: theme
              ? "var(--secondary-color-dark-theme)"
              : "var(--secondary-color-light-theme)",
          }}
        >
          {theme ? "Light Mode" : "Dark Mode"}
        </p>
      </div>
    </div>
  );
};

export default SideBar;
