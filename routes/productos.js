var express = require('express');
var router = express.Router();
const productos = require('../models/productos')
const usuario = require('../middlewares/usuarios')
const validar_indice = require('../middlewares/productos')


/**
 * @swagger
 * /productos:
 *  get:
 *    description: Lista todos los Productos
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/', function(req, res){
    res.send({poductos: productos,})
})

/**
 * @swagger
 * /productos/:
 *  post:
 *    description: Crear Producto
 *    parameters:
 *    - name: username
 *      description: perfil de usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: nombre
 *      description: nombre
 *      in: formData
 *      required: true
 *      type: string
 *    - name: precio
 *      description: precio
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/', usuario.validar_admin , function(req, res){
    // let nombre = req.body.nombre;
    // console.log(nombre)

    let nuevoProducto = {}

    let idProd = productos[parseInt(productos.length - 1)].idP + 1;
    if(usuario.validar_admin){
       
        nuevoProducto.idP = idProd;
        nuevoProducto.nombre = req.body.nombre
        nuevoProducto.precio = req.body.precio 

        productos.push(nuevoProducto)        
        res.send("producto creado")
    }else{
        res.send("usuario no registrado")
    }

})

/**
 * @swagger
 * /productos:
 *  put:
 *    description: Modificar Producto
 *    parameters:
 *    - name: indice
 *      description: id de producto
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username
 *      description: perfil de usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: nombre
 *      description: nombre de producto
 *      in: formData
 *      required: true
 *      type: string
 *    - name: precio
 *      description: precio
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put('/', validar_indice, usuario.validar_admin ,function(req, res){
    productos[req.body.indice].nombre = req.body.nombre;
    productos[req.body.indice].precio = req.body.precio;

    res.send('Producto Actualizado')
})

/**
 * @swagger
 * /productos:
 *  delete:
 *    description: eliminar Producto
 *    parameters:
 *    - name: indice
 *      description: id de producto a eliminar
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username
 *      description: perfil de usuario
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.delete('/', validar_indice, usuario.validar_admin, function(req, res){
    productos.splice(req.body.indice, 1);
    res.send('Producto Eliminado')
})

module.exports = router;