//Mi MockApi
const url_api = "https://66c6c3198b2c10445bc79963.mockapi.io/managetask/tareas/tareas"
//#############################################################################################################

//Impresion de las cards con el MockApi
document.addEventListener("DOMContentLoaded",()=>{  //Al iniciar la pagina corre el evento
    fetch(url_api) //Se consume mi MockApi
    .then(response => response.json())
    .then(data => {
        to_html = ""
        data.forEach(proceso =>{ //A cada dato de mi MockApi se le ejecuta esta accion
            estado = ``
            plataforma = ``    //Defino variables que se usarán
            valoracion = ``

            if(proceso.plataforma === "netflix"){
                plataforma = `<img alt="netflix" data-plataforma="netflix" src="img/netflix.png">`
            }else if(proceso.plataforma === "amazon"){
                plataforma = `<img alt="amazon" data-plataforma="amazon" src="img/amazon.png">`
            }else if(proceso.plataforma === "hbo"){
                plataforma = `<img alt="hbo" data-plataforma="hbo" src="img/hbo.png">`
            }else if(proceso.plataforma === "wattpad"){
                plataforma = `<img alt="wattpad" data-plataforma="wattpad" src="img/wattpad.png">`
            }else if(proceso.plataforma === "scribd"){
                plataforma = `<img alt="scribd" data-plataforma="scribd" src="img/scribd.png">`
            }else if(proceso.plataforma === "fisico"){
                plataforma = `<img alt="fisico" data-plataforma="fisico" src="img/fisico.png">`
            } //Lo que se hace, es remplazar de texto a imagen
            
            if(proceso.valoracion === "1"){
                valoracion = `<img src="img/estrella1.png">`
            }else if(proceso.valoracion === "2"){
                valoracion = `<img src="img/estrella2.png">`
            }else if(proceso.valoracion === "3"){
                valoracion = `<img src="img/estrella3.png">`
            }else if(proceso.valoracion === "4"){
                valoracion = `<img src="img/estrella4.png">`
            }else if(proceso.valoracion === "5"){
                valoracion = `<img src="img/estrella5.png">`
            }else if(proceso.valoracion === "0"){
                valoracion = "0"
            }//Lo mismo que plataforma
            
            if(proceso.estado === "pendiente"){
                estado = `<div class="pendiente"></div>`
            }else if(proceso.estado === "enproceso"){
                estado = `<div class="proceso"></div>`
            }else if(proceso.estado === "terminado"){
                estado = `<div class="terminado"></div>`
            }//Cambia de <div> dependiendo el estado

            to_html += `
                    <section class="cadatarea" data-plataforma="${proceso.plataforma}">
                    <div class="nombrestado">
                        <h1>${proceso.nombre}</h1>
                        <section class="estado">
                            ${estado}
                        </section>
                    </div>
                    <section class="sinfin">
                        <section class="s-nombre">
                            <div>
                                <section>
                                    <h2>Genero: </h2><p class="genero" id="cadagenero">${proceso.genero}</p>
                                </section>
                                <section>
                                    <h2>Formato: </h2><p class="formato-texto">${proceso.formato}</p>
                                </section>
                            </div>
                        </section>
                        <section class="s-datos">
                            <section>
                                <h2>Plataforma </h2><p class="plataforma-texto plataforma">${plataforma}</p>
                            </section>
                            <section>
                                <h2>valoración: </h2><div class="num_val">${valoracion}</div>
                            </section>
                        </section>
                    </section>
                    <h2>Reseña:</h2><p class="resena">${proceso.resena}</p>
                    <hr>
                    <div class="fechaabajo">
                        <section class="fecha">
                            <h2>Fecha fin: </h2><p>${proceso.fechafin}</p>
                        </section>
                    </div>
                    <div class="btns">
                        <button><img id="btn-editar" src="img/editar.png"></button>
                        <button data-id="${proceso.id}" class="btn-eliminar"><img id="btn-eliminar" src="img/eliminar.png"></button>
                    </div>
                    </section>
                `
        });
        document.getElementById("container").innerHTML = to_html //Agrega a mi documento, al contenedor cada card creada con el ForEach
})
        })
