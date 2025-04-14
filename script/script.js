const hamburguer = document.querySelector('.hamburguer');
const nav = document.querySelector('.nav');
const botaoTema = document.querySelector('.botao-tema');
const root = document.documentElement;

hamburguer.addEventListener('click', () => nav.classList.toggle("active"));

botaoTema.addEventListener('click', () => {
    const temaAtual = root.getAttribute('data-theme');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', novoTema);

    botaoTema.textContent = novoTema === 'dark' ? 'Tema Claro' : 'Tema Escuro';
});