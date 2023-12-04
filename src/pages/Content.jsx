import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Content = ({ popularContent, movies, tvShows, theme }) => {
  const { contentId } = useParams();
  const [content, setContent] = useState(null);
  const [contentDetail, setContentDetail] = useState(null);
  const [contentBillboard, setContentBillboard] = useState(null);
  const [cast, setCast] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmFlNzZhMjc2M2I0ZmI5ODZlNTU4ZWYwZmQ3MmY0MiIsInN1YiI6IjY1NTNjNjI0NTM4NjZlMDBmZjA1ZmQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-6rC-PtHGkaLvToWNnErBnyqMkfx9FkK5YlL6n5zmvo",
    },
  };

  useEffect(() => {
    const getContent = () => {
      let foundContent = null;

      if (!foundContent && popularContent && popularContent.length > 0) {
        foundContent = popularContent.find(
          (item) => item.id === parseInt(contentId)
        );
        if (foundContent) {
          setContent(foundContent);
        }
      }

      if (!foundContent && movies) {
        for (let i = 0; i < movies.length; i++) {
          foundContent = movies[i].movies.find(
            (item) => item.id === parseInt(contentId)
          );
          if (foundContent) {
            foundContent.media_type = "movie";
            setContent(foundContent);
          }
        }
      }

      if (!foundContent && tvShows && tvShows.length > 0) {
        for (let i = 0; i < tvShows.length; i++) {
          foundContent = tvShows[i].tvShows.find(
            (item) => item.id === parseInt(contentId)
          );
          if (foundContent) {
            foundContent.media_type = "tv";
            setContent(foundContent);
          }
        }
      }
    };
    getContent();
  }, [popularContent, movies, tvShows, contentId]);

  useEffect(() => {
    const getContentPoster = () => {
      if (content) {
        let url = `https://api.themoviedb.org/3/${content.media_type}/${content.id}/images`;
        fetch(url, options)
          .then((response) => response.json())
          .then((response) => {
            const billboard = {};

            if (
              response.backdrops &&
              response.backdrops.length > 0 &&
              response.backdrops[0].file_path
            ) {
              billboard.backdrop = response.backdrops[0].file_path;
            }

            if (
              response.logos &&
              response.logos.length > 0 &&
              response.logos[0].file_path
            ) {
              billboard.logo = response.logos[0].file_path;
            }

            if (
              response.posters &&
              response.posters.length > 0 &&
              response.posters[0].file_path
            ) {
              billboard.poster = response.posters[0].file_path;
            }

            // console.log("posters", billboard);
            setContentBillboard(billboard);
          })
          .catch((err) => console.error(err));
      }
    };
    getContentPoster();
  }, [content]);

  useEffect(() => {
    const getContentDetail = () => {
      if (content) {
        let url = `https://api.themoviedb.org/3/${content.media_type}/${content.id}?language=it-IT`;

        fetch(url, options)
          .then((response) => response.json())
          .then((response) => {
            // console.log("details", response);
            setContentDetail(response);
          })
          .catch((err) => console.error(err));
      }
    };
    getContentDetail();
  }, [content]);

  useEffect(() => {
    const getCast = () => {
      if (content) {
        let url = `https://api.themoviedb.org/3/${content.media_type}/${content.id}/credits?language=it-IT`;

        fetch(url, options)
          .then((response) => response.json())
          .then((response) => {
            let cast = response.cast.map((item) => {
              return item.name;
            });

            cast = cast.length > 10 ? cast.slice(0, 10) : cast;
            setCast(cast);
          })
          .catch((err) => console.error(err));
      }
    };
    getCast();
  }, [content]);

  const codeToLanguage = (code) => {
    let languageNames = new Intl.DisplayNames(["it"], { type: "language" });
    return (
      languageNames.of(code).charAt(0).toUpperCase() +
      languageNames.of(code).slice(1)
    );
  };

  return (
    <div>
      <div className="billboardPosterWrap">
        <div
          className="bgBillboardPoster"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${
              contentBillboard?.backdrop || contentBillboard?.poster
            })`,
          }}
        ></div>
        <div
          className="billboardPoster"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${
              contentBillboard?.backdrop || contentBillboard?.poster
            })`,
          }}
        >
          <div
            className="posterLogo contentPage"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${contentBillboard?.logo})`,
            }}
          ></div>
        </div>
        <div className="trailerBtnWatchListBtnWrap">
          <button className="guardaTrailerBtn">Guarda Trailer</button>
          <button className="watchListBtn">WatchList</button>
        </div>
      </div>
      <div className="genreList">
        {contentDetail &&
        contentDetail.genres &&
        contentDetail.genres.length > 0 ? (
          contentDetail.genres.map((genre, index) => (
            <div
              key={index}
              style={{
                borderColor: theme ? "#ffffff" : "#101010",
                color: theme
                  ? "var(--text-color-dark-theme)"
                  : "var(--text-color-light-theme)",
              }}
            >
              {genre.name}
            </div>
          ))
        ) : (
          <div style={{ marginLeft: "1rem" }}>Loading..</div>
        )}
      </div>
      <div className="descrizioneContainer">
        <h1 style={{ marginLeft: "1rem" }}>
          {content?.name ? content?.name : content?.title}
        </h1>
        <h2 style={{ marginLeft: "1rem" }}>Descrizione</h2>
        <div className="contenOverview">
          {contentDetail
            ? contentDetail.overview !== ""
              ? contentDetail.overview
              : "Descrizione non presente"
            : "Loading..."}
        </div>
      </div>
      <div className="infoContainer">
        <div className="castContainer">
          <h2>Cast</h2>
          {cast
            ? cast.map((item, index) => {
                return (
                  <li key={index} style={{ listStyleType: "none" }}>
                    {item}
                  </li>
                );
              })
            : "Loading..."}
        </div>
        <div className="voteContainer">
          <h2>Valutazione</h2>
          {contentDetail ? (
            <div>{String(contentDetail.vote_average).slice(0, 3)}</div>
          ) : (
            "Loading..."
          )}
        </div>
        <div className="languageContainer">
          <h2>Lingua</h2>
          {contentDetail ? (
            <div>{codeToLanguage(contentDetail.original_language)}</div>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
