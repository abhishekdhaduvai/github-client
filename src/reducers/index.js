const repos = {
  fetching: undefined,
  error: false,
  repos: [],
  page: 1,
  endOfList: false
}

export default function organization(state=repos, action) {
  switch(action.type) {
    case "LOAD_REPOS_REQUEST": {
      return {
        ...state,
        fetching: true,
        error: false,
        endOfList: false
      }
    }

    case "LOAD_REPOS_SUCCESS": {
      return {
        ...state,
        fetching: false,
        repos: action.json,
        page: action.page,
        endOfList: false
      }
    }

    case "LOAD_REPOS_FAILURE": {
      return {
        ...state,
        fetching: false,
        error: true,
        repos: [],
        page: 1,
        endOfList: false
      }
    }

    case "END_OF_LIST": {
      return {
        ...state,
        fetching: false,
        error: false,
        endOfList: true
      }
    }

    default: {
      return {
        ...state
      }
    }
  }
}