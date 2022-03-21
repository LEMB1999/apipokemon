
document.addEventListener("DOMContentLoaded",()=>{

      const btnSearchPokemon = document.getElementById("btnSearchPokemon");
      btnSearchPokemon.addEventListener("click",searchPokemon);

});


function searchPokemon(){
     const inputNamePokemon = document.getElementById("inputNamePokemon");
     if(inputNamePokemon.value){      
            const searchNamePokemon = inputNamePokemon.value.toLowerCase();
            let url = `https://pokeapi.co/api/v2/pokemon/${searchNamePokemon}`;
          
                  fetch(url)
                  .then(response => response.json())
                  .then(infoPokemon => {
                  
                        const movesPokemon =  infoPokemon.moves.map( (element) => element.move.name );
                        const statsPokemon =  infoPokemon.stats.map( (element)=> `name:${element.stat.name} value:${element.base_stat}` );
                        
                        const namePokemon  =   infoPokemon.name;
                        const elementNamePokemon = document.getElementById("namePokemon");
                        elementNamePokemon.innerText = namePokemon.toUpperCase();
            
                        const elementTypePokemon = document.getElementById("typePokemon");
                        const typePokemon = infoPokemon.types[0].type.name;
                        elementTypePokemon.innerText = typePokemon;
            
                        let img = '<img id="imgPokemon" src="" alt="imagen del pokemon"></img>'
                        document.getElementsByClassName("container-img")[0].innerHTML = img; 

                        const urlImgPokemon =  infoPokemon.sprites.front_default;
                        const elementImgPokemon = document.getElementById("imgPokemon");
                        elementImgPokemon.src =  urlImgPokemon;

                        let template = `
                              <p class="card-text">
                                    Estadisticas:
                                    ${statsPokemon.join(",")}
                              </p>
                              <p class="card-text">
                                    Movimientos:
                                    ${movesPokemon.join(",")}
                              </p>
                        `
                        const containerInfoPokemon = document.getElementById("container-info-pokemon");
                        containerInfoPokemon.innerHTML = template;

                  }
                  ).catch( err => {
                         
                        console.log(err);
                        //show alert pokemon not founded
                        let templateAlert = `
                        <div class="alert alert-danger alert-dismissible fade show  d-flex align-items-center" role="alert" id="alertNotFoundedPokemon">
                              <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                              <div>
                              Pokemon no encontrado - Verifica el Nombre
                              </div>
                              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`

                        document.getElementsByTagName('body')[0].innerHTML+= templateAlert;

                  });
            
      }else{
            console.log("El nombre del pokemon es requerido");
      }
}



