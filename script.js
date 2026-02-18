<script>
document.addEventListener("DOMContentLoaded", () => {
  const toggleThemeBtn = document.getElementById("toggle-theme");
  const searchInput = document.getElementById("search");
  const categorySelect = document.getElementById("category");
  const studiesContainer = document.getElementById("studies-container");

  // ========== MODO ESCURO ==========
  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark");
      if (toggleThemeBtn) toggleThemeBtn.textContent = "☀️ Modo Claro";
    } else {
      document.body.classList.remove("dark");
      if (toggleThemeBtn) toggleThemeBtn.textContent = "🌙 Modo Escuro";
    }
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      const newTheme = isDark ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  }

  // ========== ESTUDOS ==========
  function getStudies() {
    return JSON.parse(localStorage.getItem("studies")) || [];
  }

  function saveStudies(studies) {
    localStorage.setItem("studies", JSON.stringify(studies));
  }

  function renderStudies(filter = "") {
    if (!studiesContainer) return;
    studiesContainer.innerHTML = "";

    const studies = getStudies();
    const search = searchInput ? searchInput.value.toLowerCase() : "";
    const category = categorySelect ? categorySelect.value : "";

    const filtered = studies.filter(study => {
      const matchesSearch =
        study.title.toLowerCase().includes(search) ||
        study.content.toLowerCase().includes(search);

      const matchesCategory = !category || study.category === category;

      return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
      studiesContainer.innerHTML = "<p>Nenhum estudo encontrado.</p>";
      return;
    }

    filtered.forEach((study, index) => {
      const div = document.createElement("div");
      div.className = "study-card";
      div.innerHTML = `
        <h3>${study.title}</h3>
        <small>${study.category}</small>
        <p>${study.content}</p>
        <div class="comments">
          <h4>Comentários</h4>
          <div class="comment-list" id="comments-${index}"></div>
          <input type="text" placeholder="Escreva um comentário..." id="comment-input-${index}">
          <button onclick="addComment(${index})">Comentar</button>
        </div>
      `;
      studiesContainer.appendChild(div);

      renderComments(index);
    });
  }

  window.addComment = function(index) {
    const input = document.getElementById(`comment-input-${index}`);
    if (!input || input.value.trim() === "") return;

    const studies = getStudies();
    studies[index].comments = studies[index].comments || [];
    studies[index].comments.push(input.value);
    saveStudies(studies);
    input.value = "";
    renderComments(index);
  };

  function renderComments(index) {
    const studies = getStudies();
    const container = document.getElementById(`comments-${index}`);
    if (!container) return;

    container.innerHTML = "";
    const comments = studies[index].comments || [];
    comments.forEach(comment => {
      const p = document.createElement("p");
      p.textContent = comment;
      container.appendChild(p);
    });
  }

  // ========== EVENTOS ==========
  if (searchInput) searchInput.addEventListener("input", renderStudies);
  if (categorySelect) categorySelect.addEventListener("change", renderStudies);

  renderStudies();
});
</script>
