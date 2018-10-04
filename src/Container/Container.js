import React, { Component } from "react";
import MovieCard from "../MovieCard/MovieCard";
import axios from "axios";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import Grid from "@material-ui/core/Grid";
import Classes from "./Container.css";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import store from "../Store";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// API URL
const MOST_POPULAR_MOVIES_URL =
  "https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=767f1f983125c3765edba2d7021d9202";
const IMAGE_URL = "https://image.tmdb.org/t/p/w300";

// styling the Modal position
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class Container extends Component {
  getMovies = URL => {
    axios
      .get(URL)
      .then(response => {
        // handle success
        var movieArray = response.data.results;
        this.props.store.dispatch({
          type: "GET_MOVIE_DATA",
          payload: movieArray
        });
        this.props.store.dispatch({
          type: "DONE_LOADING"
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
  componentWillMount() {
    this.getMovies(MOST_POPULAR_MOVIES_URL);
  }

  closeModal = () => {
    const action = { type: "OFF" };
    this.props.store.dispatch(action);
  };

  render() {
    const searchKeyword = store.getState().searchKeyword;
    const SEARCH_MOVIES_URL = `https://api.themoviedb.org/3/search/movie?api_key=767f1f983125c3765edba2d7021d9202&language=en-US&query=${searchKeyword}&page=1&include_adult=false`;

    const { classes } = this.props;
    const clickedMovieData = store.getState().clickedMovie;
    const modal = (
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={store.getState().showModal}
        onClose={this.closeModal}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <img
            className={Classes.ModalImage}
            src={`${IMAGE_URL}${clickedMovieData.backdrop_path}`}
            alt={""}
          />
          <Typography
            className={Classes.ModalTitle}
            align="center"
            variant="title"
            id="modal-title"
          >
            {clickedMovieData.title}
          </Typography>
          <Typography
            className={Classes.ModalText}
            color="textSecondary"
            variant="body2"
            id="modal-description"
          >
            {clickedMovieData.overview}
          </Typography>
        </div>
      </Modal>
    );

    const grid = (
      <Grid container justify="center" className={Classes.Container}>
        {store.getState().movieData.map((movie, i) => {
          return (
            <Grid item lg={3} key={movie.id}>
              <MovieCard
                store={store}
                movie={movie}
                showModal={this.props.showModal}
                key={movie.id}
              />
            </Grid>
          );
        })}
        {modal}
      </Grid>
    );

    if (store.getState().loading && searchKeyword !== "") {
      return this.getMovies(SEARCH_MOVIES_URL) ? grid : <Spinner className={Classes.Container}/>;
    } else {
      return <Link to="/">{grid}</Link>;
    }
  }
}

function mapStateToProps(state) {
  return {
    showModal: state.showModal,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Container));