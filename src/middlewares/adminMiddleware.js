const adminMiddleware = (req, res, next) => {
  if (req.session.userAdmin) {
    next();
  } else {
    res.redirect("/user/login");
  }
};
module.exports = adminMiddleware;
