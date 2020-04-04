import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import SortingOptions from "./SortingOptions";
import ExpandedMovieItem from "./ExpandedMovieItem";
import TMDBImage from "./TMDBImage";
import "./MoviesList.css";

export default class MoviesList extends PureComponent {
  static propTypes = {
    movies: PropTypes.array.isRequired,
  };

  state = {
    selectedMovie: null,
  };

  handleSelectMovie = (item) => this.setState({ selectedMovie: item });

  handleMovieClose = () => {
    document.body.classList.remove("fixed");
    this.setState({ selectedMovie: null });
  };

  handleSortingChange = (sortingType) => console.log(sortingType);

  render() {
    const { movies } = this.props;
    const { selectedMovie } = this.state;

    return (
      <div className="movies-list">
        <div className="items">
          <div className="sorting">
            <span>Sort by: </span>
            <SortingOptions onChange={this.handleSortingChange} />
          </div>
          {movies.map((movie) => (
            <MovieListItem
              key={movie.id}
              movie={movie}
              isSelected={selectedMovie === movie}
              onSelect={this.handleSelectMovie}
            />
          ))}
        </div>
        {/* Would also use https://www.npmjs.com/package/body-scroll-lock for modal*/}
        {selectedMovie && (
          <ExpandedMovieItem
            movie={selectedMovie}
            onClose={this.handleMovieClose}
          />
        )}
      </div>
    );
  }
}

class MovieListItem extends Component {
  handleClick = () => {
    const { movie, onSelect } = this.props;
    document.body.classList.add("fixed");
    onSelect(movie);
  };

  render() {
    const {
      movie: { title, vote_average, backdrop_path },
      isSelected,
    } = this.props;
    return (
      <div
        className={classNames("movie-list-item", { selected: isSelected })}
        onClick={this.handleClick}
        tabIndex="1"
      >
        <TMDBImage src={backdrop_path} className="backdrop" />
        {title}
        <span className="vote">
          {vote_average}
          <span role="img" aria-label="rating-star" className="star">
            ⭐
          </span>
        </span>
      </div>
    );
  }
}
