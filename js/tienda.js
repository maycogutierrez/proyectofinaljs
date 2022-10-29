const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonVaciar = document.getElementById("vaciar-carrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const cantidad = document.getElementById("cantidad");
const precioTotal = document.getElementById("precioTotal");
const cantidadTotal = document.getElementById("cantidadTotal");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
});

stockProductos.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("producto");
  div.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${producto.img}" class="card-img-top imgTienda " alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">$${producto.precio}</p>
      <hr>
      <p class="card-text">Talle: ${producto.talle}</p>
      <hr>
      <p class="card-text">${producto.desc}</p>
      <a id="agregar${producto.id}" class="btn btn-primary">Comprar</a>
    </div>
  </div>
      `;
  contenedorProductos.appendChild(div);

  const boton = document.getElementById(`agregar${producto.id}`);

  boton.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });
});

const agregarAlCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === prodId);
    carrito.push(item);
  }
  actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);

  const indice = carrito.indexOf(item);

  carrito.splice(indice, 1);

  actualizarCarrito();
  console.log(carrito);
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></butt
        `;

    contenedorCarrito.appendChild(div);

    localStorage.setItem("carrito", JSON.stringify(carrito));
  });

  contadorCarrito.innerText = carrito.length;

  console.log(carrito);
  precioTotal.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
};

const btn = document.querySelector("#vaciar-carrito");
btn.addEventListener("click", () => {
  Swal.fire({
    title: "Carrito vacio",
    text: "Para agregar productos al carro, Vuelve a la tienda",
    icon: "success",
    confirmButtonText: "Aceptar",
    backgroundcolor: `rgba(63,255,106,0.69)`,
    border: `3px solid white;`,
  });
});
