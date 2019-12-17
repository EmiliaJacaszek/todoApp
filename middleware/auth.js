const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.cookies.token || "";
  if (!token)
    return res
      .status(401)
      .render("login", { msg: "Invalid token. you must login first!" });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;

    next();
  } catch (ex) {
    res
      .status(400)
      .render("login", { msg: "Invalid token. you must login first!" });
  }
};
