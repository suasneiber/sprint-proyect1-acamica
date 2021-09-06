const express = require('express');
var router = express.Router();
const usuarios = require('../models/usuarios')
const {validar_admin, validar_indice} = require('../middlewares/usuarios');
const pedidos = require('../models/pedidos')




/**
 * @swagger
 * /usuarios:
 *  get:
 *    description: Lista todos los Productos
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/', function(req, res){
    res.send({"usuarios": usuarios})
    console.log("usuarios")
})

/**
 * @swagger
 * /usuarios/login:
 *  post:
 *    description: Iniciar sesion
 *    parameters:
 *    - name: email
 *      description: Email user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/login',   function(req, res){
    // let user = req.body.username;
    let email = req.body.email;
    let contraseña = req.body.password;

    let validarLogin = usuarios.find(usuario => usuario.password === contraseña && usuario.email === email);
    let pedidoxUsusario = pedidos.filter(pedido => pedido.email === email)

    if (validarLogin) {
        if(pedidoxUsusario){
            res.send("sesion iniciada")


        }
    } else {
        res.status(400).json({ "mensaje": "el usuario no existe" })
    }

})


/**
 * @swagger
 * /usuarios/:
 *  post:
 *    description: Crear Usuario
 *    parameters:
 *    - name: username
 *      description: username
 *      in: formData
 *      required: true
 *      type: string
 *    - name: Lastname
 *      description: lastname
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: Email user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email confirm
 *      description: EmailConfirm
 *      in: formData
 *      required: true
 *      type: string
 *    - name: phone
 *      description: phone user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: address
 *      description: address user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: password
 *      in: formData
 *      required: true
 *      type: string
 *    - name: perfil
 *      description: perfil
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/' ,function(req, res){  //Crear usuario nuevo
    let email = req.body.email;
    let validar_email = usuarios.find(usuario => usuario.email === email)
    console.log(email)
    if(!validar_email){
        usuarios.push(req.body)
        res.send('usuario Creado')
    }
    else{
    res.json({"mensaje": "el Email ya se encuentra registrado, use otro"})
    }
    console.log("indice", usuarios[req.body.indice])
})

/**
 * @swagger
 * /usuarios/:
 *  put:
 *    description: modificar usuario
 *    parameters:
 *    - name: indice
 *      description: indice usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username
 *      description: username
 *      in: formData
 *      required: true
 *      type: string
 *    - name: lastname
 *      description: lastname
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: Email user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: tel
 *      description: phone user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: address
 *      description: address user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: password
 *      in: formData
 *      required: true
 *      type: string
 *    - name: perfil
 *      description: perfil
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put('/', validar_indice,  function(req, res){  //actualizar usuario
    usuarios[req.body.indice].username = req.body.username;
    usuarios[req.body.indice].lastname = req.body.lastname;
    usuarios[req.body.indice].password = req.body.password;
    usuarios[req.body.indice].email = req.body.email;
    usuarios[req.body.indice].tel = req.body.tel;
    usuarios[req.body.indice].perfil = req.body.perfil;
    usuarios[req.body.indice].address = req.body.address;


    res.send('usuario Actualizado')
})

/**
 * @swagger
 * /usuarios/:
 *  delete:
 *    description: eliminar usuario
 *    parameters:
 *    - name: indice
 *      description: indice usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username
 *      description: username perfil
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.delete('/', validar_admin, validar_indice, function(req, res){
    usuarios.splice(req.body.indice, 1);
    res.send('Usuario Eliminado')
})

module.exports = router;