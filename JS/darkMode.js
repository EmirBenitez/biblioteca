//DARK MODE:
let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")
let eliminarMode = document.getElementById("eliminarMode")
//captura la info
let modoOscuro = JSON.parse(localStorage.getItem("modoOscuro"))
console.log(modoOscuro)
//hacer un condicional que se pregunte por el valor de la clave modoOscuro y según el valor, ponga el sitio en oscuro o claro
if(modoOscuro == true){
    document.body.classList.add("darkMode")
}

botonDarkMode.addEventListener("click", ()=>{
    console.log("Btn oscuro funciona")
    //classList add
    document.body.classList.add("darkMode")
    //quiero guardar algo, uso setItem
    localStorage.setItem("modoOscuro", true)
})

botonLightMode.addEventListener("click", ()=>{
    console.log("Btn claro funciona")
    document.body.classList.remove("darkMode")
    localStorage.setItem("modoOscuro", false)
})
eliminarMode.addEventListener("click", ()=>{
    //remueve la clave y su valor, elimina
    localStorage.removeItem("modoOscuro")
})