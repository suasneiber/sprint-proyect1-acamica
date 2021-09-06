const usuarios = require('../models/usuarios');

// function validar_admin(req, res, next){
//     let user = req.body.username;
//     let password = req.body.password;
//     let usuario = usuarios.find(usuario => usuario.username === user  && usuario.password === password);
    
//     if(usuario){
//         if (usuario.perfil === "admin") {
//             next();
//         }else{
//           res.status(403).json({ "mesanje": "no tiene permiso para realizar esta acción" });
//        }
//     }
// }

function validar_indice (req, res, next){
    if(req.body.indice >= 0 && req.body.indice < usuarios.length){
        console.log("el indice si existe")
        next();
    }
    else{
        return res.status(500).json({"indice": "invalido"});
    }
}

function validar_admin (req, res , next){
    let username = req.body.username;
    
    let validarAdmin = usuarios.find(usuario => usuario.username === username)
    // console.log("validarAdmin",validarAdmin.perfil)
    if(validarAdmin){
        if(validarAdmin.perfil == "admin"){
            next();
        }else{
            res.send('no tenes permiso para esta acción')
        }
    }else{
        res.send('usuario no logueado')
    }
}

module.exports = {validar_admin, validar_indice};