import React from "react";
import "./App.css";
import axios from "axios";
import Tags from "./Components/Tags";
import Profiles from "./Components/Profiles";
import Search from "./Components/Search";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      tags: [],
      researchIsVisible: true
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get("http://localhost:3000/profiles"),
        axios.get("http://localhost:3000/tags")
      ])
      .then(
        axios.spread((profilesRes, tagsRes) => {
          const profiles = profilesRes.data;
          const tags = tagsRes.data;
          this.setState({ profiles, tags });
        })
      );
  }

  render() {
    return (
      <div className="App">
          <h1>Welcome to jaMusic</h1>
          <Profiles profiles={this.state.profiles} />
          <Tags tags={this.state.tags} />
          {this.state.researchIsVisible && 
          <Search tags={this.state.tags} />}
      </div>
    );
  }
}

export default App;
