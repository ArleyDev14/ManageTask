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
                plataforma = `<img src="img/netflix.png">`
            }else if(proceso.plataforma === "amazon"){
                plataforma = `<img src="img/amazon.png">`
            }else if(proceso.plataforma === "hbo"){
                plataforma = `<img src="img/hbo.png">`
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
            };
            
            if(proceso.estado === "pendiente"){
                estado = `<div class="pendiente"></div>`
            }else if(proceso.estado === "enproceso"){
                estado = `<div class="proceso"></div>`
            }else if(proceso.estado === "terminado"){
                estado = `<div class="terminado"></div>`
            }
            to_html += `
                    <section class="cadatarea">
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
                                    <h2>Formato: </h2><p>${proceso.formato}</p>
                                </section>
                            </div>
                        </section>
                        <section class="s-datos">
                            <section>
                                <h2>Plataforma </h2><p class="plataforma">${plataforma}</p>
                            </section>
                            <section>
                                <h2>valoración </h2>${valoracion}
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
        valoracion: document.querySelector('input[name="Valoracion"]:checked').value,
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
document.getElementById('pendiente').addEventListener('click', function() {
    const tarjetas = document.querySelectorAll('.cadatarea'); 
    tarjetas.forEach(function(tarjeta) {
        const estadoElemento = tarjeta.querySelector('.estado div'); 
        const estado = estadoElemento.classList.contains('pendiente'); 
        if (estado) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none'; 
        }
    });
});

document.getElementById('enproceso').addEventListener('click', function() {
    const tarjetas = document.querySelectorAll('.cadatarea'); 
    tarjetas.forEach(function(tarjeta) {
        const estadoElemento = tarjeta.querySelector('.estado div'); 
        const estado = estadoElemento.classList.contains('enproceso'); 
        if (estado) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none'; 
        }
    });
});

document.getElementById('enproceso').addEventListener('click', function() {
    const tarjetas = document.querySelectorAll('.cadatarea'); 
    tarjetas.forEach(function(tarjeta) {
        const estadoElemento = tarjeta.querySelector('.estado div'); 
        const estado = estadoElemento.classList.contains('proceso'); 
        if (estado) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none'; 
        }
    });
});

document.getElementById('terminado').addEventListener('click', function() {
    const tarjetas = document.querySelectorAll('.cadatarea'); 
    tarjetas.forEach(function(tarjeta) {
        const estadoElemento = tarjeta.querySelector('.estado div'); 
        const estado = estadoElemento.classList.contains('terminado'); 
        if (estado) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none'; 
        }
    });
});