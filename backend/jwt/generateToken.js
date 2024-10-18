import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: false,
    secure: false,
    sameSite: "strict",
    path: "/",
  });

};
export default createTokenAndSaveCookie;
