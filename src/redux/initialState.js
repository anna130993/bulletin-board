export const initialState = {
  posts: {
    data: [],
    present: null,
    latestFetch: null,
    request: {
      active: false,
      error: false,
      success: false,
    },
  },
  user: null,
};
