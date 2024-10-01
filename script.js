const listaPais = document.getElementById('lista-pais');
const detalhesPais = document.getElementById('detalhes-pais');
const entradaBusca = document.getElementById('busca');
const filtroRegiao = document.getElementById('filtro-regiao');

async function buscarPaises() { //função assincrona, pra não atrapalhar o código
    //Consumir a API
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
}

function mostrarPaises(countries) {
    listaPais.innerHTML = '';
    countries.forEach(country => { //for each pra colocar todos os paises da API
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');
        countryDiv.innerHTML = `
            <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}">
            <h3>${country.name.common}</h3>
            <p>Capital: ${country.capital}</p>
            <p>Região: ${country.region}</p>
        `; //Dados da API
        countryDiv.addEventListener('click', () => mostrarDetalhesPais(country));
        //Evento de clique do mouse na bandeira do país
        listaPais.appendChild(countryDiv);
    });
}

//Listar detalhes totais da API
function mostrarDetalhesPais(country) {
    detalhesPais.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}">
        <p>Capital: ${country.capital}</p>
        <p>Região: ${country.region}</p>
        <p>População: ${country.population}</p>
        <p>Área: ${country.area} km²</p>
        <p>Idiomas: ${Object.values(country.languages).join(', ')}</p>
        <p>Moedas: ${Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
        <button onclick="voltar()">Voltar</button>
    `;
    listaPais.style.display = 'none'; //Pra mostrar só o país
    detalhesPais.style.display = 'block'; //Em bloco pra mostrar melhor
}

function voltar() {
    //Retorna pra o site anterior
    listaPais.style.display = 'block';
    detalhesPais.style.display = 'none';
}

async function iniciar() {
    //inicializa tudo
    const countries = await buscarPaises();
    mostrarPaises(countries);

    entradaBusca.addEventListener('input', () => { //Buscar por nome
        const query = entradaBusca.value.toLowerCase();
        const filteredCountries = countries.filter(country => 
            country.name.common.toLowerCase().includes(query)
        );
        mostrarPaises(filteredCountries);
    });

    filtroRegiao.addEventListener('change', () => { //Mudança por filtro
        const selectedRegion = filtroRegiao.value;
        const filteredCountries = selectedRegion ? countries.filter(country => 
            country.region === selectedRegion
        ) : countries;
        mostrarPaises(filteredCountries);
    });
}
iniciar();