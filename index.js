$(document).ready(function(){
    let productos = [];
    const URLJSON = "data/productos.json";

    function recuperarProductos(){
        let stock = JSON.parse(localStorage.getItem("stock"));
        if (stock) {
            stock.forEach(el => productos.push(el));
        }
    }
    
    $.getJSON("data/productos.json", function(data) {
        console.log(data);
        localStorage.setItem("stock", JSON.stringify(data));
        recuperarProductos();
    })
    
    
    let boton = $("#btnCalcular");
    boton.on("click", solicitarDatos);
    

    let btnLimpiar =$("#btnLimpiar");
    btnLimpiar.on("click", borrarContenedor);
    

    let btnAbrir =$("#btnModal");
    btnAbrir.on("click", abrirModal);
    let btnCerrar =$("#close_button");
    btnCerrar.on("click", cerrarModal);
    let btnServicios = $("#btnServicios");
    btnServicios.on("click", abrirServicios);
    


    function solicitarDatos (e) {
        e.preventDefault();
        let tipoServicio = $("#t-servicio").val();
        let cantidadUnidades = $("#cantUni").val();
        let busqueda = productos.filter(x => x.tipo == tipoServicio)[0];
        if (cantidadUnidades < 6){
            let resultado = busqueda.precio*cantidadUnidades;
            $("#final").append(`<h3 id="resultado" class="fadeIn"> El servicio te vale $ ${resultado} </h3>`);
        } else if ((cantidadUnidades > 5) && (cantidadUnidades< 51)) {
            let resultado = ((busqueda.precio-400)* cantidadUnidades);
            $("#final").append(`<h3 id="resultado" class="fadeIn"> El servicio te vale $ ${resultado} </h3>`);
        } else if (cantidadUnidades> 50) {  
            let resultado = ((busqueda.precio-450)* cantidadUnidades);
            $("#final").append(`<h3 id="resultado" class="fadeIn"> El servicio te vale $ ${resultado} </h3>`);
        } else {
            resultado = "No ingresaste valor adecuado";
        }
        console.log(busqueda);
        
    }


    function borrarContenedor(e){
        e.preventDefault();
        $("#cantUni").val("");
        $("#resultado").remove();
    }

    function abrirModal(e){
        e.preventDefault();
        $.getJSON(URLJSON, function (respuesta, estado){
            if (estado === "success"){
                    let misDatos = respuesta;
                    for (const dato of misDatos){
                        console.log(dato);
                        $("#t-servicio").append(`<option value="${dato.tipo}">${dato.tipo}</option>`)
                    }
            }
        })
        $("#modal").toggle("fast");
        $("#overlay").fadeIn("fast");
    }

    function cerrarModal(e){
        e.preventDefault();
        borrarContenedor(e);
        $("#modal").toggle("fast");
        $("#overlay").fadeOut("fast");
        $("#t-servicio").empty();
    }

    function abrirServicios (e){
        e.preventDefault();
        $("#abrirServicios").toggle();
    }

});


