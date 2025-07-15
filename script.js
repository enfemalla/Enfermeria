const ramos = [ /* tu array completo, incluyendo id 45 */ ];
const contenedor = document.getElementById("malla");

function obtenerCompletados() {
  return JSON.parse(localStorage.getItem("ramosCompletados") || "[]");
}

function guardarCompletados(ids) {
  localStorage.setItem("ramosCompletados", JSON.stringify(ids));
}

function crearMalla() {
  contenedor.innerHTML = ""; // limpia malla antes de crear
  for (let i = 1; i <= 10; i++) {
    const col = document.createElement("div");
    col.className = "semestre";
    col.innerHTML = `<h2>${i}° Semestre</h2>`;
    ramos.filter(r => r.semestre === i).forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.id = "ramo-" + ramo.id;
      div.innerText = ramo.nombre;
      div.addEventListener("click", () => completarRamo(ramo.id));
      col.appendChild(div);
    });
    contenedor.appendChild(col);
  }
  actualizarRamos();
}

function completarRamo(id) {
  const comp = obtenerCompletados();
  if (!comp.includes(id)) {
    comp.push(id);
    guardarCompletados(comp);
  }
  actualizarRamos();
}

function actualizarRamos() {
  const comp = obtenerCompletados();
  ramos.forEach(r => {
    const div = document.getElementById("ramo-" + r.id);
    if (!div) return;
    div.classList.remove("activo","completado");
    if (comp.includes(r.id)) {
      div.classList.add("completado");
    }
    const ok = r.prerrequisitos.every(p => comp.includes(p));
    if (r.prerrequisitos.length === 0 || ok) {
      div.classList.add("activo");
    }
  });
}

function reiniciarMalla() {
  localStorage.removeItem("ramosCompletados");
  location.reload();
}

crearMalla();
