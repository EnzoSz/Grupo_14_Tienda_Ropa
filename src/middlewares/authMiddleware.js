const authMiddleware = (req, res, next) => {
  if (!req.session.userLogged && !req.session.userAdmin) {
    res.redirect("/user/login");
  }
  next();
};
module.exports = authMiddleware;
