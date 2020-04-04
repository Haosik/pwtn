import React, { useEffect, useCallback } from "react";

import TMDBImage from "./TMDBImage";

const ExpandedMovieItem = ({
  movie: {
    title,
    original_title,
    poster_path,
    overview,
    vote_average,
    vote_count,
  },
  onClose,
}) => {
  const closeHandler = useCallback(
    (event) => {
      if (event.keyCode === 27) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", closeHandler);
    return () => {
      window.removeEventListener("keydown", closeHandler);
    };
  }, [closeHandler]);

  return (
    <div className="expanded-movie-item">
      <div className="expanded-outer">
        <div className="expanded-inner">
          <div className="expanded-content">
            <TMDBImage src={poster_path} className="poster" />
            <div className="description">
              <h2>
                {title}({original_title})
              </h2>
              <div>
                <h4>Rank(votes count)</h4>:{" "}
                <span>
                  {vote_average}({vote_count})
                </span>
              </div>
              <span>{overview}</span>
            </div>
          </div>
          <span className="expanded-close" onClick={onClose}>&#x2715;</span>
        </div>
        <div className="expanded-bg" onClick={onClose}></div>
      </div>
    </div>
  );
};

export default ExpandedMovieItem;