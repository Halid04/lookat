const NotFoundPage = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Error 404: Page Not Found</h1>
      <video autoPlay controls>
        <source
          src="/src/videos/Rick Astley - Never Gonna Give You Up (Official Music Video).mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default NotFoundPage;
