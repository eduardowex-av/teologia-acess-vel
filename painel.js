function salvarEstudo() {
  const titulo = document.getElementById("titulo").value.trim();
  const categoria = document.getElementById("categoria").value;
  const conteudo = document.getElementById("conteudo").value.trim();
  const msg = document.getElementById("msg");

  if (!titulo || !conteudo) {
    msg.innerText = "Preencha título e conteúdo.";
    return;
  }

  const estudos = JSON.parse(localStorage.getItem("estudos") || "[]");

  estudos.push({
    id: Date.now(),
    titulo,
    categoria,
    conteudo,
    data: new Date().toLocaleDateString("pt-BR")
  });

  localStorage.setItem("estudos", JSON.stringify(estudos));
  msg.innerText = "Estudo publicado com sucesso!";

  document.getElementById("titulo").value = "";
  document.getElementById("conteudo").value = "";
}
