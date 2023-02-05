//class constructora
class Libro {
    constructor(id, autor, titulo, precio, imagen){
        //propiedades o atributos de nuestra clase
        this.id = id,
        this.autor = autor,
        this.titulo = titulo,
        this.precio = precio, 
        this.imagen = imagen,
        this.cantidad = 1
        

    }
    //métodos
    mostrarInfoLibro(){
        console.log(`El titulo es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio}`)
    }
    sumarUnidad(){
        this.cantidad += 1
    }
    restarUnidad(){
        this.cantidad += 1
    }
}

//crear un array de objetos: 
let estanteria = []
//dos posibilidades que en storage exista algo o que no exista
//condicional que evalue si hay algo
if(localStorage.getItem("estanteria")){
    //si existe algo en el storage entra al if
    estanteria = JSON.parse(localStorage.getItem("estanteria"))
}else{
    //si no existe, entra al else
    console.log("Seteamos por primera vez, entra sólo en la primera vez")
    estanteria.push(libro1, libro2, libro3, libro4, libro5, libro6)
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}