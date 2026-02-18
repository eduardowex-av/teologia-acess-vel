const comentariosDiv = document.getElementById("comentarios");

function comentar() {
  const nome = document.getElementById("nome").value.trim();
  const texto = document.getElementById("comentario").value.trim();

  if (!nome || !texto) return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id") || "geral";

  const chave = "comentarios_" + id;
  const comentarios = JSON.parse(localStorage.getItem(chave) || "[]");

  comentarios.push({ nome, texto, data: new Date().toLocaleString("pt-BR") });
  localStorage.setItem(chave, JSON.stringify(comentarios));

  document.getElementById("nome").value = "";
  document.getElementById("comentario").value = "";

  renderComentarios();
}

function renderComentarios() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id") || "geral";

  const chave = "comentarios_" + id;
  const comentarios = JSON.parse(localStorage.getItem(chave) || "[]");

  comentariosDiv.innerHTML = comentarios
    .map(c => `<p><strong>${c.nome}</strong> (${c.data}): ${c.texto}</p>`)
    .join("");
}

renderComentarios();
