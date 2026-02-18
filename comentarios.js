const comentariosDiv = document.getElementById("comentarios");

function comentar() {
  const nome = document.getElementById("nome").value;
  const texto = document.getElementById("comentario").value;

  if (!nome || !texto) return;

  const comentarios = JSON.parse(localStorage.getItem("comentarios") || "[]");
  comentarios.push({ nome, texto });

  localStorage.setItem("comentarios", JSON.stringify(comentarios));
  renderComentarios();
}

function renderComentarios() {
  const comentarios = JSON.parse(localStorage.getItem("comentarios") || "[]");
  comentariosDiv.innerHTML = comentarios
    .map(c => `<p><strong>${c.nome}:</strong> ${c.texto}</p>`)
    .join("");
}

renderComentarios();
