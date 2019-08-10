import React from 'react';

import Card from './components/Card';
import callApi from './util/api';
import './App.css';

class App extends React.PureComponent {

  state = {
    fetching: undefined,
    search: "",
    error: false,
    repos: [],
  }

  updateInput = (e) => {
    this.setState({search: e.target.value});
  }

  getRepos = () => {
    const { search } = this.state;
    if(search !== "") {
      const API = "https://api.github.com";
      const PATH = `/orgs/${search}/repos`;
      const options = {
        method: "GET",
      };

      this.setState({
        fetching: true,
        error: false
      });

      callApi(API, PATH, options)
        .then(json => {
          json.sort((a, b) => {
            return b.forks - a.forks;
          })

          this.setState({
            repos: json,
            fetching: false,
            error: false,
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            fetching: false,
            error: true,
            repos: []
          });
        })
    }
  }

  render() {
    const { fetching, search, repos, error } = this.state;
    return (
      <div className="App">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={this.updateInput}
          onKeyDown={(e) => e.key === 'Enter' ? this.getRepos() : null} />

        {fetching === undefined &&
          <div className="placeholder">Search for a User or an Organization using the search bar</div>
        }

        {fetching &&
          <div className="placeholder">Loading Repositories...</div>
        }

        {error &&
          <div className="placeholder">
            <div>There was an error fetching Repositories.</div>
            <div>Try a different Organization.</div>
          </div>
        }

        {
          !fetching && repos.length>0 &&
          <div>
            <div className="owner">
              <div className="owner-name-logo">
                <img height={"100"} src={repos[0].owner.avatar_url} className="avatar" alt="avatar" />
                <h1>{repos[0].owner.login}</h1>
              </div>

              <div className="repos-card">
                <div>Repositories</div>
                <div>{repos.length}</div>
              </div>

            </div>

            <h2 className="heading">Popular Repositories</h2>
            <div className="sub-heading">by Forks</div>
            <div className="cards-container">
              {
                repos.map(repo => (
                  <Card
                    key={repo.id}
                    repo={repo}
                    showDetails={this.showDetails} />
                ))
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
