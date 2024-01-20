import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const BillboardSlider = ({ popularContent, theme }) => {
  const [popularContentPoster, setPopularContentPoster] = useState(null);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "",
    },
  };

  useEffect(() => {
    const getPosterImage = async () => {
      if (popularContent && popularContent.length > 0) {
        const posterPromises = popularContent.map((item) => {
          let mediaType = item.media_type === "movie" ? "movie" : "tv";
          let url = `https://api.themoviedb.org/3/${mediaType}/${item.id}/images`;

          return fetch(url, options)
            .then((response) => response.json())
            .then((response) => {
              const { backdrops, logos } = response;

              return {
                id: item.id,
                backdrop: backdrops.length > 0 ? backdrops[0] : null,
                logo: logos.length > 0 ? logos[0] : null,
              };
            })
            .catch((err) => console.error(err));
        });

        const posters = await Promise.all(posterPromises);
        // console.log("Popular Content Posters:", posters);
        setPopularContentPoster(posters);
      }
    };
    getPosterImage();
  }, [popularContent]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={`sliderSlick ${theme ? "darkTheme" : "lightTheme"}`}>
      {popularContentPoster && popularContentPoster.length > 0 ? (
        <Slider {...settings}>
          {popularContentPoster.map((item) => {
            return (
              <Link
                to={`/content/${item.id}`}
                className="billboardPosterWrap"
                key={item.id}
              >
                <div
                  className="bgBillboardPoster"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop.file_path})`,
                  }}
                ></div>
                <div
                  className="billboardPoster"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop.file_path})`,
                  }}
                >
                  <div
                    className="posterLogo"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.logo.file_path})`,
                    }}
                  ></div>
                </div>
              </Link>
            );
          })}
        </Slider>
      ) : (
        <div className="main-item">
          <div
            className="animated-background"
            style={{
              background: theme
                ? "linear-gradient(to right, #ef3340 8%, #ef3340 18%, #101010 33%)"
                : "linear-gradient(to right, #444ce7 8%, #444ce7 18%, #ffffff 33%)",
            }}
          >
            <div className="background-masker"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillboardSlider;
