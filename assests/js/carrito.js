document.addEventListener('DOMContentLoaded', () => {
    // Variables - base de datos
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Jarro hecho a mano, con estilo del caribe',
            precio: 250000,
            image: 'assests/img/jarro1.png'
        },
        {
            id: 2,
            nombre: 'Mochila hecha a mano por nuestras mejores diseñadores',
            precio: 80000,
            image: 'assests/img/mochila1.png'
        },
        {
            id: 3,
            nombre: 'Cadena elaborada en oro extraído del caribe',
            precio: 100000,
            image: 'assests/img/producto3.jpg'
        },
        {
            id: 4,
            nombre: 'Vajilla 100% en barro',
            precio: 150000,
            image: 'assests/img/vajilla1.png'
        },
    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonvaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;
    const filtroSelect = document.getElementById("filtro");
    
    // Función para renderizar los productos
    function renderizarProductos() {
        DOMitems.innerHTML = "";

        const filtro = filtroSelect.value;
        const productosFiltrados = baseDeDatos.filter(producto =>
            filtro === "todas" || producto.categoria === filtro
        );
        
        productosFiltrados.forEach((info) => {
            // Crear el nodo de la tarjeta
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');

            // Crear el cuerpo de la tarjeta
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');

            // Crear el título del producto
            const miNodoTitle = document.createElement('h6');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;

            // Crear la imagen del producto
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.image);

            // Crear el precio del producto
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${divisa} ${info.precio}`;

            // Crear el botón de agregar al carrito
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = 'Agregar';
            miNodoBoton.setAttribute('marcador', producto.id);
            miNodoBoton.addEventListener('click', anadirProductoAlCarrito);

            // Insertar los elementos en la tarjeta
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            

            // Insertar la tarjeta en el DOM
            DOMitems.appendChild(miNodo);
        });
    }

    let visitas = localStorage.getItem('contadordeVisitas');
    if(!visitas){
        visitas=0;
    }
    visitas++;
    

localStorage.setItem('contadorVisitas', visitas)

document.getElementById('contador').textContent = visitas;

    // Función para agregar productos al carrito
    function anadirProductoAlCarrito(evento) {
        // Añadir el producto al carrito
        carrito.push(evento.target.getAttribute('marcador'));

        // Renderizar el carrito y actualizar el valor
        renderizarCarrito();
        guardarCarritoDeLocalStorage();
        handleCarritoValue(carrito.length);
    }

    // Función para manejar el valor del carrito en el contenedor
    function handleCarritoValue(value) {
        const carritoContainer = document.getElementById("carrito-value");
        carritoContainer.textContent = `${value}`;
    }

    // Función para renderizar el carrito
    function renderizarCarrito() {
        // Vaciamos el carrito en el DOM
        DOMcarrito.textContent = '';

        // Quitamos los duplicados de los productos en el carrito
        const carritoSinDuplicados = [...new Set(carrito)];

        carritoSinDuplicados.forEach((itemId) => {
            // Obtenemos el producto de la base de datos
            const producto = baseDeDatos.find((item) => item.id === parseInt(itemId));

            // Contamos las unidades del producto
            const numeroUnidadesItem = carrito.reduce((total, id) => (id === itemId ? total + 1 : total), 0);

            // Crear el nodo del producto en el carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${producto.nombre} - ${divisa} ${producto.precio}`;

            // Crear el botón para eliminar el producto del carrito
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = itemId;
            miBoton.addEventListener('click', borrarItemCarrito);

            // Insertar el botón en el nodo
            miNodo.appendChild(miBoton);

            // Insertar el nodo en el carrito
            DOMcarrito.appendChild(miNodo);
        });

            DOMtotal.textContent = calcularTotal();
        }

    

    

    // Función para borrar un producto del carrito
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;

        // Filtrar el carrito eliminando el producto
        carrito = carrito.filter((carritoId) => carritoId !== id);

        // Renderizar el carrito y actualizar el valor
        renderizarCarrito();
        handleCarritoValue(carrito.length);
    }

   

    function calcularTotal(){
        return carrito.reduce((total, item) => {
            const miItem= baseDeDatos.filter((itemBaseDatos)=>{
                return itemBaseDatos.id ===parseInt(item);
            });
            return total + miItem[0].precio;
         }, 0).toFixed(2);
    } 
    

    function vaciarCarrito(){
        carrito= [];
        renderizarCarrito();
        localStorage.clear();
    }

    function guardarCarritoDeLocalStorage(){
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage(){
        if (miLocalStorage.getItem('carrito') !==null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
            handleCarritoValue(carrito.length);
        }
    }

    DOMbotonvaciar.addEventListener('click', vaciarCarrito);
    filtroSelect.addEventListener('change', renderizarProductos);

    // Inicializar la aplicación
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});