import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>Error 404: Page Not Found</h1>
      <video autoPlay controls>
        <source
          src="/src/videos/Rick Astley - Never Gonna Give You Up (Official Music Video).mp4"
          type="video/mp4"
        />
      </video>

      <Link to={"/chart"}>
        <button className="guardaTrailerBtn">Vedere Grafici</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
