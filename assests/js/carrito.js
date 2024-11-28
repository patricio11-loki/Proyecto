document.addEventListener('DOMContentLoaded', () =>{
    //Variables -base de datos
    const baseDeDatos=[
        {
            id:1,
            nombre: 'Jarro hecho a mano, con estilo del caribe',
            precio: 250000,
            image:'assests/img/jarro1.png'
        },
        {
            id:2,
            nombre: 'Mochila hecha a mano por nuestras mejores diseñadores',
            precio: 80000,
            image:'assests/img/mochila.png'
        },
        {
            id:3,
            nombre: 'Cadena elaborada en oro extraido del caribe',
            precio: 100000,
            image:'assests/img/producto2.jpg'
        },
    ];
    let carrito = []
    const divisa= '$';
    const DOMitems = Document.querySelector ('items');
    const DOMcarrito = Document.querySelector ('carrito');
    const DOMtotal = Document.querySelector ('total');
    const DOMbotonvaciar = Document.querySelector ('boton-vaciar');

    //seccion de funciones
    /* Dibujamos todos los productos a partir de la base de datos*/

    function renderizarProductos(){
        baseDeDatos.forEach((info) =>{
            //estrucutra
            const miNodo = document.createElement('div');
            miNodo.classList.add('card','col-sm-4');
            //body
            const miNodoCarBody = document.createElement('div');
            miNodoCarBody.classList.add('car-body');
            //titulo
            const miNodoTitle = document.createElement('h6');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent =info.nombre;
            //imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.image);
            //precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.setAttribute(`${divisa}${indexedDB.precio}`);
            //boton
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent='agregar';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anadirProductoAlCarrito);

            //Insertar
            miNodoCarBody.appendChild(miNodoImagen);
            miNodoCarBody.appendChild(miNodoTitle);
            miNodoCarBody.appendChild(miNodoPrecio);
            miNodoCarBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodo);
        });
    }
    //dibujar todos los prodcutos guardados en el carrito de la compra
    function renderizarCarrito(){
        //vaciamos todo el html
        DOMcarrito.textContent='';
        //Quitiamos los duplicados
        const carritoSinDuplicados= [...new Set(carrito)];
        //Generar los nodos a partir de carrito
        const miItem= baseDeDatos.filter((itemBaseDatos) =>{
            return itemBaseDatos.id=parseInt(item);
        });
        //cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) =>{
            return itemBaseDatos === item ? total += 1 : total;
        }, 0);
        //creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item','text-rigth', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        //boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        //mezclamos los nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    }

    /* Evento para añadir un prodcuto al carrito de compra*/ 
    function anadirProductoAlCarrito(evento){
        //añadimo el nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        //
        renderizarCarrito();

        handleCarritoValue(carrito.length)
    }

    function handleCarritoValue (value){
        const carritoContainer= document.getElementById("carrito-value");
        carritoContainer.textContent = `${value}`
    }

    //Evento para borrar un elemento en el carrito

    function borrarItemCarrito(evento){
        const id= evento.target.dataset.item;
        carrito=carrito.filter((carritoId) =>{
            return carritoId !==id;
        });
        renderizarCarrito();
            guardarCarritoEnLocalStorage();
            handleCarritoValue(carrito.length);
    }
        renderizarProductos();
        renderizarCarrito();
});