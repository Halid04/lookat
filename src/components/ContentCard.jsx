import { Link } from "react-router-dom";

const ContentCard = ({
  theme,
  poster,
  valutazione,
  annoUscita,
  genere,
  contentID,
  contentName,
  closePopup,
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
            <Link
              to={`/content/${contentID}`}
              className="playBtn"
              title="Guarda Trailer"
              onClick={closePopup}
              style={{
                backgroundImage: theme
                  ? "url(/src/images/playDarkIcon.png)"
                  : "url(/src/images/playLightIcon.png)",
                textDecoration: "none",
              }}
            ></Link>
            <div
              className="addBtn"
              title="Aggiungi a WatchList"
              onClick={() => {
                alert("Aggiunto a watchList(per finta)");
              }}
              style={{
                backgroundImage: theme
                  ? "url(/src/images/plusDarkIcon.png)"
                  : "url(/src/images/plusLightIcon.png)",
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
            <p style={{ opacity: "0.8" }}>{contentName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