//#############################################################################################################

//Creación de recursos
function crear_recurso(data) {
    fetch(url_api, {
        method: 'POST', //Metodo POST para subir datos
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log('Recurso creado:', result);
            location.reload() //Recarga la pagina despues de crearlo
        })
        .catch(error => {
            console.error('Error:', error);
        });
        }
document.getElementById('formulariocrear').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        nombre: document.getElementById('nombre').value,
        estado: "pendiente",
        formato: document.getElementById('formato').value,
        genero: document.getElementById('genero').value,
        plataforma: document.getElementById('plataforma').value,
        fechafin: document.getElementById('fechafin').value,
        valoracion: "1",
        resena: document.getElementById('resena').value,
    };
    crear_recurso(formData);//Usa la funcion con metodo POST para subir estos datos 
    
});
document.getElementById('formato').addEventListener('change', function() {
    const formatoSeleccionado = this.value; // El This.value me selecciona el id="Formato"
    const opcionesLibro = document.querySelectorAll('.libro-opc');
    const otrasOpciones = document.querySelectorAll('#plataforma option:not(.libro-opc)');

    if (formatoSeleccionado === 'libro') {
        //Si el formato es libro, me muestra las otras opciones (Wattpad y las otros)
        opcionesLibro.forEach(opcion => opcion.style.display = 'block');
        otrasOpciones.forEach(opcion => opcion.style.display = 'none');
    } else {
        //Si no, me las oculta y solo me muestra las de Netflix...Etc
        opcionesLibro.forEach(opcion => opcion.style.display = 'none');
        otrasOpciones.forEach(opcion => opcion.style.display = 'block');
    }
});
//#############################################################################################################

//Boton de agregar y cerrar
document.getElementById("crearrecurso").addEventListener("click",()=>{
    const caja = document.getElementById("sectionformulario")
    const boton = document.getElementById("crearrecurso")
    if (caja.classList.contains('cajaoculta')) {
        //Si la caja esta oculta y se da click, le pone la clase visible y hace la animacion
        caja.classList.remove('cajaoculta');
        requestAnimationFrame(() => {
            caja.classList.add('cajavisible');
            boton.textContent = "x"
        });
    } else {
        //Si la caja esta visible y se da click, le pone la clase oculta
        caja.classList.remove('cajavisible');
        caja.addEventListener('transitionend', function() {
            if (!caja.classList.contains('cajavisible')) {
                caja.classList.add('cajaoculta');
                boton.textContent = "+"
            }
        },);
    }
})
//#############################################################################################################

