import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { initialFetchMovies } from "../store/actions";

import glassesIcon from "./3dglasses.svg";
import "./MovieLibrary.css";
import { getMovies } from "../store/selectors";
import MoviesList from "./MoviesList";

class MovieLibrary extends Component {
  static propTypes = {
    movies: PropTypes.array,
    initialFetchMovies: PropTypes.func,
  };

  componentDidMount() {
    const { initialFetchMovies } = this.props;
    initialFetchMovies();
  }

  render() {
    const { movies } = this.props;
    return (
      <div className="MovieLibrary">
        <header className="ML-header">
          <img src={glassesIcon} className="ML-logo" alt="logo" />
          <h1 className="ML-title">Movies</h1>
        </header>
        <div className="ML-intro">
          {movies.length && <MoviesList movies={movies} />}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    movies: getMovies(state),
  }),
  { initialFetchMovies }
)(MovieLibrary);
