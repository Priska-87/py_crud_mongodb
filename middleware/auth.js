module.exports = (req, res, next) => {
    if (!req.session.usuario) {
        res.json({msg: "Debes inicar sesión"})
    }
    next();
};

module.exports = (req, res, next) => {
    if (!req.cookies.sessionUsuario) {
        res.json({msg: "No hay ninguna cookie para guardar"})
    }
    next();
}

