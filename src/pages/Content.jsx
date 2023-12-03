import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Content = ({ popularContent, movies, tvShows }) => {
  const { contentId } = useParams();
  const [content, setContent] = useState(null);
  const [contentBillboard, setContentBillboard] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmFlNzZhMjc2M2I0ZmI5ODZlNTU4ZWYwZmQ3MmY0MiIsInN1YiI6IjY1NTNjNjI0NTM4NjZlMDBmZjA1ZmQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-6rC-PtHGkaLvToWNnErBnyqMkfx9FkK5YlL6n5zmvo",
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
            const billboard = {
              backdrop: response.backdrops[0].file_path,
              logo: response.logos[0].file_path,
              poster: response.posters[0].file_path,
            };

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
            console.log(response);
          })
          .catch((err) => console.error(err));
      }
    };
    getContentDetail();
  }, [content]);

  return (
    <div>
      {content ? (
        <div>
          <h1>
            {content.media_type == "movie" ? content.title : content.name}
          </h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Content;
