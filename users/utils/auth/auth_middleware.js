const jwt = require("jsonwebtoken"); // Middleware function to validate JWT tokens
function validateToken(req, res, next) {
  var token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  token = token.split(" ")[1]; //it is good to write such codes in try catch to handle proper exceptions    jwt.verify(token, ‘adsfasdfjkh$#asdfasdf.adsfxc’, (err, decoded) => {
  console.log(token);
  jwt.verify(token, "adsfasdfjkh$#asdfasdf.adsfxc", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    } // If the token is valid, save the decoded information for later use
    req.user = decoded;
    next();
  });
}
module.exports = validateToken;
