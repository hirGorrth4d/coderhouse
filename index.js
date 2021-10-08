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
});