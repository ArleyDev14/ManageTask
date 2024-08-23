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