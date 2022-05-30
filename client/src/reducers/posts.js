import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";
export default (posts = [], action) => {
  //state change to posts
  switch (action.type) {
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      ); //update,LIKE
    case FETCH_ALL:
      return action.payload; //actual post
    case CREATE:
      return [...posts, action.payload];

    default:
      return posts;
  }
};
