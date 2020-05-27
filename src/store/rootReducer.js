const initState = {
  posts: [],
  fetch: false,
};
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "NEW_POST": {
      let posts = state.posts || [];
      return { ...state, posts: [...posts, action.post], fetch: true };
    }
    case "FETCH_POSTS": {
      return {
        ...state,
        posts: [...action.posts],
        fetch: true,
      };
    }
    case "UPDATE_POSTS": {
      return { ...state, posts: [...action.posts] };
    }
    default: {
      return { ...state };
    }
  }
};

export default rootReducer;
