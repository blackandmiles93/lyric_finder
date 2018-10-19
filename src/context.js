//for the context API which is done using a created Provider tag that is a part of the context api
//do not export default since we are going to export a consumer from this as well
import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

// creating a reducer to handle an action that will allow the current track list to be changed based on the input from the search field
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results"
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track_list: [],
      heading: "Top 10 Tracks",
      dispatch: action => this.setState(state => reducer(state, action))
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=US&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
