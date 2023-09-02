// importa funcion del carrito este debe estar ene el incio porque aqui lo voy a utilizar ya que los productos estan en el incio
import { comprarProducto } from "./carrito.js"

// nodos de html
const divProductos = document.getElementById("productos");

// variable del storage para guardarlo en parse para retornar la clave producto y el export es porque hay que trasladar los productos 
 export let productosDisponibles = JSON.parse(localStorage.getItem("productos"));

//para cargar html conlas cards
document.addEventListener("DOMContentLoaded", () => {
    generarCardsProductos(productosDisponibles)
})

//funcion para generar productos en carrito

const generarCardsProductos = (productos) => {

    //recorra los productos y generamos la cards
    productos.forEach(producto => {

        //propiedad destructora para elimnar los producto.nombre y dejar solo la propiedad del objeto
        
        const { imagen, nombre, categoria, precio, id} = producto
        //variable de la card
        let card = document.createElement("div")
            // codigo html de card bst
            card.className = "producto"
            card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${producto.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">categoria: ${categoria}</p>
                    <p class="card-text">precio: <b>$${precio}</b></p>
                    <button id="comprar${id}" class="btn btn-primary">Comprar</button>
                </div>
            </div>`;
            //carge los productos en la card
            divProductos.appendChild(card)

            //validacion ++ id boton
            const btnComprar = document.getElementById(`comprar${id}`)
            btnComprar.addEventListener("click", () => comprarProducto(id))// cuando se hace click en la funcion hay que llamar a la funcion comprar producto para pasar el id de ese producto aqui donde se genera el evento porque es la id de productos
    });
};