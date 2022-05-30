import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

//controller for signin
export const signin = async (req, res) => {
  const { email, password } = req.body; //getting email password data from frontend
  try {
    const existingUser = await User.findOne({ email });
    //if user not exist
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist " });
    //checking if password match
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    // if password not exist
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });
    //if password match with database
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    //finally
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
//controller for signup
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });
    //hashed password
    const hashedPassword = await bcrypt.hash(password, 12); //12 salt number
    //45 line password has been passed as hashedPassword
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    //token checking after sign up
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token }); //here result itself is a user
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
