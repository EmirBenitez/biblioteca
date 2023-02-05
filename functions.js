//FUNCTIONS proyecto:
//functions para el menú:
function agregarLibro(array) {
    let autorIngresado = prompt("Ingrese el nombre del autor")
    let tituloIngresado = prompt("Ingrese el titulo del libro")
    let precioIngresado = parseInt(prompt("Ingrese el precio del libro"))

    //hacerlo con la function constructora
    const nuevoLibro = new Libro(array.length + 1, autorIngresado, tituloIngresado, precioIngresado)
    console.log(nuevoLibro)

    //pushearlo o sumarlo al array
    array.push(nuevoLibro)
    mostrarCatalogo(array)
}

function mostrarCatalogo(array) {
    console.log("Los libros disponibles son:")
    for (let elemento of array) {
        console.log(elemento.id, elemento.titulo, elemento.autor, elemento.precio)

    }
}

function mostrarCatalogoForEach(arr) {
    console.log("Nuestro catalogo es con forEach")
    arr.forEach(
        (libro) => {
            console.log(`${libro.id} - ${libro.titulo} del autor/a ${libro.autor} que vale ${libro.precio}`)
        }
    )
}


function buscarPorTitulo(array) {
    let tituloBuscado = prompt("Ingrese el nombre del titulo que desea buscar")
    let tituloEncontrado = array.find(
        (book) => book.titulo.toLowerCase() == tituloBuscado.toLowerCase()
    )
    if (tituloEncontrado == undefined) {
        console.log(`${tituloBuscado} no se encuentra en nuestro stock`)
    } else {
        console.log(tituloEncontrado)
    }
}


function buscarPorAutor(ar) {
    let autorBuscado = prompt("Ingrese el nombre del autor que está buscando")
    let busqueda = ar.filter(
        (libro) => libro.autor.toLowerCase() == autorBuscado.toLowerCase()
    )
    if (busqueda.length == 0) {
        console.log(`Para ${autorBuscado} no hay libros en stock`)
    } else {
        mostrarCatalogo(busqueda)
    }
}


//SORT -- ATENCIÓN METODO QUE DESTRUYE (AFECTA) AL ARRAY ORIGINAL -- en el after lo seguimos
// //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// // https://davidyero.medium.com/ordenar-arreglo-de-objetos-por-propiedad-o-atributo-javascript-56f74fc48906

function ordenarMenorMayor(array) {
    //copia array original, para no modificar estanteria
    const menorMayor = [].concat(array)
    menorMayor.sort((param1, param2) => param1.precio - param2.precio)
    mostrarCatalogo(menorMayor)
}
// ordenarMenorMayor(estanteria)
function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => b.precio - a.precio)
    mostrarCatalogo(mayorMenor)

}
// ordenarMayorMenor(estanteria)
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
        // a es igual b
        return 0
    })
    mostrarCatalogo(ordenadoAlfabeticamente)
}

//ordenar un menu para decidir de qué manera quiere ordenar:
function ordenar(array) {
    let opcion = parseInt(prompt(`
     1 - Ordenar de menor a mayor:
     2 - Ordenar de mayor a menor:
     3 - Ordenar alfabeticamente por título:`))
    switch (opcion) {
        case 1:
            ordenarMenorMayor(array)
            break
        case 2:
            ordenarMayorMenor(array)
            break
        case 3:
            ordenarAlfabeticamenteTitulo(array)
            break
        default:
            console.log(`${opcion} no es válido para ordenar`)
            break
    }
}

//function borrar libro
function borrarLibro(array) {
    console.log(`A partir del cátalogo ingrese el id del libro que desea eliminar:`)
    for (let elem of array) {
        console.log(`${elem.id} - ${elem.titulo} del autor/a ${elem.autor}`)
    }
    let idEliminar = parseInt(prompt("Ingrese el id a eliminar"))
    //map: copiar un array con sólo los indices
    let arrayID = array.map(book => book.id)
    //indexOf para averiguar la posición del elemento que queremos
    let indice = arrayID.indexOf(idEliminar)
    //splice para una vez localizado el elemento, borrarlo

    array.splice(indice, 1)
    mostrarCatalogo(array)
}

function menu() {
    let salirMenu = false
    do {
        salirMenu = preguntarOpcion(salirMenu)
    } while (!salirMenu)
}

function preguntarOpcion(salir) {
    let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
            1 - Agregar libro
            2 - Borrar libro
            3 - Consultar catálogo
            4 - Encontrar por titulo:
            5 - Buscar libros de un mismo autor:
            6 - Ordenar libros:
            0 - Salir del menu`))

    switch (opcionIngresada) {
        case 1:
            agregarLibro(estanteria)
            break
        case 2:
            borrarLibro(estanteria)
            break
        case 3:
            mostrarCatalogo(estanteria)
            break
        case 4:
            buscarPorTitulo(estanteria)
            break
        case 5:
            buscarPorAutor(estanteria)
            break
        case 6:
            ordenar(estanteria)
            break
        case 0:
            console.log("gracias por utilizar nuestra app")
            salir = true
            return salir
            break
        default:
            console.log("Ingrese una opción correcta")
            break
    }
}

 //código
 // menu()