import React from 'react';
import Card from '../Card';
import { connect } from 'react-redux';
import { getRepos } from '../../actions';

class ReposContainer extends React.Component {

  updateInput = (e) => {
    this.setState({search: e.target.value});
  }

  getMoreRepos = () => {
    const { repos, page, loadRepos } = this.props;
    loadRepos(repos[0].owner.login, page+1);
  }

  render() {
    const { fetching, repos, endOfList } = this.props;

    return (
      <div>

        {fetching &&
          <div className="placeholder">Loading Repositories...</div>
        }

        {
          !fetching && repos && repos.length>0 &&
          <div>
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
            {endOfList ?
              <div className="next" onClick={this.getMoreRepos}>End of List</div> :
              <div className="next" onClick={this.getMoreRepos}>Next Page</div>
            }
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { fetching, endOfList, error, repos, page } = state;
  return {
    fetching, endOfList, error, repos, page
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadRepos: (search, page) => dispatch(getRepos(search, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReposContainer);