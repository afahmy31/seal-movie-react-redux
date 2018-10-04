import { createStore } from "redux";

const initialState = {
  showModal: false,
  searchKeyword: "",
  loading: true,
  movieData: [],
  clickedMovie: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON":
      return Object.assign({}, state, { showModal: true });
    case "OFF":
      return Object.assign({}, state, { showModal: false });
    case "DONE_LOADING":
      return Object.assign({}, state, { loading: false });
    case "GET_MOVIE_DATA":
      return Object.assign({}, state, { movieData: action.payload });
    case "GET_CLICKED_MOVIE":
      return Object.assign({}, state, { clickedMovie: action.payload });
    case "SEARCH":
      return Object.assign({}, state, { searchKeyword: action.payload });
    case "SEARCH_LOADING":
      return Object.assign({}, state, { loading: true });

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
