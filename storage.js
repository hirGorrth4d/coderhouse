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

sesionGuardada ("Servicios", JSON.stringify(productos));
let btnPrincipal = document.getElementById("btnPrincipal");
btnPrincipal.addEventListener("click", btnModal);
let modal = document.createElement(`div class="modal-container"`);
let modalContainer = document.getElementById("modal");

let boton = document.getElementById("btnCalcular");
boton.addEventListener("click", solicitarDatos);

let final =document.getElementById("final");
let contenedor = document.createElement("div");

let btnLimpiar =document.getElementById("btnLimpiar");
btnLimpiar.addEventListener("click", borrarContenedor);

function solicitarDatos (e) {
    e.preventDefault();
    let tipoServicio = document.getElementById("t-servicio").value;
    let cantidadUnidades = document.getElementById("cantUni").value;
    let busqueda = productos.filter(x => x.tipo == tipoServicio.toUpperCase())[0];
    
    if (cantidadUnidades < 6){
        let resultado = busqueda.precio*cantidadUnidades;
        // resultado.value = busqueda.precio*cantidadUnidades;
        contenedor.innerHTML=`<h3> El servicio te vale $ ${resultado} </h3>`;
        final.appendChild(contenedor);
        
    } else if ((cantidadUnidades > 5) && (cantidadUnidades< 51)) {
        let resultado =(busqueda.descuento5unidades())*cantidadUnidades;
        contenedor.innerHTML=`<h3> El servicio te vale $ ${resultado} </h3>`;
        final.appendChild(contenedor);
    } else if (cantidadUnidades> 50) {
        let resultado = (busqueda.descuentoMuchasUnidades())*cantidadUnidades;
        contenedor.innerHTML=`<h3> El servicio te vale $ ${resultado} </h3>`;
        final.appendChild(contenedor);
    } else {
        resultado = "No ingresaste valor adecuado";
        
    }
    console.log(busqueda);
} 

// function borrarContenedor(e){
//     e.preventDefault();
//     document.getElementById("cantUni").value = "";
//     contenedor.remove();
// }


function btnModal (e){
    e.preventDefault();

    modal.innerHTML=`<div class="modal-container">
                        <form class="form-pedidos-inputs">
                            <!-- <label for="tipo de servicio">Tipo de servicio</label>
                            <input type="text" id="t-servicio"> -->
                            <select name="Servicio" id="t-servicio">
                                <option value="Color base">Color Base</option>
                                <option value="Lijado y sin pintar">Lijado y sin Pintar</option>
                                <option value="Pintado completo">Pintado Completo</option>
                            </select>
                            <label for="cantidad de unidades">Cantidad de unidades</label>
                            <input type="number" id="cantUni">
                            
                            <button id="btnCalcular" class="btn">Calcular</button>
                            <button id="btnLimpiar">Limpiar resultado</button>

                            <!-- <label for="resultado">El servicio te vale: </label>
                            <input type="text" id="funCalculo"> -->
                        </form>
                    </div>`;

    modalContainer.appendChild(modal);
}