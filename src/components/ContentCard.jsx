import { Link } from "react-router-dom";

const ContentCard = ({
  theme,
  poster,
  valutazione,
  annoUscita,
  genere,
  contentID,
}) => {
  return (
    <div className="sliderRow">
      <div
        className="card"
        style={{
          backgroundColor: theme
            ? "var(--primary-color-dark-theme)"
            : "var(--primary-color-light-theme)",
        }}
      >
        <Link
          to={`/content/${contentID}`}
          className="cardPoster"
          style={{
            textDecoration: "none",
          }}
        >
          <img src={poster} alt="" />
        </Link>
        <div className="cardHovered">
          <div className="buttonsContainer">
            <div
              className="playBtn"
              title="Guarda Trailer"
              style={{
                backgroundImage: theme
                  ? "url(src/images/playDarkIcon.png)"
                  : "url(src/images/playLightIcon.png)",
              }}
            ></div>
            <div
              className="addBtn"
              title="Aggiungi a WatchList"
              style={{
                backgroundImage: theme
                  ? "url(src/images/plusDarkIcon.png)"
                  : "url(src/images/plusLightIcon.png)",
              }}
            ></div>
          </div>
          <div className="textsContainer">
            <p>
              <span
                style={{
                  color: theme
                    ? "var(--secondary-color-dark-theme)"
                    : "var(--secondary-color-light-theme)",
                }}
              >
                Valutazione {valutazione}
              </span>{" "}
              - {annoUscita} - {genere}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
