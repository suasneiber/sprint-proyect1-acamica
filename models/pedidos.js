const pedidos=[
    {
        idPedido: 0,
        username: 'pepito',
        detalle:[1,2],
        estado: "preparando",
        hora: "22:00",
        medio_de_pago: "tarjeta",
        total:710,
        direccion: "San martin 350"
        
    },
    {
        idPedido: 1,
        username: 'juliana',
        detalle:[1],    
        estado: "pendiente",
        hora: "00:00",
        medio_de_pago: "efectivo",
        total:1110,
        direccion: "san juan 4000"
    }
]
module.exports = pedidos;