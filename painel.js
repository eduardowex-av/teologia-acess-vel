function salvarEstudo() {
  const titulo = document.getElementById("titulo").value;
  const categoria = document.getElementById("categoria").value;
  const conteudo = document.getElementById("conteudo").value;

  if (!titulo || !conteudo) {
    document.getElementById("msg").innerText = "Preencha tudo!";
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
  document.getElementById("msg").innerText = "Estudo publicado com sucesso!";
}
