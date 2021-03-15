const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

const searchStates = async searchText =>{
  const res = await fetch("data/states.json");
  const states = await res.json();

  //Get matches to current text input
  let matches = states.filter(state =>{

    // VanillaJS
    // if (state.name.toLowerCase().latinize().includes(searchText.latinize()) || state.capital.toLowerCase().latinize().includes(searchText.latinize())){
    //   return state
    // }

    // Using normalize
    // if (removeDiacritics(state.name.toLowerCase()).includes(removeDiacritics(searchText)) || removeDiacritics(state.capital.toLowerCase()).includes(removeDiacritics(searchText))){
    //   return state
    // }

    //const regex = new RegExp("^" + removeDiacritics(`${searchText}`),'gi');       // Coincide al principio
    //const regex = new RegExp(removeDiacritics(`${searchText}`) + "$",'gi');       // Coincide al final
    const regex = new RegExp(removeDiacritics(`${searchText}`),'gi');               // Needle into haystack
    return regex.test(removeDiacritics(state.name)) || regex.test(removeDiacritics(state.capital))

    
  })

  if (searchText.length ===0){
    matches = [];
    matchList.innerHTML='';
  }

  outputHTML(matches);

}

const outputHTML = matches =>{

  if (matches.length > 0){

    const html = matches.map( match => `
      <div class="card cardbody mb-1">
        <h4>${match.name} (${match.abbr})<span class="text-primary">${match.capital}</span></h4>
        <small>Latitude: 43.213 /Longitude: -113.213</small>

      </div>
    `).join('');
    matchList.innerHTML = html;
    

  }

}

search.addEventListener("input",()=>searchStates(search.value));

