// class producto {
//     constructor (id, tipo, precio) {
//         this.id = id;
//         this.tipo = tipo;
//         this.precio = parseInt(precio);
//     }
//     descuento5unidades() {
//         return this.precio = this.precio - 400;
//     }

//     descuentoMuchasUnidades() {
//         return this.precio = (this.precio - 450);
//     }

// }

// const descuentos = function (cantidadUnidades) {
//     if(cantidadUnidades > 5) {
//         this.precio -= 400;
// } else if (cantidadUnidades >= 50){
//     this.precio -= 450;
// }
// }


let productos = [];

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


// productos.push (new producto("1","COLOR BASE", "500"));
// productos.push (new producto ("2", "LIJADO Y SIN PINTAR", "600"));
// productos.push (new producto ("3","PINTADO COMPLETO", "1000"));

// const sesionGuardada = (clave, valor) => { localStorage.setItem(clave, valor)};

// for (const producto of productos) {
//     sesionGuardada ()
// }
$(document).ready(function(){


    // sesionGuardada ("Servicios", JSON.stringify(productos));

    let boton = $("#btnCalcular");
    boton.on("click", solicitarDatos);


    let btnLimpiar =$("#btnLimpiar");
    btnLimpiar.on("click", borrarContenedor);

    let btnAbrir =$("#btnModal");
    btnAbrir.on("click", abrirModalJSON);
    let btnCerrar =$("#close_button");
    btnCerrar.on("click", cerrarModal);

    function solicitarDatos (e) {
        e.preventDefault();
        $.getJSON(URLJSON, function(respuesta, estado){
            if (estado === "success"){
                let misDatos =respuesta;
                for (const dato of misDatos){
                    $("body").prepend(`<div>
                                            <h3> ${dato.tipo}</h3>
                                            <h3> ${dato.precio} </h3>
                                        </div>`);
                }
            }
        });
        let tipoServicio = $("#t-servicio").val().toUpperCase();
        let cantidadUnidades = $("#cantUni").val();
        let busqueda = productos.filter(x => x.tipo == tipoServicio)[0];
        
        if (cantidadUnidades < 6){
            let resultado = busqueda.precio*cantidadUnidades;
            $("#final").append(`<h3 id="resultado" class="fadeIn"> El servicio te vale $ ${resultado} </h3>`);
        } else if ((cantidadUnidades > 5) && (cantidadUnidades< 51)) {
            let resultado =(busqueda.descuento5unidades())*cantidadUnidades;
            $("#final").append(`<h3 id="resultado" class="fadeIn"> El servicio te vale $ ${resultado} </h3>`);
        } else if (cantidadUnidades> 50) {
            let resultado = (busqueda.descuentoMuchasUnidades())*cantidadUnidades;
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



    function cerrarModal(e){
        e.preventDefault();
        $("#modal").toggle("fast");
        $("#overlay").fadeOut("fast");
    }
    
});

const URLJSON = "data/productos.json";
$("body").prepend('<button id="btn1">JSON</button>');

$("#btn1").click(() => {
    $.getJSON(URLJSON, function(respuesta, estado){
        if (estado === "success"){
            let misDatos =respuesta;
            for (const dato of misDatos){
                $("body").prepend(`<div>
                                        <h3> ${dato.tipo}</h3>
                                        <h3> ${dato.precio} </h3>
                                    </div>`);
            }
        }
    });
});

function abrirModalJSON (){
    $("#btnModal").click((e)=>{
        e.preventDefault();
    $("body").append(`<div id="abrirModal">
                                       <div id="modal" class="mdl">
                                       <div id="form-pedidos">
                                           
                                               <div class="modal_header">
                                                   <button id="close_button" class="close_btn">&times;</button>
                                               </div>
                                           <h2>Calcula el valor de tu pedido </h2>
                                                   
                                           <form class="form-pedidos-inputs">
                                           <select name="Servicio" id="t-servicio" class="selectivo">
                   
                                           </select>
                                               <label for="cantidad de unidades">Cantidad de unidades</label>
                                               <input type="number" id="cantUni" class="numero">
                                                   
                                               <button id="btnCalcular" class="btn">Calcular</button>
                                               <button id="btnLimpiar" class="btn">Limpiar resultado</button>
                                               <div id="final"></div>
                                           </form>
                                               
                                       </div>
                                   </div>
                               </div>`);
    
           $("body").append(`<div class="active" id="overlay"></div>`);
    
        $.getJSON(URLJSON, function (respuesta, estado){
            if (estado === "success"){
                    let misDatos = respuesta;
                    console.log(misDatos);
                    for (const dato of misDatos){
                        console.log(dato);
                        $("#t-servicio").append(`<option value="${dato.tipo}">${dato.tipo}</option>`)
                    }
            }
        })
        })
        $("#modal").toggle("fast");
        $("#overlay").fadeIn("fast");
}