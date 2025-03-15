let amigos = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }
    if (amigos.includes(nome)) {
        alert("Esse nome já foi adicionado!");
        return;
    }

    amigos.push(nome);
    atualizarLista();
    input.value = "";
}

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        li.style.display = "flex";
        li.style.alignItems = "center";
        
        const botaoRemover = document.createElement("span");
        botaoRemover.textContent = "✖";
        botaoRemover.style.marginLeft = "8px";
        botaoRemover.style.fontSize = "12px";
        botaoRemover.style.color = "red";
        botaoRemover.style.cursor = "pointer";
        botaoRemover.style.userSelect = "none";
        botaoRemover.style.fontWeight = "bold";
        botaoRemover.onclick = () => removerAmigo(index);
        
        li.appendChild(botaoRemover);
        lista.appendChild(li);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para o sorteio!");
        return;
    }
    
    let sorteioValido = false;
    let sorteio = [];
    
    while (!sorteioValido) {
        let copiaAmigos = [...amigos];
        sorteio = amigos.map(amigo => {
            let possiveis = copiaAmigos.filter(a => a !== amigo);
            if (possiveis.length === 0) return null;
            let sorteado = possiveis[Math.floor(Math.random() * possiveis.length)];
            copiaAmigos.splice(copiaAmigos.indexOf(sorteado), 1);
            return { amigo, sorteado };
        });
        
        sorteioValido = !sorteio.some(pair => pair.sorteado === null);
    }
    
    exibirResultado(sorteio);
    document.querySelector(".button-draw").textContent = "Resetar";
    document.querySelector(".button-draw").setAttribute("onclick", "resetarJogo()");
}

function exibirResultado(sorteio) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    sorteio.forEach(({ amigo, sorteado }) => {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${sorteado}`;
        resultado.appendChild(li);
    });
}

function resetarJogo() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.querySelector(".button-draw").textContent = "Sortear amigo";
    document.querySelector(".button-draw").setAttribute("onclick", "sortearAmigo()");
}