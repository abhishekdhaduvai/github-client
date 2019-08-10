import React from 'react';
import { connect } from 'react-redux';
import { getRepos } from '../actions';

import ReposContainer from '../components/ReposContainer/index.js';
import './App.css';

class App extends React.PureComponent {

  state = {
    search: "",
  }

  updateInput = (e) => {
    this.setState({search: e.target.value});
  }

  getRepos = () => {
    const { search } = this.state;
    this.props.loadRepos(search);
  }

  render() {
    const { search } = this.state;
    const { fetching, repos, error } = this.props;

    return (
      <div className="App">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={this.updateInput}
          onKeyDown={(e) => e.key === 'Enter' ? this.getRepos() : null} />

        <div>
          {fetching === undefined &&
            <div className="placeholder">Search for an Organization using the search bar</div>
          }

          {error &&
            <div className="placeholder">
              <div>There was an error fetching Repositories.</div>
              <div>Try a different Organization.</div>
            </div>
          }

          {
            repos && repos.length>0 &&
            <div>
              <div className="owner">
                <img height={"100"} src={repos[0].owner.avatar_url} className="avatar" alt="avatar" />
                <h1>{repos[0].owner.login}</h1>
              </div>

              <h2 className="heading">Popular Repositories</h2>
              <div className="sub-heading">Sorted by update time</div>
            </div>
          }
        </div>
        <ReposContainer search={search} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadRepos: (search) => dispatch(getRepos(search))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
