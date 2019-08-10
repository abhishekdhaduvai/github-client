import React from 'react';
import callApi from '../util/api';

import '../commits.css';
import Timestamp from './Timestamp';

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
    console.log(commits);
    return (
      <div className="commits-container">
        <ul>
          {commits.map(commit => (
            <li key={commit.sha} className="commit">
              <div className="commit-message">
                <a href={`https://github.com/${repo.owner.login}/${repo.name}/commit/${commit.sha}`}>{commit.commit.message}</a>
              </div>
              <div className="commit-author">
                <img height={"20"} src={commit.author.avatar_url} className="avatar" alt="avatar" />
                <span className="commit-meta">
                  <a href={commit.author.url} className="author">{commit.commit.author.name}</a> commited
                  <Timestamp time={commit.commit.author.date} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Commits;