import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Content = ({ popularContent }) => {
  const { contentId } = useParams(); // Ottieni l'ID dal routing

  const [movieDetails, setMovieDetails] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const getContentInfo = () => {
      if (popularContent && popularContent.length > 0) {
        const content = popularContent.find(
          (item) => item.id === parseInt(contentId)
        );
        console.log(content);
        setContent(content);
      }
    };
    getContentInfo();
  }, [popularContent, contentId]);

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
