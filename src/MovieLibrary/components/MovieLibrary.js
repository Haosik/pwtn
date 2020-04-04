import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { initialFetchMovies, fetchMovies } from "../store/actions";

import glassesIcon from "./3dglasses.svg";
import "./MovieLibrary.css";
import { getMovies } from "../store/selectors";
import MoviesList from "./MoviesList";

class MovieLibrary extends Component {
  static propTypes = {
    movies: PropTypes.array,
    initialFetchMovies: PropTypes.func,
    fetchMovies: PropTypes.func,
  };

  pageToFetch = 4;
  // To prevent too often fetch
  recentlyFetched = false;

  // Would also watch for pageLimit from response
  fetchOnScroll = () => {
    const { fetchMovies } = this.props;
    const { recentlyFetched } = this;
    const canFetchNow =
      window.scrollY > document.body.offsetHeight - window.outerHeight &&
      !recentlyFetched;
    const canFetchLater =
      window.scrollY > document.body.offsetHeight - window.outerHeight &&
      this.recentlyFetched;

    if (canFetchNow) {
      this.recentlyFetched = true;
      setTimeout(() => (this.recentlyFetched = false), 300);
      fetchMovies(this.pageToFetch);
      this.pageToFetch++;
    } else if (canFetchLater) {
      setTimeout(() => this.fetchOnScroll, 300);
    }
    return false;
  };

  componentDidMount() {
    const { initialFetchMovies } = this.props;
    initialFetchMovies();

    // Would use Intersection Observer but this is a quicker way :)
    window.addEventListener("scroll", this.fetchOnScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.fetchOnScroll);
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
  { initialFetchMovies, fetchMovies }
)(MovieLibrary);
