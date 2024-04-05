function guestMiddleware(req, res, next) {

  if (req.session.userLogged || req.session.userAdmin) {

    let user = req.session.userLogged || req.session.userAdmin;
    
    return res.redirect("/user/profile/" + user.id); 
  }
  next();

  /* if (!req.session.userLogged || !req.session.admin){
    return res.redirect("/user/login");
  }
  next(); */
}
module.exports = guestMiddleware;
