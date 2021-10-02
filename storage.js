class producto {
    constructor (id, tipo, precio) {
        this.id = id;
        this.tipo = tipo;
        this.precio = parseInt(precio);
    }
    descuento5unidades() {
        return this.precio = (this.precio - 400);
    }

    descuentoMuchasUnidades() {
        return this.precio = (this.precio - 450);
    }

}

const productos = [];
productos.push (new producto("1","COLOR BASE", "500"));
productos.push (new producto ("2", "LIJADO Y SIN PINTAR", "600"));
productos.push (new producto ("3","PINTADO COMPLETO", "1000"));

const sesionGuardada = (clave, valor) => { localStorage.setItem(clave, valor)};

// for (const producto of productos) {
//     sesionGuardada ()
// }

sesionGuardada ("Servicios", JSON.stringify(productos));

let boton = document.getElementById("btnCalcular");
boton.addEventListener("click", solicitarDatos);
let btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.parentNode.removeChild(contenedor);

function solicitarDatos (e) {
    e.preventDefault();
    let tipoServicio = document.getElementById("t-servicio").value;
    let cantidadUnidades = document.getElementById("cantUni").value;

    let contenedor = document.createElement("div");

    let busqueda = productos.filter(x => x.tipo == tipoServicio.toUpperCase())[0]
    
    if (cantidadUnidades <= 5){
        let resultado = busqueda.precio*cantidadUnidades;
        // resultado.value = busqueda.precio*cantidadUnidades;
        contenedor.innerHTML=`<h3> El servicio te vale: ${resultado} </h3>`;
        document.body.appendChild(contenedor);
    } else if ((cantidadUnidades >=5) && (cantidadUnidades<=50)) {
        let resultado =(busqueda.descuento5unidades())*cantidadUnidades;
        contenedor.innerHTML=`<h3> El servicio te vale: ${resultado} </h3>`;
        document.body.appendChild(contenedor);
    } else if (cantidadUnidades>=50) {
        let resultado = (busqueda.descuentoMuchasUnidades())*cantidadUnidades;
        contenedor.innerHTML=`<h3> El servicio te vale: ${resultado} </h3>`;
        document.body.appendChild(contenedor);
    } else {
        
        
    }
    console.log(busqueda)

}