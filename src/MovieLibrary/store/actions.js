import { FETCH_MOVIES } from "../../actionTypes";

// Seems like Playing Now endpoint does not support any "pages count" as param
const playingNowLink =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=54ffed57deb5a7a8688be4de3007e578&language=en-US&page=";

function dispatchMovies(movies) {
  return {
    type: FETCH_MOVIES,
    payload: movies,
  };
}

// For next task
// export function fetchMovies(pageNumber) {
//   return (dispatch) => {
//     fetch(`${playingNowLink}${pageNumber}`)
//       .then((data) => data.json())
//       .then(({ results }) => dispatch(dispatchMovies(results)));
//   };
// }

export function initialFetchMovies() {
  return (dispatch) => {
    for (let i = 1; i <= 3; i++) {
      fetch(`${playingNowLink}${i}`)
        .then((data) => data.json())
        .then(({ results }) => {
          dispatch(dispatchMovies(results))
        });
    }
  };
}
