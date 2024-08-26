const root = document.getElementById("root");

/* componentes */

function Conteudo(...elementos) {
    const main = document.createElement("main");
    elementos.forEach((elemento) => main.append(elemento));
    return main;
}

function Rodape(texto) {
    const paragrafo = document.createElement("p");
    paragrafo.innerText = texto;
    const footer = document.createElement("footer");
    footer.append(paragrafo);
    return footer;
}

function Icone(origem, texto){
    const img = document.createElement("img");
    img.setAttribute("src", origem);
    img.setAttribute("alt", texto);
    return img;
}

function Imagem(origem, texto) {
    const img = document.createElement("img");
    img.setAttribute("src", origem);
    img.setAttribute("alt", texto);
    return img;
}

function Titulo(texto) {
    const h1 = document.createElement("h1");
    h1.innerText = texto;
    return h1;
}

function Input(id, tipo, rotulo){
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = rotulo;
    const input = document.createElement("input");
    input.setAttribute("type", tipo);
    input.setAttribute("id", id);
    input.setAttribute("name", id);
    const div = document.createElement("div");
    div.append(label, input);
    return div;
}

function InputSubmit(valor){
    const input = document.createElement("input");
    input.setAttribute("type", "submit");
    input.setAttribute("value", valor);
    return input;
}

function Botao(texto) {
    const button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.setAttribute("value", texto);
    return button;
}

function Link(texto, rota) {
    const a = document.createElement("a");
    a.setAttribute("href", rota);
    a.innerText = texto;
    return a;
}

function onLogin(event){
    event.preventDefault();
    Navega("/home");
}
 
function Menu() {
    const opcoes = [
       {menu: "Home", rota: "/home"},
       {menu: "Perfil", rota: "/perfil"},
       {menu: "Sair", rota: "/login"}
    ];

    const lista = document.createElement("ul");
    opcoes.forEach((opcao) => { 
        const link = Link(opcao.menu, opcao.rota);
        link.addEventListener("click", (event) => {
            event.preventDefault();
            navega(event.target.getAttribute("href"));
        });
        const item = document.createElement("li");
        item.append(link);
        lista.append(item);        
    });
    const nav = document.createElement("nav");
    nav.append(lista);
    return nav;
}

function Subtitulo(texto){
    const h2 = document.createElement("h2");
    h2.innerText = texto;
    return h2;
}

function Secao(nome, conteudo) {
    const titulo = Subtitulo(nome);
    const section = document.createElement("section");
    section.append(titulo, conteudo);
    return section;
}
  
function PageHome() {
    const menu = Menu();
    const grupo = document.createElement("div");
    const itens = [
      "Mural de Avisos",
      "Agenda Acadêmica",
      "Histórico de Notas",
      "Histórico de Faltas",
    ];
    itens.forEach((item) => grupo.append(Painel(item))); // A função Painel não está definida no código original.
    const secao = Secao("Página Inicial", grupo);
    const conteudo = Conteudo(menu, secao);
    const cabecalho = Cabecalho();
    root.append(cabecalho, conteudo);
    document.title = "Home - Aluno Online";
}

/* ferramentas */
function navega(rota) {
   root.innerHTML = null;
   if (rota === "/login") {
    PageLogin();
   } else if (rota === "/home") {
    PageHome();
   } else if (rota === "/perfil") {
    PagePerfil();
   } else {
    root.innerHTML = "<p>Página não encontrada!</p>";
   }
}

function InputSearch(){
    const input = document.createElement("input");
    input.setAttribute("type", "search");
    input.setAttribute("placeholder", "Pesquisar...");
    return input;
}

function Cabecalho() {
    const logo = Icone(
      "https://www.svgrepo.com/show/411955/learn.svg",
      "Logo da Aplicação"
    );
    const titulo = Titulo("Aluno Online");
    const grupo1 = document.createElement("div");
    grupo1.append(logo, titulo);
    const input = InputSearch();
    const icone = Icone(
      "https://www.svgrepo.com/show/507851/search-square.svg",
      "Ícone de Pesquisar"
    );
    const grupo2 = document.createElement("div");
    grupo2.append(input, icone);
    const header = document.createElement("header");
    header.append(grupo1, grupo2);
    return header;
}

/* páginas */
function FormLogin() {
    const email = Input("email", "email", "E-mail");
    const senha = Input("senha", "password", "Senha");
    const entrar = Botao("Entrar");
    entrar.addEventListener("click", (event) => {
        alert("Clicou!");
    });
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/login");
    form.append(email, senha, entrar);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        navega("/home");
    });
    return form;
}

function onClickMenu(event){
    event.preventDefault();
    navega(event.target.getAttribute("href"));
}

function onSalvar(event){
    event.preventDefault();
    navega("/perfil");
}

function PageLogin(){
    const logo = Icone("https://www.svgrepo.com/show/411955/learn.svg", "Logo da Aplicação");
    const titulo = Titulo("Aluno Online");
    const form = FormLogin();
    const link = Link("Esqueceu sua Senha?", "/esqueceu-senha");
    const conteudo = Conteudo(logo, titulo, form, link);
    const rodape = Rodape("Copyright (C) 2024");
    root.append(conteudo, rodape);
    document.title = "Login - Aluno Online";
}

function FormPerfil() {
    const form = document.createElement("form");
    form.setAttribute("action", "/perfil");
    form.setAttribute("method", "post");
    const inputNome = Input("nome", "text", "Nome");
    const inputEmail = Input("email", "email", "E-mail");
    const inputSenha = Input("senha", "password", "Senha");
    const inputSalvar = InputSubmit("Salvar");
    form.append(inputNome, inputEmail, inputSenha, inputSalvar);
    form.addEventListener("submit", onSalvar);
    return form;
}

function PagePerfil() {
    const menu = Menu();
    const form = FormPerfil();
    const secao = Secao("Perfil do Aluno", form);
    const conteudo = Conteudo(menu, secao);
    const cabecalho = Cabecalho();
    root.append(cabecalho, conteudo);
    document.title = "Perfil - Aluno Online";
}

navega("/login");