const hamburguer = document.querySelector('.hamburguer');
const nav = document.querySelector('.nav');
const botaoTema = document.querySelector('.botao-tema');
const root = document.documentElement;

hamburguer.addEventListener('click', () => nav.classList.toggle("active"));

botaoTema.addEventListener('click', () => {
    const temaAtual = root.getAttribute('data-theme');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', novoTema);

    botaoTema.textContent = novoTema === 'dark' ? 'Light' : 'Dark';
});

let idiomaAtual = "pt";

function alterarIdioma() {
    idiomaAtual = idiomaAtual == "pt" ? "en" : "pt";
    carregarIdioma(idiomaAtual);
}

function carregarIdioma(idioma) {
    fetch(`json/${idioma}.json`)
        .then(data => data.json())
        .then(data => {
            traduzirPagina(data);
        });
}

function traduzirPagina(linguagem) {
    document.querySelectorAll("[data-i18n]").forEach(elemento => {
        console.log(elemento);
        const chave = elemento.getAttribute("data-i18n");
        console.log(chave);
        if (linguagem[chave]) {
            elemento.innerHTML = linguagem[chave];
        }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(elemento => {
        console.log(elemento);
        const chave = elemento.getAttribute("data-i18n-alt");
        console.log(chave);
        if (linguagem[chave]) {
            elemento.setAttribute("alt", linguagem[chave]);
        }
    });
}

function carregarRepositorios() {
    const url = 'https://api.github.com/users/RomuloJB/repos?per_page=7';

    fetch(url) 
        .then(response => {
            if(! response.ok) {
                throw new Error('Erro ao buscar repositórios');
            }
            return response.json();
        })

        .then(repos => {
            const listaReps = document.querySelector(".lista-rep");
            repos.forEach(repo => {
                const listItem = document.createElement("li");
                listItem.innerHTML =
                    `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                listaReps.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

document.addEventListener("DOMContentLoaded", carregarRepositorios);