import callApi from '../util/api';

export const getRepos = (search, page = 1) => (dispatch) => {

  if(search !== undefined && search.trim().length > 0) {

    const API = "https://api.github.com";
    const PATH = `/orgs/${search}/repos?sort=updated&page=${page}`;
    const options = {
      method: "GET",
    };

    dispatch(loadReposRequest());

    return callApi(API, PATH, options).then(
      json => {
        if(json.message === "Not Found")
          dispatch(loadReposFailure())
        if(json.length !== 0)
          dispatch(loadReposSuccess(json, page))
        else
          dispatch(endOfList());
      });
  }
}

const loadReposRequest = () => ({
  type: "LOAD_REPOS_REQUEST"
});

const loadReposSuccess = (json, page) => ({
  type: "LOAD_REPOS_SUCCESS",
  json,
  page,
});

const loadReposFailure = (error) => ({
  type: "LOAD_REPOS_FAILURE",
  error,
});

const endOfList = () => ({
  type: "END_OF_LIST"
})