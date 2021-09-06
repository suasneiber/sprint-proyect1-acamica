const express = require('express');
const router = express.Router();
const pedidos = require('../models/pedidos');
let usuarios = require('../models/usuarios');
const validar_indice = require('../middlewares/pedidos')
const midUsuario = require('../middlewares/usuarios')

/**
 * @swagger
 * /pedidos:
 *  get:
 *    description: Lista todos los Pedidos
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/', function(req, res){
    let pedido = pedidos.forEach(order => console.log('detalles 1 :',order.detalle));

    res.send({'pedido': pedidos})
    console.log("clg",pedido)
})

//Puedo traer los pedidos con el nombre de usuario

/**
 * @swagger
 * /pedidos/:
 *  post:
 *    description: Mostrar pedidos por Usuario
 *    parameters:
 *    - name: username
 *      description: nombre de usuario
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/', function(req, res){
    // const user = req.body.username;
    let pedidoxUsusario = pedidos.filter(pedido => pedido.username == req.body.username)
    let index = usuarios.findIndex(usuario => usuario.username == req.body.username)


    if(usuarios[index].perfil == "admin"){
        res.send({"datos": pedidos})
    }
    else{
        res.send({"datos": pedidoxUsusario})
    }
})


/**
 * @swagger
 * /pedidos/crearpedido:
 *  post:
 *    description: Crear Pedido
 *    parameters:
 *    - name: username
 *      description: nombre de usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: detalle
 *      description: id de productos
 *      in: formData
 *      required: true
 *      type: string
 *    - name: total 
 *      description: precio total
 *      in: formData
 *      required: true
 *      type: string
 *    - name: medio de pago
 *      description: medio de pago
 *      in: formData
 *      required: true
 *      type: string
 *    - name: dirección
 *      description: dirección
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/crearpedido', function(req, res){
    console.log("usuario", req.body.username, "usuario2", usuarios.username )
    let index = usuarios.find(user => user.username === req.body.username )
    let nuevoPedido= {};

    let idPedido = pedidos[parseInt(pedidos.length - 1)].idPedido + 1;
    if(index){
        let time = new Date()
        nuevoPedido.id = idPedido;
        nuevoPedido.username = req.body.username
        nuevoPedido.detalle = req.body.detalle //pedidos.detalle.split(',').map(Number)

        nuevoPedido.hora =  time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        nuevoPedido.estado = "pendiente"
        nuevoPedido.medio_de_pago = req.body.medio_de_pago
        nuevoPedido.total = req.body.total;
        pedidos.push(nuevoPedido)        
        res.send("pedido creado")
    }else{
        res.send("usuario no registrado")
    }
})


/**
 * @swagger
 * /pedidos/modificar:
 *  put:
 *    description: Modificar Pedido
 *    parameters:
 *    - name: indice
 *      description: indice de pedido
 *      in: formData
 *      required: true
 *      type: string
 *    - name: detalle
 *      description: id de productos
 *      in: formData
 *      required: true
 *      type: string
 *    - name: total 
 *      description: precio total
 *      in: formData
 *      required: true
 *      type: string
 *    - name: medio_de_pago
 *      description: medio de pago
 *      in: formData
 *      required: true
 *      type: string
 *    - name: direccion
 *      description: dirección
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */

router.put('/modificar', validar_indice, function(req, res){
    
    if(pedidos[req.body.indice].estado == "pendiente"){
        let time = new Date()
        pedidos[req.body.indice].hora =  time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        pedidos[req.body.indice].detalle = req.body.detalle
        pedidos[req.body.indice].medio_de_pago = req.body.medio_de_pago;
        
        pedidos[req.body.indice].total = req.body.total;
        pedidos[req.body.indice].direccion = req.body.direccion;
    }else{
        res.send ("pedido en proceso,  no puede ser modificado")
    }
    

    res.send("pedido modificado")
})

/**
 * @swagger
 * /pedidos/modificarEstado:
 *  put:
 *    description: Modificar Estado
 *    parameters:
 *    - name: indice
 *      description: indice de pedido
 *      in: formData
 *      required: true
 *      type: string
 *    - name: estado
 *      description: estado de pedido
 *      in: formData
 *      required: true
 *      type: string
 *    - name: username
 *      description: rol de usuario
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put('/modificarEstado', validar_indice,  midUsuario.validar_admin, function(req, res){
    pedidos[req.body.indice].estado = req.body.estado;
    
    res.send("Estado modificado")
})
module.exports = router;
