const adminMiddleware = (req, res, next) => {
  if (req.session.userAdmin || req.session.userLogged) {
    res.clearCookie("userEmail");
    req.session.destroy();
    next();
  } else {
    res.redirect("/user/login");
  }
};
module.exports = adminMiddleware;
