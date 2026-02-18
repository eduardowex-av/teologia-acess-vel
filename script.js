const busca = document.getElementById("busca");
const estudos = document.querySelectorAll(".estudo");

if (busca) {
  busca.addEventListener("keyup", function () {
    const termo = busca.value.toLowerCase();

    estudos.forEach(function (item) {
      const texto = item.innerText.toLowerCase();
      item.style.display = texto.includes(termo) ? "block" : "none";

const btnTema = document.getElementById("toggleTema");

if (btnTema) {
  btnTema.onclick = () => {
    document.body.classList.toggle("dark");
        
        };
       }
    });
  });
}
