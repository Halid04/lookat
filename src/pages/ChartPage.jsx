import { useEffect, useState } from "react";

const ChartPage = ({ popularContent, movies, tvshows }) => {
  const [popularContentVotes, setPopularContentVotes] = useState([]);
  const [moviesVotes, setMoviesVotes] = useState([]);
  useEffect(() => {
    const popularContentChartData = () => {
      if (popularContent && popularContent.length > 0) {
        // console.log("pop", popularContent);
        const vote = popularContent.map((item) => {
          return item.vote_average;
        });

        console.log("votes", vote);
        setPopularContentVotes(vote);
      }
    };
    popularContentChartData();
  }, [popularContent]);

  useEffect(() => {
    const moviesChartData = () => {
      if (movies && movies.length > 0 && movies.movies) {
        const vote = movies.movies.map((item) => {
          return item.vote_average;
          z;
        });

        console.log("votes", vote);
        setPopularContentVotes(vote);
      }
    };
  });

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="chartPopularContent"></div>
      <div className="chartMovies"></div>
      <div className="chartTvShows"></div>
    </div>
  );
};

export default ChartPage;
