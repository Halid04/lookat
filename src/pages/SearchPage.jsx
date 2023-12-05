import { useEffect, useRef, useState } from "react";
import ContentCard from "../components/contentCard";

const SearchPage = ({ theme, closePopup }) => {
  const inputRef = useRef(null);
  const [contentSearched, setContentSearched] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmFlNzZhMjc2M2I0ZmI5ODZlNTU4ZWYwZmQ3MmY0MiIsInN1YiI6IjY1NTNjNjI0NTM4NjZlMDBmZjA1ZmQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-6rC-PtHGkaLvToWNnErBnyqMkfx9FkK5YlL6n5zmvo",
    },
  };

  useEffect(() => {
    const searchContent = () => {
      let url = `https://api.themoviedb.org/3/search/multi?query=${inputRef.current.value}&include_adult=false&language=en-US&page=1`;

      fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          let contentSearch = response.results?.filter((item) => {
            return item.media_type === "movie" || item.media_type === "tv";
          });

          console.log("search", contentSearch);
          setContentSearched(contentSearch);
        })
        .catch((err) => console.error(err));

      console.log(inputRef.current.value);
    };
    inputRef.current.addEventListener("input", searchContent);

    // return () => {
    //   inputRef.current.removeEventListener("input", searchContent);
    // };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div className="searchContainer">
        <div
          className="inputContainer"
          style={{ borderColor: theme ? "white" : "#101010" }}
        >
          <input
            type="text"
            placeholder="Cerca..."
            ref={inputRef}
            style={{
              color: theme
                ? "var(--text-color-dark-theme)"
                : "var(--text-color-light-theme)",
            }}
          />
          <button
            style={{
              backgroundImage: theme
                ? "url(/src/images/searchIconLight.png)"
                : "url(/src/images/searchIconDark.png)",
            }}
          ></button>
        </div>
      </div>
      {contentSearched && contentSearched.length > 0 && (
        <div className="genrePage">
          {contentSearched.map((item, index) => (
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
              genere={item?.media_type}
              contentID={item.id}
              contentName={item?.name ? item?.name : item?.title}
              closePopup={closePopup}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
