//Mi MockApi
const url_api = "https://66c6c3198b2c10445bc79963.mockapi.io/managetask/tareas/tareas"


//Impresion de las cards con el MockApi
document.addEventListener("DOMContentLoaded",()=>{
    fetch(url_api)
    .then(response => response.json())
    .then(data => {
        to_html = ""
        console.log(data);
        data.forEach(proceso =>{
            estado = ``
            plataforma = ``
            valoracion = ``

            if(proceso.plataforma === "netflix"){
                plataforma = `<img alt="netflix" data-plataforma="netflix" src="img/netflix.png">`
            }else if(proceso.plataforma === "amazon"){
                plataforma = `<img alt="amazon" data-plataforma="amazon" src="img/amazon.png">`
            }else if(proceso.plataforma === "hbo"){
                plataforma = `<img alt="hbo" data-plataforma="hbo" src="img/hbo.png">`
            }else{
                plataforma = proceso.plataforma
            };
            
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
            }
            
            if(proceso.estado === "pendiente"){
                estado = `<div class="pendiente"></div>`
            }else if(proceso.estado === "enproceso"){
                estado = `<div class="proceso"></div>`
            }else if(proceso.estado === "terminado"){
                estado = `<div class="terminado"></div>`
            }
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
                                    <h2>Genero: </h2><p class="genero">${proceso.genero}</p>
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
        document.getElementById("container").innerHTML = to_html
})
        })


//Creación de recursos
function crear_recurso(data) {
    fetch(url_api, {
        method: 'POST',
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
            alert("recurso creado")
        })
        .catch(error => {
            console.error('Error:', error);
        });
        }
id = 0
document.getElementById('formulariocrear').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        nombre: document.getElementById('nombre').value,
        estado: "pendiente",
        formato: document.getElementById('formato').value,
        genero: document.getElementById('genero').value,
        plataforma: document.getElementById('plataforma').value,
        fechafin: document.getElementById('fechafin').value,
        valoracion: "0",
        resena: document.getElementById('resena').value,
        id: id+= 1
    };
    crear_recurso(formData);
});


//Boton de agregar y cerrar
document.getElementById("crearrecurso").addEventListener("click",()=>{
    const caja = document.getElementById("sectionformulario")
    const boton = document.getElementById("crearrecurso")
    if (caja.classList.contains('cajaoculta')) {
        // Mostrar la caja con animación
        caja.classList.remove('cajaoculta');
        requestAnimationFrame(() => {
            caja.classList.add('cajavisible');
            boton.textContent = "x"
        });
    } else {
        // Ocultar la caja con animación
        caja.classList.remove('cajavisible');
        caja.addEventListener('transitionend', function() {
            if (!caja.classList.contains('cajavisible')) {
                caja.classList.add('cajaoculta');
                boton.textContent = "+"
            }
        
        },);
    }
})


// BOTON DE ELIMINAR CARD
document.getElementById('container').addEventListener('click', function(event) {
    if (event.target.closest('.btn-eliminar')) {
        const id = event.target.closest('.btn-eliminar').getAttribute('data-id');
        eliminar_recurso(id);
    }
});
function eliminar_recurso(id) {
    const deleteUrl = `${url_api}/${id}`;
    fetch(deleteUrl, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el recurso');
        }
        return response.json();
    })
    .then(result => {
        console.log('Recurso eliminado:', result);
        alert("Recurso eliminado");
        // Recargar la lista de recursos o eliminar el elemento del DOM
        document.querySelector(`.btn-eliminar[data-id="${id}"]`).closest('.cadatarea').remove();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// ABRIR SECCION DE EDICION
document.getElementById('container').addEventListener('click', function(event) {
    if (event.target.closest('#btn-editar')) {
        const card = event.target.closest('.cadatarea');
        const id = card.querySelector('.btn-eliminar').getAttribute('data-id');

        // Cargar datos en el formulario
        document.getElementById('editar-nombre').value = card.querySelector('.nombrestado h1').textContent;
        document.getElementById('editar-formato').value = card.querySelector('.s-nombre section:nth-child(2) p').textContent;
        document.getElementById('editar-genero').value = card.querySelector('.s-nombre section:first-child p').textContent;

        // Extraer y asignar el valor de la plataforma
        const plataformaImgSrc = card.querySelector('.s-datos section:first-child img').src;
        if (plataformaImgSrc.includes('netflix')) {
            document.getElementById('editar-plataforma').value = 'netflix';
        } else if (plataformaImgSrc.includes('hbo')) {
            document.getElementById('editar-plataforma').value = 'hbo';
        } else if (plataformaImgSrc.includes('amazon')) {
            document.getElementById('editar-plataforma').value = 'amazon';
        }

        // Cargar la fecha de finalización
        document.getElementById('editar-fechafin').value = card.querySelector('.fecha p').textContent;

        // Cargar la reseña
        document.getElementById('editar-resena').value = card.querySelector('.resena').textContent;

        // Cargar la valoración basada en la cantidad de estrellas
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

        // Cargar el estado
        document.getElementById('editar-estado').value = card.querySelector('.estado div').classList.contains('pendiente') ? 'pendiente' :
                                                        card.querySelector('.estado div').classList.contains('proceso') ? 'enproceso' :
                                                        'terminado';

        // Abre el modal
        document.getElementById('modal-editar').style.display = 'block';

        // Guardar el id de la card en el formulario
        document.getElementById('form-editar').dataset.id = id;
    }
});

document.getElementById('cerrar-modal').addEventListener('click', function() {
    document.getElementById('modal-editar').style.display = 'none';
});

document.getElementById('form-editar').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = event.target.dataset.id;

    const updatedData = {
        nombre: document.getElementById('editar-nombre').value,
        formato: document.getElementById('editar-formato').value,
        genero: document.getElementById('editar-genero').value,
        plataforma: document.getElementById('editar-plataforma').value,
        fechafin: document.getElementById('editar-fechafin').value,
        valoracion: document.querySelector('input[name="editar-valoracion"]:checked').value,
        resena: document.getElementById('editar-resena').value,
        estado: document.getElementById('editar-estado').value // Nuevo campo de estado
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
        alert("Recurso actualizado");
        // Recargar la página o actualizar la card en el DOM
        location.reload();
    })
    .catch(error => {
        console.error('Error al actualizar el recurso:', error);
    });

    // Cerrar el modal
    document.getElementById('modal-editar').style.display = 'none';
});


