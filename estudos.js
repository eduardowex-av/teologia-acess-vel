const lista = document.getElementById("lista-estudos");
const filtro = document.getElementById("filtro");
const busca = document.getElementById("busca");

function render() {
  const estudos = JSON.parse(localStorage.getItem("estudos") || "[]");
  const cat = filtro.value || "";
  const termo = (busca && busca.value || "").toLowerCase();

  lista.innerHTML = "";

  estudos
    .filter(e => (!cat || e.categoria === cat))
    .filter(e => e.titulo.toLowerCase().includes(termo) || e.conteudo.toLowerCase().includes(termo))
    .forEach(e => {
      lista.innerHTML += `
        <div class="card estudo">
          <h3>${e.titulo}</h3>
          <small>${e.categoria} • ${e.data}</small>
          <p>${e.conteudo.substring(0, 140)}...</p>
          <a href="estudo.html?id=${e.id}">Ler</a>
        </div>
      `;
    });
}

if (filtro) filtro.addEventListener("change", render);
if (busca) busca.addEventListener("keyup", render);
render();
