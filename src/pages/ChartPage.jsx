import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, PolarArea, Radar } from "react-chartjs-2";

const ChartPage = ({ popularContent, movies, tvshows, theme }) => {
  const [popularContentVotes, setPopularContentVotes] = useState([]);
  const [moviesVotes, setMoviesVotes] = useState([]);
  const [tvshowsVotes, setTvshowsVotes] = useState([]);

  useEffect(() => {
    const popularContentChartData = () => {
      if (popularContent && popularContent.length > 0) {
        // console.log("pop", popularContent);
        const vote = {
          xAxis: popularContent.map((item) => {
            return item.name ? item.name : item.title;
          }),

          yAxis: popularContent.map((item) => {
            return item.vote_average;
          }),
        };

        console.log("votes poular", vote);
        setPopularContentVotes(vote);
      }
    };
    popularContentChartData();
  }, [popularContent]);

  useEffect(() => {
    const moviesChartData = () => {
      if (movies && movies.length > 0) {
        const vote = {
          xAxis: movies[0].movies.map((item) => {
            return item.name ? item.name : item.title;
          }),

          yAxis: movies[0].movies.map((item) => {
            return item.vote_average;
          }),
        };

        console.log("votes movie", vote);
        setMoviesVotes(vote);
      }
    };
    moviesChartData();
  }, [movies]);

  useEffect(() => {
    const tvShowsChartData = () => {
      if (tvshows && tvshows.length > 0) {
        const vote = {
          xAxis: tvshows[0].tvShows.map((item) => {
            return item.name ? item.name : item.title;
          }),

          yAxis: tvshows[0].tvShows.map((item) => {
            return item.vote_average;
          }),
        };

        console.log("votes tvshows", vote);
        setTvshowsVotes(vote);
      }
    };
    tvShowsChartData();
  }, [tvshows]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <div
        className="chartPopularContent"
        style={{
          backgroundColor: theme
            ? "rgba(0, 0, 0, 0.39)"
            : "rgba(255, 255, 255, 0.39)",
        }}
      >
        <Bar
          data={{
            labels: popularContentVotes?.xAxis,
            datasets: [
              {
                label:
                  "Statistica delle valutazioni dei contenuti popolari del giorno",
                data: popularContentVotes?.yAxis,
                backgroundColor: [
                  "#EF3340",
                  "#D32E73",
                  "#9F448F",
                  "#645091",
                  "#37507A",
                  "#2F4858",
                  "#007BDC",
                  "#196EE2",
                  "#CF38A9",
                  "#9558D0",
                ],
              },
            ],
          }}
        />
      </div>
      <div
        className="chartMovies"
        style={{
          backgroundColor: theme
            ? "rgba(0, 0, 0, 0.39)"
            : "rgba(255, 255, 255, 0.39)",
          height: "45rem",
        }}
      >
        <PolarArea
          data={{
            labels: moviesVotes?.xAxis,
            datasets: [
              {
                label:
                  "Statistica delle valutazioni dei film più popolari del giorno ",
                data: moviesVotes?.yAxis,
                backgroundColor: [
                  "#EF3340",
                  "#D32E73",
                  "#9F448F",
                  "#645091",
                  "#37507A",
                  "#2F4858",
                  "#007BDC",
                  "#196EE2",
                  "#CF38A9",
                  "#9558D0",
                ],
              },
            ],
          }}
        />
      </div>
      <div
        className="chartTvShows"
        style={{
          backgroundColor: theme
            ? "rgba(0, 0, 0, 0.39)"
            : "rgba(255, 255, 255, 0.39)",
          height: "45rem",
        }}
      >
        <Radar
          data={{
            labels: tvshowsVotes?.xAxis,
            datasets: [
              {
                label:
                  "Statistica delle valutazioni delle serie TV più popolari del giorno ",
                data: tvshowsVotes?.yAxis,
                backgroundColor: [
                  "#EF3340",
                  "#D32E73",
                  "#9F448F",
                  "#645091",
                  "#37507A",
                  "#2F4858",
                  "#007BDC",
                  "#196EE2",
                  "#CF38A9",
                  "#9558D0",
                ],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ChartPage;