//FILTRO Y BUSQUEDA
document.getElementById('filtroporestado').addEventListener('change', function() {
    const selectedValue = this.value;
    const allCards = document.querySelectorAll('.cadatarea');

    allCards.forEach(card => {
        const estado = card.querySelector('.estado > div').classList.contains(selectedValue);
        
        if (selectedValue === "todos" || estado) {
            card.style.display = 'block'; // Mostrar la card
        } else {
            card.style.display = 'none'; // Ocultar la card
        }
    });
});

document.getElementById('filtroporgenero').addEventListener('change', function() {
    const selectedGenre = this.value.toLowerCase();
    const cards = document.querySelectorAll('.cadatarea');

    cards.forEach(card => {
        const cardGenre = card.querySelector('.s-nombre p').textContent.toLowerCase();

        if (selectedGenre === 'todos' || cardGenre.includes(selectedGenre)) {
            card.style.display = 'block'; // Muestra la card si coincide con el género seleccionado
        } else {
            card.style.display = 'none'; // Oculta la card si no coincide
        }
    });
});

// Función para filtrar por formato
function filtrarPorFormato() {
    const formatoSeleccionado = document.getElementById('filtroporformato').value.toLowerCase();
    const cards = document.querySelectorAll('.cadatarea');

    cards.forEach(card => {
        const formatoCard = card.querySelector('.formato-texto').textContent.toLowerCase();

        if (formatoSeleccionado === 'todos' || formatoCard === formatoSeleccionado) {
            card.style.display = 'block'; // Mostrar la card
        } else {
            card.style.display = 'none'; // Ocultar la card
        }
    });
}
document.getElementById('filtroporformato').addEventListener('change', filtrarPorFormato);


// Filtro por plataforma
document.getElementById('filtroporplataforma').addEventListener('change', function() {
    const plataformaSeleccionada = this.value.toLowerCase();
    const cards = document.querySelectorAll('.cadatarea');

    cards.forEach(card => {
        const plataformaCard = card.getAttribute('data-plataforma').toLowerCase().trim();

        if (plataformaSeleccionada === 'todas' || plataformaCard === plataformaSeleccionada) {
            card.style.display = 'block'; // Mostrar la card
        } else {
            card.style.display = 'none'; // Ocultar la card
        }
    });
});


//Filtro por valoración
document.getElementById('filtroporval').addEventListener('change', function() {
    const valorSeleccionado = this.value;
    const cards = document.querySelectorAll('.cadatarea');

    cards.forEach(card => {
        const valoracionCard = card.querySelector('.num_val img') ? card.querySelector('.num_val img').src : '';

        // Extraer la cantidad de estrellas desde el nombre del archivo (e.g., "estrella4.png" -> 4)
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
            card.style.display = '';  // Mostrar la card si coincide
        } else {
            card.style.display = 'none';  // Ocultar la card si no coincide
        }
    });
});