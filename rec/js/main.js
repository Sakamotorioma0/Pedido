// ABRIR Y CERRAR CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector("#cart");
const closeCart = document.querySelector("#cart-close");

//selecciar lugar 


//fecha 
const fechaActual = new Date();
const fechaParaMostrar = fechaActual.toLocaleDateString('es-mx'); // Formato para España
document.getElementById('fecha-actual').innerText = "La Fecha de hoy es:  " + fechaParaMostrar;

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// COMENZAR CUANDO EL DOCUMENTO ESTE LISTO

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start()
}

// COMENZAR
function start() {
    addEvents();
}
// COMENZAR

function start() {
    addEvents();
}

//ACTUALIZAR Y VOLVER A PRESENTAR
function update() {
    addEvents();
    updatecant()
}

//EVENTOS
function addEvents() {

    //QUITAR ARTICULOS DEL CARRITO
    let cartRemove_btns = document.querySelectorAll(".cart-remove");

    /*console.log(cartRemove_btns);*/



    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });


    //CAMBIAR CANTIDAD DE ARTICULOS DEL CARRITO

    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");

    cartQuantity_inputs.forEach((input) => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    //AÑADIR ARTICULOS AL CARRITO

    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });
}

//COMPRAR ORDEN
const buy_btn = document.querySelector(".btn-buy");
buy_btn.addEventListener("click", handle_buyOrden);

//FUNCIONES DE MANEJOS DE EVENTOS

let itemsAdded = [];
let contador = {};
let datos = [];
let art = [];

function handle_addCartItem() {
    let product = this.parentElement;
    /*console.log(product);*/
    let title = product.querySelector(".card-subtitle").innerHTML;

    console.log(title);

    let newToAdd = {
        title

    };
    //EL ELEMENTO DE MANEJO YA EXISTENTE
    if (itemsAdded.find((el) => el.title === newToAdd.title)) {
        alert("Este Articulo Ya Existe");
        return;

    } else {
        itemsAdded.push(newToAdd);
    }

    //AÑADIR PRODUCTOOS AL CARRITO

    let carBoxElement = cartBoxComponent(title);
    let newNode = document.createElement("div");
    newNode.innerHTML = carBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    // Activar el icono del carrito
    cart.classList.add("active");

    update()
};

function handle_removeCartItem() {
    this.parentElement.remove();

    itemsAdded = itemsAdded.filter(
        (el) => el.title !== this.parentElement.querySelector(".cart-product-title").innerHTML
    );
    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); //PARA MANTENER EL NUMERO ENTERO

    update();
}

function handle_buyOrden() {

    let lugar = document.getElementById("inLugar").value;
    let us = document.getElementById("inUs").value;

    if (itemsAdded.length <= 0) {
        alert("¡Aún no hay ningun pedido para realizar! \nPorfavor haga un pedido primero");

        return;
    }
    if (us == "") {
        alert("¡no oldives informar quien lo esta solicitando!");
        return;

    }
    if (lugar == "") {
        alert("¡No olvides Agregar de \n donde se realiza el Pedido!");

        return;

    }


    const i = 0;

    const cartContent = cart.querySelector(".cart-content");



    cartContent.innerHTML = "";
    alert("Su pedido se realizó exitosamente")
    for (let i = 0; i < itemsAdded.length; i++) {

        console.log(itemsAdded[i], contador[i]);
        art[i] = itemsAdded[i].title;

    }
    console.log("Articulo: " + itemsAdded[i].title + " cantidad: " + contador[i]);
    crearEx();

    itemsAdded = [];

    update();

}

function crearEx() {
    let lugar = document.getElementById("inLugar").value;
    let us = document.getElementById("inUs").value;
    // codigo de excel
    const columnas = ["N.Art", "Articulos", "Cant", fechaActual, us, lugar];

    // generamos arrya con el orden aoa_to_Sheet para definir el orden
    datos = [columnas];
    for (let i = 0; i < art.length; i++) {
        datos.push([i + 1, art[i], contador[i]]);

    }

    console.log(datos);
    const hoja = XLSX.utils.aoa_to_sheet(datos);

    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(libro, hoja, "datos");

    XLSX.writeFile(libro, "pedido.xlsx")
}

//FUNCIONES DE ACTUALIZAR Y RENDERIZAR


function updatecant() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector(".total-price");
    let total = 0;



    cartBoxes.forEach((cartBox, i) => {

        let quantity = cartBox.querySelector(".cart-quantity").value;
        contador[i] = quantity;
        /*console.log(quantity + "indice" + i + cartBox.textContent + "contador " + contador[i]);*/

    });

    total = total.toFixed(2);
    //MANTENER 2 DIGITOS DESPUES DEL PUNTO DECIMAL



}


// =============== COMPONENTES HTML ========================

function cartBoxComponent(title) {
    return `
    <div class="cart-box">
        <div class="detail-box">
        <div class="cart-product-title card-title">${title}</div>
        <input type="number" id="cant" value="1" class="cart-quantity">
    </div>

    <!-- ELIMINAR CART -->
    <i class="bx bxs-trash-alt cart-remove"></i>
    `;
}

// Obtener referencias
const inputBuscar = document.getElementById('input-buscar');
const listaProductos = document.querySelectorAll('#lista-productos .producto');

// Función de filtrado
inputBuscar.addEventListener('input', function() {
    const filtro = inputBuscar.value.toLowerCase(); // convertir a minúsculas
    listaProductos.forEach(producto => {
        const nombre = producto.dataset.nombre.toLowerCase();
        const categoria = producto.dataset.categoria.toLowerCase();
        // Mostrar solo si coincide con el filtro en nombre o categoría
        if (nombre.includes(filtro) || categoria.includes(filtro)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
});