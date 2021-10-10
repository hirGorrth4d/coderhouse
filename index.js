class producto {
    constructor (id, tipo, precio) {
        this.id = id;
        this.tipo = tipo;
        this.precio = parseInt(precio);
    }
    descuento5unidades() {
        return this.precio = this.precio - 400;
    }

    descuentoMuchasUnidades() {
        return this.precio = (this.precio - 450);
    }

}

// const descuentos = function (cantidadUnidades) {
//     if(cantidadUnidades > 5) {
//         this.precio -= 400;
// } else if (cantidadUnidades >= 50){
//     this.precio -= 450;
// }
// }

const productos = [];
productos.push (new producto("1","COLOR BASE", "500"));
productos.push (new producto ("2", "LIJADO Y SIN PINTAR", "600"));
productos.push (new producto ("3","PINTADO COMPLETO", "1000"));

const sesionGuardada = (clave, valor) => { localStorage.setItem(clave, valor)};

// for (const producto of productos) {
//     sesionGuardada ()
// }
$(document).ready(function(){


    sesionGuardada ("Servicios", JSON.stringify(productos));

    let boton = $("#btnCalcular");
    // boton.on("click", (solicitarDatos);
    boton.on("click", solicitarDatos);

    // let final =$("#final");
    // let contenedor = $("body").append("div");

    let btnLimpiar =$("#btnLimpiar");
    btnLimpiar.on("click", borrarContenedor);

    let btnAbrir =$("#btnModal");
    btnAbrir.on("click", abrirModal);
    let btnCerrar =$("#close_button");
    btnCerrar.on("click", cerrarModal);

    function solicitarDatos (e) {
        e.preventDefault();
        let tipoServicio = $("#t-servicio").val().toUpperCase();
        let cantidadUnidades = $("#cantUni").val();
        let busqueda = productos.filter(x => x.tipo == tipoServicio)[0];
        
        if (cantidadUnidades < 6){
            let resultado = busqueda.precio*cantidadUnidades;
            // resultado.value = busqueda.precio*cantidadUnidades;
            // contenedor.innerHTML=`<h3> El servicio te vale $ ${resultado} </h3>`;
            // final.appendChild(contenedor);
            // $("#form-pedidos").append(`<h3> El servicio te vale $ ${resultado} </h3>`);
            $("#final").append(`<h3 id="resultado" class="fadeIn"> El servicio te vale $ ${resultado} </h3>`);
        } else if ((cantidadUnidades > 5) && (cantidadUnidades< 51)) {
            let resultado =(busqueda.descuento5unidades())*cantidadUnidades;
            // contenedor.innerHTML=`<h3> El servicio te vale $ ${resultado} </h3>`;
            // final.appendChild(contenedor);
            $("#final").append(`<h3 id="resultado" class="fadeIn"> El servicio te vale $ ${resultado} </h3>`);
        } else if (cantidadUnidades> 50) {
            let resultado = (busqueda.descuentoMuchasUnidades())*cantidadUnidades;
            // contenedor.innerHTML=`<h3> El servicio te vale $ ${resultado} </h3>`;
            // final.appendChild(contenedor);
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
        // $("#abrirModal").prepend(`<div id="modal" class="mdl" style="display:none">
        //                             <div id="form-pedidos" >
                                        
        //                                     <div class="modal_header">
        //                                         <button id="close_button" class="close_btn">&times;</button>
        //                                     </div>
        //                                 <h2>Calcula el valor de tu pedido </h2>
                                            
        //                                 <form class="form-pedidos-inputs">
        //                                     <select name="Servicio" id="t-servicio" class="selectivo">
        //                                         <option value="Color base">Color Base</option>
        //                                         <option value="Lijado y sin pintar">Lijado y sin Pintar</option>
        //                                         <option value="Pintado completo">Pintado Completo</option>
        //                                     </select>
        //                                     <label for="cantidad de unidades">Cantidad de unidades</label>
        //                                     <input type="number" id="cantUni" class="numero">
                                            
        //                                     <button id="btnCalcular" class="btn">Calcular</button>
        //                                     <button id="btnLimpiar" class="btn">Limpiar resultado</button>
        //                                     <div id="final"></div>
        //                                 </form>
                                        
        //                             </div>
        //                         </div>`);
        // $("#abrirModal").append(`<div class="active" id="overlay" style="display:none"></div>`);
        $("#modal").toggle("fast");
        $("#overlay").fadeIn("fast");
    }

    function cerrarModal(e){
        e.preventDefault();
        $("#modal").toggle("fast");
        $("#overlay").fadeOut("fast");
    }
});