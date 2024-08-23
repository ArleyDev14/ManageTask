//Mi MockApi
const url_api = "https://66c6c3198b2c10445bc79963.mockapi.io/managetask/tareas/tareas"

//Impresion de las cards con el MockApi
document.addEventListener("DOMContentLoaded",()=>{
    fetch(url_api)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const dataObj = data[0];
        const series = dataObj.series;
        const libros = dataObj.libros;
        const peliculas = dataObj.peliculas;
        var estado = ``
        var valoracion = ``
        var plataforma = ``
        to_html = ''
        //##################################################Impresion series
        series.forEach(serie => {
            if(serie.plataforma === "netflix"){
                plataforma = `<img src="img/netflix.png">`
            }else if(serie.plataforma === "amazon"){
                plataforma = `<img src="img/amazon.png">`
            }else if(serie.plataforma === "hbo"){
                plataforma = `<img src="img/hbo.png">`
            }else{
                plataforma = serie.plataforma
            };
            
            if(serie.valoracion === 1){
                valoracion = `<img src="img/estrella1.png">`
            }else if(serie.valoracion === 2){
                valoracion = `<img src="img/estrella2.png">`
            }else if(serie.valoracion === 3){
                valoracion = `<img src="img/estrella3.png">`
            }else if(serie.valoracion === 4){
                valoracion = `<img src="img/estrella4.png">`
            }else if(serie.valoracion === 5){
                valoracion = `<img src="img/estrella5.png">`
            };
            
            if(serie.estado === "pendiente"){
                estado = `<div class="pendiente"></div>`
            }else if(serie.estado === "enproceso"){
                estado = `<div class="proceso"></div>`
            }else if(serie.estado === "terminado"){
                estado = `<div class="terminado"></div>`
            }
            to_html += `
                    <section class="cadatarea">
                    <div class="nombrestado">
                        <h1>${serie.nombre}</h1>
                        <section class="estado">
                            ${estado}
                        </section>
                    </div>
                    <section class="sinfin">
                        <section class="s-nombre">
                            <div>
                                <section>
                                    <h2>Genero: </h2><p>${serie.genero}</p>
                                </section>
                                <section>
                                    <h2>Formato: </h2><p>${serie.formato}</p>
                                </section>
                            </div>
                        </section>
                        <section class="s-datos">
                            <section>
                                <h2>Plataforma </h2>${plataforma}
                            </section>
                            <section>
                                <h2>valoración </h2>${valoracion}
                            </section>
                        </section>
                    </section>
                    <h2>Reseña:</h2><p>${serie.resena}</p>
                    <hr>
                    <div class="fechaabajo">
                        <section class="fecha">
                            <h2>Fecha fin: </h2><p>${serie.fechafin}</p>
                        </section>
                    </div>
                    <div class="btns">
                        <button><img src="img/editar.png"></button>
                        <button><img src="img/eliminar.png"></button>
                    </div>
                    </section>
                `
        });
        //##################################################Impresion Peliculas
        peliculas.forEach(pelicula => {
            if(pelicula.plataforma === "netflix"){
                plataforma = `<img src="img/netflix.png">`
            }else if(pelicula.plataforma === "amazon"){
                plataforma = `<img src="img/amazon.png">`
            }else if(pelicula.plataforma === "hbo"){
                plataforma = `<img src="img/hbo.png">`
            }else{
                plataforma = pelicula.plataforma
            };
            
            if(pelicula.valoracion === 1){
                valoracion = `<img src="img/estrella1.png">`
            }else if(pelicula.valoracion === 2){
                valoracion = `<img src="img/estrella2.png">`
            }else if(pelicula.valoracion === 3){
                valoracion = `<img src="img/estrella3.png">`
            }else if(pelicula.valoracion === 4){
                valoracion = `<img src="img/estrella4.png">`
            }else if(pelicula.valoracion === 5){
                valoracion = `<img src="img/estrella5.png">`
            };
            
            if(pelicula.estado === "pendiente"){
                estado = `<div class="pendiente"></div>`
            }else if(pelicula.estado === "enproceso"){
                estado = `<div class="proceso"></div>`
            }else if(pelicula.estado === "terminado"){
                estado = `<div class="terminado"></div>`
            }
            to_html += `
                    <section class="cadatarea">
                    <div class="nombrestado">
                        <h1>${pelicula.nombre}</h1>
                        <section class="estado">
                            ${estado}
                        </section>
                    </div>
                    <section class="sinfin">
                        <section class="s-nombre">
                            <div>
                                <section>
                                    <h2>Genero: </h2><p>${pelicula.genero}</p>
                                </section>
                                <section>
                                    <h2>Formato: </h2><p>${pelicula.formato}</p>
                                </section>
                            </div>
                        </section>
                        <section class="s-datos">
                            <section>
                                <h2>Plataforma </h2>${plataforma}
                            </section>
                            <section>
                                <h2>valoración </h2>${valoracion}
                            </section>
                        </section>
                    </section>
                    <h2>Reseña:</h2><p>${pelicula.resena}</p>
                    <hr>
                    <div class="fechaabajo">
                        <section class="fecha">
                            <h2>Fecha fin: </h2><p>${pelicula.fechafin}</p>
                        </section>
                    </div>
                    <div class="btns">
                        <button><img src="img/editar.png"></button>
                        <button><img src="img/eliminar.png"></button>
                    </div>
                    </section>
                `
        });
        //##################################################Impresion Libros
        libros.forEach(libro => {
            if(libro.plataforma === "netflix"){
                plataforma = `<img src="img/netflix.png">`
            }else if(libro.plataforma === "amazon"){
                plataforma = `<img src="img/amazon.png">`
            }else if(libro.plataforma === "hbo"){
                plataforma = `<img src="img/hbo.png">`
            }else{
                plataforma = libro.plataforma
            };
            
            if(libro.valoracion === 1){
                valoracion = `<img src="img/estrella1.png">`
            }else if(libro.valoracion === 2){
                valoracion = `<img src="img/estrella2.png">`
            }else if(libro.valoracion === 3){
                valoracion = `<img src="img/estrella3.png">`
            }else if(libro.valoracion === 4){
                valoracion = `<img src="img/estrella4.png">`
            }else if(libro.valoracion === 5){
                valoracion = `<img src="img/estrella5.png">`
            };
            
            if(libro.estado === "pendiente"){
                estado = `<div class="pendiente"></div>`
            }else if(libro.estado === "enproceso"){
                estado = `<div class="proceso"></div>`
            }else if(libro.estado === "terminado"){
                estado = `<div class="terminado"></div>`
            }
            to_html += `
                    <section class="cadatarea">
                    <div class="nombrestado">
                        <h1>${libro.nombre}</h1>
                        <section class="estado">
                            ${estado}
                        </section>
                    </div>
                    <section class="sinfin">
                        <section class="s-nombre">
                            <div>
                                <section>
                                    <h2>Genero: </h2><p>${libro.genero}</p>
                                </section>
                                <section>
                                    <h2>Formato: </h2><p>${libro.formato}</p>
                                </section>
                            </div>
                        </section>
                        <section class="s-datos">
                            <section>
                                <h2>Plataforma </h2>${plataforma}
                            </section>
                            <section>
                                <h2>valoración </h2>${valoracion}
                            </section>
                        </section>
                    </section>
                    <h2>Reseña:</h2><p>${libro.resena}</p>
                    <hr>
                    <div class="fechaabajo">
                        <section class="fecha">
                            <h2>Fecha fin: </h2><p>${libro.fechafin}</p>
                        </section>
                    </div>
                    <div class="btns">
                        <button><img src="img/editar.png"></button>
                        <button><img src="img/eliminar.png"></button>
                    </div>
                    </section>
                `
        });
        document.getElementById("container").innerHTML = to_html
})
})

function agregar_recuros(recurso){
    
}