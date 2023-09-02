
import { productosDisponibles } from "./main.js"

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]))

document.addEventListener("DOMContentLoaded", () => {
    dibujarCarrito()
})

let carrito = JSON.parse(sessionStorage.getItem("carrito"))
const listaCarrito = document.getElementById("items")
const footCarrito = document.getElementById("totales")
const btnCarrito = document.getElementById("btnCarrito")

const carritoTable = document.getElementById("carrito")

btnCarrito.addEventListener("click", () => {
    dibujarCarrito()
    if(carritoTable.style.display === "block"){
        carritoTable.style.display = "none"
    }else{
        carritoTable.style.display = "block"
    }
    
})

// funcion comprar productos parametros para buscar el producto por id crear id producto y export para mandar al inciio porque hay estan los productos
export const comprarProducto = (idProducto) => {

    const producto = productosDisponibles.find((producto) => producto.id === idProducto)

    const { nombre, precio, imagen, id } = producto  

    const productoCarrito = carrito.find((producto) => producto.id === idProducto)

        if(productoCarrito === undefined){
            const nuevoProductoCarrito = {
                id: id,
                nombre: nombre,
                precio: precio,
                imagen: imagen,
                cantidad:1
            }
            carrito.push(nuevoProductoCarrito)
            sessionStorage.setItem("carrito", JSON.stringify(carrito))
        }else{
            const indexProductoCarrito = carrito.findindex((producto) => producto.id === idProducto)

            carrito[indexProductoCarrito].cantidad++
            carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad
            sessionStorage.setItem("carrito", JSON.stringify(carrito))
        }

        carrito = JSON.parse(sessionStorage.getItem("carrito"))
        alert(` producto seleccionado${nombre}`)
        console.log(carrito)
}

const dibujarCarrito = () => {

    listaCarrito.innerHTML = ``
    
    carrito.forEach(producto => {

        const { imagen, nombre, cantidad, precio, id } = producto

        let body = document.createElement("tr")

        body.className = "producto__carrito"

        body.innerHTML = `
            
            //<th> <img id="fotoProductoCarrito" src="${imagen}" class="card-img-top"</th>
            <td>${nombre}</td>
            <td>${cantidad}</td>
            <td>${precio/cantidad}</td>
            <td>${precio}</td>
            <td>
                <button id="+${id}" class="btn btn-success">+</button>
                <button id="-${id}" class="btn btn-success">-</button>
            </td>
        `
        listaCarrito.append(body)

        const btnAgregar = document.getElementById(`+${id}`)
        const btnRestar = document.getElementById(`-${id}`)

        btnAgregar.addEventListener("click", () => aumentarCantidad(id))
        btnRestar.addEventListener("click", () => restarCantidad(id))
    });

    dibujarFooter()
}

const dibujarFooter = () => {

    if(carrito.lenght > 0){
        footCarrito.innerHTML = ""

        let footer = document.createElement("tr")

        footer.innerHTML = `
            <th><b>totales:</b></th>
            <td></td>
            <td>${generarTotales().cantidadtotal}</td>
            <td></td>
            <td>${generarTotales().costototal}</td>
        `

        footCarrito.append(footer)
    }else{
        footCarrito.innerHTML = "<h3>no hay producto</h3>"
    }
}


const generarTotales = () => {
    const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0)
    const cantidadTotal = carrito.reduce((total, { cantidad }) => total + cantidad, 0)

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal,
    }
}

const aumentarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad++
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

    sessionStorage.setItem("carrito", JSON.stringify(carrito))

    dibujarCarrito()

}
const restarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad--
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

    sessionStorage.setItem("carrito", JSON.stringify(carrito))

    if(carrito[indexProductoCarrito].cantidad === 0){
        carrito.splice(indexProductoCarrito, 1)
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito))

    dibujarCarrito()
}