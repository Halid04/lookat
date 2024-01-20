import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentCard from "../components/contentCard";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Trailer from "../components/Trailer";
// import "primereact/resources/themes/lara-light-cyan/theme.css";

const Content = ({
  popularContent,
  movies,
  tvShows,
  theme,
  closePopup,
  popupVisible,
}) => {
  const { contentId } = useParams();
  const [content, setContent] = useState(null);
  const [contentDetail, setContentDetail] = useState(null);
  const [contentBillboard, setContentBillboard] = useState(null);
  const [cast, setCast] = useState(null);
  const [review, setReview] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "",
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
            console.log("details", response);
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

  useEffect(() => {
    const getRecommendations = () => {
      if (content) {
        let url = `https://api.themoviedb.org/3/${content.media_type}/${content.id}/recommendations?language=it-IT&page=1`;

        fetch(url, options)
          .then((response) => response.json())
          .then((response) => {
            let recommendations = response.results?.map((item) => {
              return item;
            });
            recommendations = recommendations.slice(0, 8);
            console.log("rac", recommendations);
            setRecommendation(recommendations);
          })
          .catch((err) => console.error(err));
      }
    };
    getRecommendations();
  }, [content]);

  useEffect(() => {
    const getReviews = () => {
      if (content) {
        let url = `https://api.themoviedb.org/3/${content.media_type}/${content.id}/reviews`;
        fetch(url, options)
          .then((response) => response.json())
          .then((response) => {
            const review = {
              reviewAuthors: response.results?.map((item) => item.author),
              reviewContent: response.results?.map((item) => item.content),
            };
            // console.log("review", review);
            setReview(review);
          })
          .catch((err) => console.error(err));
      }
    };
    getReviews();
  }, [content]);

  useEffect(() => {
    const getTrailer = () => {
      if (content) {
        let url = `https://api.themoviedb.org/3/${content.media_type}/${content.id}/videos`;

        fetch(url, options)
          .then((response) => response.json())
          .then((response) => {
            let video;
            video = response.results?.find((item) => {
              return item.type === "Trailer" || item.type === "Teaser";
            });
            console.log("videos", video);
            setTrailer(video);
          })
          .catch((err) => console.error(err));
      }
    };
    getTrailer();
  }, [content]);

  const codeToLanguage = (code) => {
    let languageNames = new Intl.DisplayNames(["it"], { type: "language" });
    return (
      languageNames.of(code).charAt(0).toUpperCase() +
      languageNames.of(code).slice(1)
    );
  };

  return (
    <div style={{ width: "100%" }}>
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
          <Button
            label="Guarda Trailer"
            className="guardaTrailerBtn"
            onClick={closePopup}
          />
          <Dialog
            visible={popupVisible}
            onHide={closePopup}
            header="Trailer"
            dismissableMask
            className="popupDialog"
            style={{
              backgroundColor: theme
                ? "var(--primary-color-dark-theme)"
                : "var(--primary-color-light-theme)",
              color: theme
                ? "var(--text-color-dark-theme)"
                : "var(--text-color-light-theme)",
            }}
          >
            {trailer !== null ? (
              trailer && trailer.key ? (
                <Trailer videoKey={trailer.key} />
              ) : (
                <p style={{ marginLeft: "1rem" }}>Trailer non presente</p>
              )
            ) : (
              <p style={{ marginLeft: "1rem" }}>Loading...</p>
            )}
          </Dialog>
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
            ? cast.length > 0
              ? cast.map((item, index) => (
                  <li key={index} style={{ listStyleType: "none" }}>
                    {item}
                  </li>
                ))
              : "Cast non presente"
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
      <div className="ReviewContainer">
        <h2 style={{ marginLeft: "1rem", marginBottom: "0px" }}>Reviews</h2>
        {review ? (
          review.reviewAuthors &&
          review.reviewAuthors.length > 0 &&
          review.reviewContent &&
          review.reviewContent.length > 0 ? (
            <div style={{ marginLeft: "1rem" }}>
              {review.reviewAuthors.map((author, index) => (
                <div key={index}>
                  <h4 style={{ marginBottom: "-10px" }}>Autore: {author}</h4>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Review: </span>
                    {review.reviewContent[index]}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ marginLeft: "1rem" }}>Reviews non presenti</p>
          )
        ) : (
          <p style={{ marginLeft: "1rem" }}>Loading...</p>
        )}
      </div>
      <div className="recommendationsContainer">
        <h2 style={{ marginLeft: "1rem" }}>Correlati</h2>
        <div className="correlati">
          {recommendation && recommendation.length > 0
            ? recommendation.map((item, index) => (
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
                    contentDetail &&
                    contentDetail.genres &&
                    contentDetail.genres.length > 0 &&
                    contentDetail.genres[0].name
                  }
                  contentID={item.id}
                  contentName={item?.name ? item?.name : item?.title}
                  closePopup={closePopup}
                />
              ))
            : recommendation
            ? "Correlati non presenti"
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Content;
