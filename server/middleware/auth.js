import jwt from "jsonwebtoken";

//wants to like a post
//click the like button =>auth middleware(next)=>like controller..
const auth = async (req, res, next) => {
  try {
    //if a user is who is claiming to be
    //after a user signin and signup he will have a token
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1]; //here 1 means token is in first position of an array
    //next line if its our own token or google auth
    const isCustomAuth = token.length < 500; //if token length lower than 500 that means it is our own token
    //if token length greater than 500 that means it will be google auth
    let decodedData; //this data got from token itself

    if (token && isCustomAuth) {
      //this is our own token
      decodedData = jwt.verify(token, "test");
      req.UserId = decodedData?.id;
    } else {
      //google token
      decodedData = jwt.decode(token);
      req.UserId = decodedData?.sub; //sub is google's name for specific id
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