// BOTON DE ELIMINAR CARD
function eliminar_recurso(id) {
    const deleteUrl = `${url_api}/${id}`;
    fetch(deleteUrl, {
        method: 'DELETE'
    })
    .then(response => {
        return response.json();
    })
    .then(result => {
        console.log('Recurso eliminado:', result);
        document.querySelector(`.btn-eliminar[data-id="${id}"]`).closest('.cadatarea').remove();
        //Se elimina la tarjeta a la que se le dio click, ya que busca el más cercano con el Id, y este es unico
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
document.getElementById('container').addEventListener('click', function(event) {
    if (event.target.closest('.btn-eliminar')) { //Esto busca el elemento más cercano a la clase "btn-eliminar"
        const id = event.target.closest('.btn-eliminar').getAttribute('data-id'); //Se toma el Id de cada recurso
        eliminar_recurso(id); //Se hace la eliminación por ID con el metodo DELETE desde mi MockApi
    }
});

//#############################################################################################################

// ABRIR SECCION DE EDICION
document.getElementById('container').addEventListener('click', function(event) {
    if (event.target.closest('#btn-editar')) {
        const card = event.target.closest('.cadatarea');
        const id = card.querySelector('.btn-eliminar').getAttribute('data-id');

        //Esto devuelve los datos de cada card a un formulario para editarlos
        document.getElementById('editar-nombre').value = card.querySelector('.nombrestado h1').textContent;
        document.getElementById('editar-formato').value = card.querySelector('.s-nombre section:nth-child(2) p').textContent;
        document.getElementById('editar-genero').value = document.getElementById("cadagenero").textContent;

        //Esto recoge los datos de Plataforma, se busca por el src ya que se necesitaba ser más especificos
        const plataformaImgSrc = card.querySelector('.s-datos section:first-child img').src;
        if (plataformaImgSrc.includes('netflix')) {
            document.getElementById('editar-plataforma').value = 'netflix';
        } else if (plataformaImgSrc.includes('hbo')) {
            document.getElementById('editar-plataforma').value = 'hbo';
        } else if (plataformaImgSrc.includes('amazon')) {
            document.getElementById('editar-plataforma').value = 'amazon';
        } else if (plataformaImgSrc.includes('wattpad')) {
            document.getElementById('editar-plataforma').value = 'wattpad';
        } else if (plataformaImgSrc.includes('scribd')) {
            document.getElementById('editar-plataforma').value = 'scribd';
        } else if (plataformaImgSrc.includes('fisico')) {
            document.getElementById('editar-plataforma').value = 'fisico';
        } 

        //Lo mismo del primero, devuelve datos de la card al formulario de editar
        document.getElementById('editar-fechafin').value = card.querySelector('.fecha p').textContent;
        document.getElementById('editar-resena').value = card.querySelector('.resena').textContent;

        //Esto recoge los datos de valoracion tambien con src, siendo mas especifico
        const valoracionImgs = card.querySelector('.s-datos section:nth-child(2) img');
        let valoracion = 0;
        if (valoracionImgs) {
            // Determinar la valoración según el src de la imagen
            if (valoracionImgs.src.includes('estrella5')) {
                valoracion = 5;
            } else if (valoracionImgs.src.includes('estrella4')) {
                valoracion = 4;
            } else if (valoracionImgs.src.includes('estrella3')) {
                valoracion = 3;
            } else if (valoracionImgs.src.includes('estrella2')) {
                valoracion = 2;
            } else if (valoracionImgs.src.includes('estrella1')) {
                valoracion = 1;
            }
        }
        if (valoracion > 0) {
            document.getElementById(`editar-estrella${valoracion}`).checked = true;
        }

        //Esto devuelve el estado, revisa si es pendiente, en poceso o terminado
        document.getElementById('editar-estado').value = card.querySelector('.estado div').classList.contains('pendiente') ? 'pendiente' :
        card.querySelector('.estado div').classList.contains('proceso') ? 'enproceso' :
        'terminado';

        //Esto hace que el displey pase de none a block y así se muestre el formulario de edicion
        document.getElementById('modal-editar').style.display = 'block';

        // Esto guarda el ID
        document.getElementById('form-editar').dataset.id = id;
    }
});

//Esto hace que cuando le de click a "Cerrar", el formulario denuevo sea display "none"
document.getElementById('cerrar-modal').addEventListener('click', function() {
    document.getElementById('modal-editar').style.display = 'none';
});

//Esto es para cuando oprima el boton de actualizar, se manden los datos con el metodo PUT con el MockApi
document.getElementById('form-editar').addEventListener('submit', function(event) {
    event.preventDefault(); //Previene que se recargue la pag
    const id = event.target.dataset.id; //Recoleta el Id
    const updatedData = { //Forma en un Json, todos los datos que se van a mandar
        nombre: document.getElementById('editar-nombre').value,
        formato: document.getElementById('editar-formato').value,
        genero: document.getElementById('editar-genero').value,
        plataforma: document.getElementById('editar-plataforma').value,
        fechafin: document.getElementById('editar-fechafin').value,
        valoracion: document.querySelector('input[name="editar-valoracion"]:checked').value,
        resena: document.getElementById('editar-resena').value,
        estado: document.getElementById('editar-estado').value
    };

    fetch(`${url_api}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Recurso actualizado:', data);
        //Despues de actualizar cada card, recarga la pagina
        location.reload();
    })
    .catch(error => {
        console.error('Error al actualizar el recurso:', error);
    });

    //Apenas se actualice una card, la seccion de edicion, se oculta
    document.getElementById('modal-editar').style.display = 'none';
});

//Esto es la misma funcion que al momento de crear, si es libro se agregen las otras opciones
document.getElementById('editar-formato').addEventListener('change', function() {
    const formatoSeleccionado = this.value;
    const opcionesLibro = document.querySelectorAll('.libro-opc');
    const otrasOpciones = document.querySelectorAll('#plataforma option:not(.libro-opc)');

    if (formatoSeleccionado === 'libro') {
        opcionesLibro.forEach(opcion => opcion.style.display = 'block');
        otrasOpciones.forEach(opcion => opcion.style.display = 'none');
    } else {
        opcionesLibro.forEach(opcion => opcion.style.display = 'none');
        otrasOpciones.forEach(opcion => opcion.style.display = 'block');
    }
});
//#############################################################################################################

//##################################FILTROS####################################################################
//Filtro por Estado
document.getElementById('filtroporestado').addEventListener('change', function() {
    const selectedValue = this.value;
    const allCards = document.querySelectorAll('.cadatarea');
    allCards.forEach(card => { //Busca en cada card el estado
        const estado = card.querySelector('.estado > div').classList.contains(selectedValue);
        if (selectedValue === "todos" || estado) {
            card.style.display = 'block'; //Muestra las tarjetas
        } else {
            card.style.display = 'none'; //Esconde las tarjeta
        }
    });
});

//Filtro por genero
document.getElementById('filtroporgenero').addEventListener('change', function() {
    const selectedGenre = this.value.toLowerCase();
    const cards = document.querySelectorAll('.cadatarea');
    cards.forEach(card => { //Busca en cada card por genero
        const cardGenre = card.querySelector('.s-nombre p').textContent.toLowerCase();

        if (selectedGenre === 'todos' || cardGenre.includes(selectedGenre)) {
            card.style.display = 'block'; //Muestra las cards si son el genero que se eligio
        } else {
            card.style.display = 'none'; //Esconde las cards si no son
        }
    });
});

//Filtro por formato
document.getElementById('filtroporformato').addEventListener('change',()=>{
    const formatoSeleccionado = document.getElementById('filtroporformato').value.toLowerCase();
    const cards = document.querySelectorAll('.cadatarea');
    cards.forEach(card => {
        const formatoCard = card.querySelector('.formato-texto').textContent.toLowerCase();
        if (formatoSeleccionado === 'todos' || formatoCard === formatoSeleccionado) {
            card.style.display = 'block'; //Lo mismo que las anteriores 
        } else {
            card.style.display = 'none'; //Lo mismo
        }
    });
});

// Filtro por plataforma
document.getElementById('filtroporplataforma').addEventListener('change', function() {
    const plataformaSeleccionada = this.value.toLowerCase();
    const cards = document.querySelectorAll('.cadatarea');
    cards.forEach(card => {
        const plataformaCard = card.getAttribute('data-plataforma').toLowerCase().trim();
        if (plataformaSeleccionada === 'todas' || plataformaCard === plataformaSeleccionada) {
            card.style.display = 'block'; //Lo mismo
        } else {
            card.style.display = 'none'; //Lo mismo
        }
    });
});

//Filtro por valoración
document.getElementById('filtroporval').addEventListener('change', function() {
    const valorSeleccionado = this.value;
    const cards = document.querySelectorAll('.cadatarea');
    cards.forEach(card => {
        const valoracionCard = card.querySelector('.num_val img') ? card.querySelector('.num_val img').src : '';
        //Esto recoge la cantidad, con el src de la imagen de valoracion, ya que todas se llaman: "estrella3.png"
        const numEstrellas = valoracionCard.match(/estrella(\d)\.png/);
        const estrellas = numEstrellas ? numEstrellas[1] : "0";  // 0 si no hay estrellas
        if (valorSeleccionado === "todas" || estrellas === valorSeleccionado) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Filtro por nombre, busqueda
document.getElementById('busquedapornombre').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const cards = document.querySelectorAll('.cadatarea');
    cards.forEach(card => {
        const nombre = card.querySelector('h1').textContent.toLowerCase();
        if (nombre.includes(searchTerm)) {
            card.style.display = '';  //Lo mismo
        } else {
            card.style.display = 'none'; //Lo mismo
        }
    });
});