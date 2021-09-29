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

for (const producto of productos) {
    console.log (producto.id);
    console.log (producto.tipo);
    console.log (producto.precio);
}

let boton = document.getElementById("btnCalcular");
boton.addEventListener("click", solicitarDatos);

function solicitarDatos (e) {
    e.preventDefault();
    let tipoServicio = document.getElementById("t-servicio").value;
    let cantidadUnidades = document.getElementById("cantUni").value;
    let resultado =document.getElementById("funCalculo");

    let busqueda = productos.filter(x => x.tipo == tipoServicio.toUpperCase())[0]

    if (cantidadUnidades <= 5){
        resultado.value = busqueda.precio*cantidadUnidades;
        alert("El servicio te vale: " + resultado.value);
    } else if ((cantidadUnidades >=5) && (cantidadUnidades<=50)) {
        resultado.value =(busqueda.descuento5unidades())*cantidadUnidades;
        alert("El servicio te vale: " + resultado.value);
    } else if (cantidadUnidades>=50) {
        resultado.value = (busqueda.descuentoMuchasUnidades())*cantidadUnidades;
        alert("El servicio te vale: " + resultado.value);
    } else {
        alert("No ingresaste valor adecuado");
    }
    console.log(busqueda)
}