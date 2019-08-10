import React from 'react';
import callApi from '../../util/api';

import './commits.css';
import CommitDetails from '../CommitDetails';

class Commits extends React.PureComponent {

  state = {
    commits: [],
  }

  componentDidMount() {
    const { repo } = this.props;
    const API = "https://api.github.com";
    const PATH = `/repos/${repo.owner.login}/${repo.name}/commits`;
    const options = {
      method: "GET",
    };

    callApi(API, PATH, options)
      .then(json => {
        this.setState({ commits: json });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render () {
    const { repo } = this.props;
    const { commits } = this.state;
    return (
      <div className="commits-container">
        <ul>
          {commits.map(commit => (
            <CommitDetails key={commit.sha} owner={repo.owner.login} name={repo.name} commit={commit} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Commits;