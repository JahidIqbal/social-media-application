import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux"; //global redux store
import useStyles from "./styles";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  //hook
  const posts = useSelector((state) => state.posts); //posts taking from reducers/index.js file posts
  const classes = useStyles();
  console.log(posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
