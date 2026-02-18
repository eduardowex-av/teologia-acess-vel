const lista = document.getElementById("lista-estudos");
const filtro = document.getElementById("filtro");

function render() {
  const estudos = JSON.parse(localStorage.getItem("estudos") || "[]");
  const cat = filtro.value;

  lista.innerHTML = "";

  estudos
    .filter(e => !cat || e.categoria === cat)
    .forEach(e => {
      lista.innerHTML += `
        <div class="card">
          <h3>${e.titulo}</h3>
          <small>${e.categoria} • ${e.data}</small>
          <p>${e.conteudo.substring(0, 120)}...</p>
        </div>
      `;
    });
}

if (filtro) {
  filtro.addEventListener("change", render);
  render();
}
