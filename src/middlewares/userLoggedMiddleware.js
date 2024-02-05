function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        //pasamos el usuario que viene de la sesion a una variable local
        res.locals.userLogged = req.session.userLogged
    }
    next();
    
}
module.exports = userLoggedMiddleware