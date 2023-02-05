let btnToggle = document.getElementById("toggleMode")

//existe lo captura, sino lo setea
if(localStorage.getItem("modoOscuro")){
    if(JSON.parse(localStorage.getItem("modoOscuro")) == true){
        btnToggle.innerText = `Light`
        btnToggle.className = `btn btn-light`
    }
}else{
    localStorage.setItem("modoOscuro", false)
}

btnToggle.addEventListener("click", ()=>{
    //toggle agrega y quita clase
    document.body.classList.toggle("darkMode")

    if(JSON.parse(localStorage.getItem("modoOscuro")) == false){
        btnToggle.innerText = `Light`
        btnToggle.className = `btn btn-light`
        localStorage.setItem("modoOscuro", true)
    }else{
        btnToggle.innerText = `Dark`
        btnToggle.className = `btn btn-dark`
        localStorage.setItem("modoOscuro", false)
    }
})