import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import store from "../Store/store";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w300";

const styles = {
  card: {
    maxWidth: 300,
    maxHeight: 600,
    margin: 10
  },
  media: {
    height: 400,
    width: 300
  }
};

class MovieCard extends Component {
  clickHandler = movieItem => {
    const movieID = movieItem.target.id;
    this.props.store.dispatch({ type: "ON" });
    const movie = store.getState().movieData.find(element => {
      if (Number(movieID) === element.id) {
        return element;
      }
      return null;
    });
    this.props.store.dispatch({
      type: "GET_CLICKED_MOVIE",
      payload: movie
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      movie: {}
    };
  }

  render() {
    return (
      <Link to={`/${this.props.movie.id}`}>
        <LazyLoad throttle={500} height={600}>
          <Card style={styles.card}>
            <CardActionArea onClick={movieItem => this.clickHandler(movieItem)}>
              <CardMedia
                style={styles.media}
                image={`${IMAGE_URL}${this.props.movie.poster_path}`}
                title={this.props.movie.title}
                id={this.props.movie.id}
              />
            </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {this.props.movie.title}
              </Typography>
              <h4>Rating: {this.props.movie.vote_average}</h4>
            </CardContent>
          </Card>
        </LazyLoad>
      </Link>
    );
  }
}

function mapStateToProps(state) {
  return {
    showModal: state.showModal
  };
}

export default connect(mapStateToProps)(withStyles(styles)(MovieCard));
