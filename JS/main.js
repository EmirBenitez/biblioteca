
//----------------------------------------------------------------------------------------
//PROYECTO CON DOM:

let librosDiv = document.getElementById("libros")
// let verCatalogoBtn = document.getElementById("verCatalogo")
// let ocultarCatalogoBtn = document.getElementById("ocultarCatalogo")
let guardarLibroBtn = document.getElementById("guardarLibroBtn")
let inputBuscador = document.querySelector("#buscador")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let precioTotal = document.getElementById("precioTotal")

let productosEnCarrito
if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}

//FUNCTIONS PROYECTO DOM
//imprimiendo los objetos en el DOM
function verCatalogo(array) {
    librosDiv.innerHTML = ""

    for (let libro of array) {
        //código para imprimir el array
        //crear un div 
        let nuevoLibroDiv = document.createElement("div")
        nuevoLibroDiv.className = "col-12 col-md-6 col-lg-4 my-3"
        nuevoLibroDiv.innerHTML = `
        <div id="${libro.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
            <div class="card-body">
                <h4 class="card-title">${libro.titulo}</h4>
                <p>Autor: ${libro.autor}</p>
                <p class="${libro.precio <= 2300 && "ofertaLibro"}">Precio: ${libro.precio}</p>
                <button id="agregarBtn${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div> 
        `
        librosDiv.appendChild(nuevoLibroDiv)
        let agregarBtn = document.getElementById(`agregarBtn${libro.id}`)
        agregarBtn.onclick = () => {

            agregarAlCarrito(libro)
        }
    }
}



function agregarAlCarrito(libro) {
    console.log(`El producto ${libro.titulo} de ${libro.autor} ha sido agregado al carrito y vale ${libro.precio}`)
    //sumarlo a productosEnCarrito
    productosEnCarrito.push(libro)
    //setearlo en storage
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    //evaluar si ya existe o no el producto
}

function cargarLibro(array) {
    let inputAutor = document.getElementById("autorInput")
    let inputTitulo = document.getElementById("tituloInput")
    let inputPrecio = document.getElementById("precioInput")

    //hacerlo con la function constructora
    const nuevoLibro = new Libro(array.length + 1, inputAutor.value, inputTitulo.value, parseInt(inputPrecio.value), "ImgLibro.jpg")
    console.log(nuevoLibro)

    //pushearlo o sumarlo al array
    array.push(nuevoLibro)
    //guardar en storage:
    localStorage.setItem("estanteria", JSON.stringify(array))
    verCatalogo(array)
    let formAgregarLibro = document.getElementById("formAgregarLibro")

    formAgregarLibro.reset()

    //agregado Toastify:
    Toastify({
        text: `El libro ${nuevoLibro.titulo} de ${nuevoLibro.autor} ha sido agregado al stock`,
        duration: 2500,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "black"
        }
    }).showToast()
}


function buscarInfo(buscado, array) {

    let busquedaArray = array.filter(
        (libro) => libro.autor.toLowerCase().includes(buscado.toLowerCase()) || libro.titulo.toLowerCase().includes(buscado.toLowerCase())
    )
    busquedaArray.length == 0 ?
        (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, verCatalogo(busquedaArray))
        : (coincidencia.innerHTML = "", verCatalogo(busquedaArray))
}
function cargarProductosCarrito(array) {
    console.log("Funciona btn render carrito")
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito) => {

        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.titulo}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
        `
    })
    // agregar function eliminar   
    array.forEach((productoCarrito) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            //borrar del DOM
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            //eliminar del array
            //busco prod a eliminar
            let productoEliminar = array.find(libro => libro.id == productoCarrito.id)
            console.log(productoEliminar)
            //busco el indice
            let posicion = array.indexOf(productoEliminar)
            console.log(posicion)
            //splice (posicion donde trabajar, cant de elementos a eliminar)
            array.splice(posicion, 1)
            console.log(array)
            //eliminar storage (volver a setear)
            localStorage.setItem("carrito", JSON.stringify(array))
            //recalcular total
            compraTotal(array)
        })
    })
    compraTotal(array)
}
function agregarAlCarrito(libro) {
    console.log(libro)
    //evaluar si ya existe o no el producto
    let libroAgregado = productosEnCarrito.find((elem) => elem.id == libro.id)
    if (libroAgregado == undefined) {
        console.log(`El producto ${libro.titulo} de ${libro.autor} ha sido agregado al carrito y vale ${libro.precio}`)
        //sumarlo a productosEnCarrito
        productosEnCarrito.push(libro)
        //setearlo en storage
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        // console.log(productosEnCarrito)
        //sweetalert para experiencia de usuario
        Swal.fire({
            title: 'Ha agregado un producto :D',
            text: `El libro ${libro.titulo} de ${libro.autor} ha sido agregado`,
            icon: "info",
            confirmButtonText: "Gracias!",
            confirmButtonColor: "green",
            //milisegundo por medida
            timer: 3000,
            //para img
            imageUrl: `assets/${libro.imagen}`,
            imageHeight: 200
        })

    } else {
        console.log(`El producto ${libro.titulo} de ${libro.autor} ya se encuentra en el carrito`)
        Swal.fire({
            text: `El libro ${libro.titulo} de ${libro.autor} ya existe en el carrito`,
            icon: "info",
            timer: 1500,
            showConfirmButton: false
        })
    }

}
function compraTotal(array) {
    let total = array.reduce((acc, productoCarrito) => acc + productoCarrito.precio, 0)
    console.log("Acc con reduce " + total)
    total == 0 ?
        precioTotal.innerHTML = `No hay productos agregados` :
        precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`
    return total
}
//functions ordenar:
function ordenarMenorMayor(array) {
    //copia array original, para no modificar estanteria
    const menorMayor = [].concat(array)
    menorMayor.sort((param1, param2) => param1.precio - param2.precio)
    verCatalogo(menorMayor)
}

function ordenarMayorMenor(array) {
    //array que recibe y lo copia
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => b.precio - a.precio)
    verCatalogo(mayorMenor)

}

function ordenarAlfabeticamenteTitulo(array) {
    const ordenadoAlfabeticamente = [].concat(array)
    //ordenar algo que tiene un dato string
    //forma de la a-z ascendente
    ordenadoAlfabeticamente.sort((a, b) => {
        if (a.titulo > b.titulo) {
            return 1
        }
        if (a.titulo < b.titulo) {
            return -1
        }
        return 0
    })
    verCatalogo(ordenadoAlfabeticamente)
}


//EVENTOS:
guardarLibroBtn.addEventListener("click", () => {
    cargarLibro(estanteria)

})
inputBuscador.addEventListener("input", () => {
    buscarInfo(inputBuscador.value.toLowerCase(), estanteria)
})
//select para ordenar
selectOrden.addEventListener("change", () => {
    if (selectOrden.value == "1") {
        ordenarMayorMenor(estanteria)
    } else if (selectOrden.value == "2") {
        ordenarMenorMayor(estanteria)
    } else if (selectOrden.value == "3") {
        ordenarAlfabeticamenteTitulo(estanteria)
    } else {
        verCatalogo(estanteria)
    }
})

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})
verCatalogo(estanteria)


const DateTime = luxon.DateTime

const fechaHoy = DateTime.now()

let fecha = document.getElementById("fecha")
let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
fecha.innerHTML = `${fechaMostrar}`