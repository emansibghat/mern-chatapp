import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: false,
    secure: true, 
    sameSite: "None",
    path: "/",
  });
};

export default createTokenAndSaveCookie;