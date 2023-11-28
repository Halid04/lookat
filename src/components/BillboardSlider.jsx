import { useEffect, useState } from "react";

const BillboardSlider = ({ popularContent }) => {
  const [popularContentPoster, setPopularContentPoster] = useState(null);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmFlNzZhMjc2M2I0ZmI5ODZlNTU4ZWYwZmQ3MmY0MiIsInN1YiI6IjY1NTNjNjI0NTM4NjZlMDBmZjA1ZmQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-6rC-PtHGkaLvToWNnErBnyqMkfx9FkK5YlL6n5zmvo",
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

  return (
    <div>
      {popularContentPoster && popularContentPoster.length > 0
        ? popularContentPoster.map((item) => {
            return (
              <div
                className="billboardPoster"
                key={item.id}
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
            );
          })
        : "Loading.."}
    </div>
  );
};

export default BillboardSlider;
