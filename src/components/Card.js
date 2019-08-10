import React from 'react';
import COLORS from '../constants/colors.json';
import '../card.css';

import FaStar from 'react-icons/lib/fa/star';
import FaCodeFork from 'react-icons/lib/fa/code-fork';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';

import Timestamp from './Timestamp';
import Commits from './Commits';

class Card extends React.PureComponent {

  state = {
    showCommits: false,
    toggle: "Show commits",
    commits: [],
  }

  toggle = () => {
    const { showCommits } = this.state;
    this.setState({
      toggle: showCommits ? "Show commits" : "Hide commits",
      showCommits: !showCommits,
    });
  }

  render () {
    const { repo } = this.props;
    const { showCommits, toggle } = this.state;
    const color = repo.language != null ? COLORS[repo.language].color : undefined;
    return (
      <div className="card">
        <a href={repo.svn_url}><h3 className="title">{repo.name}</h3></a>

        <div className="desc">
          {repo.description}
        </div>

        <div className="stats">
          {color !== undefined &&
            <div>
              <span className="dot" style={{background: color}}></span>
              <span className="fa-position">{repo.language}</span>
            </div>
          }
          <div>
            <FaStar color="gold" className="fa-position" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div>
            <FaCodeFork  className="fa-position" />
            <span>{repo.forks}</span>
          </div>
          <div>
            <FaExclamationCircle color="#cd4b4b"  className="fa-position" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div>
            Updated <Timestamp time={repo.updated_at} />
          </div>
        </div>

        <div className="show-commits" onClick={() => this.toggle(repo)}>
          {toggle}
        </div>

        {
          showCommits &&
          <Commits repo={repo} />
        }
      </div>
    );
  }
}

export default Card;
