const ramos = [
  { id: 1, nombre: "Biología celular", prerrequisitos: [] },
  { id: 2, nombre: "Anatomía", prerrequisitos: [] },
  { id: 3, nombre: "Matemáticas", prerrequisitos: [] },
  { id: 4, nombre: "Fundamentos de la enfermería", prerrequisitos: [] },
  { id: 5, nombre: "Educación en enfermería", prerrequisitos: [] },
  { id: 6, nombre: "Electivo de comunicación", prerrequisitos: [] },
  { id: 7, nombre: "Microbiología", prerrequisitos: [1] },
  { id: 8, nombre: "Química", prerrequisitos: [] },
  { id: 9, nombre: "Bioestadísticas", prerrequisitos: [3] },
  { id: 10, nombre: "Socioantropología", prerrequisitos: [] },
  { id: 11, nombre: "Enfermería basada en la evidencia", prerrequisitos: [] },
  { id: 12, nombre: "Electivo del desarrollo", prerrequisitos: [] },
  { id: 13, nombre: "Fisiología", prerrequisitos: [2, 7] },
  { id: 14, nombre: "Psicología", prerrequisitos: [] },
  { id: 15, nombre: "Bioquímica", prerrequisitos: [8] },
  { id: 16, nombre: "Enfermería en salud pública", prerrequisitos: [] },
  { id: 17, nombre: "Gestión del cuidado", prerrequisitos: [2, 5, 7, 8, 11] },
  { id: 18, nombre: "Electivo de comunicación", prerrequisitos: [] },
  { id: 19, nombre: "Fisiopatología", prerrequisitos: [13] },
  { id: 20, nombre: "Farmacología", prerrequisitos: [13, 15] },
  { id: 21, nombre: "Gestión del cuidado (continuación)", prerrequisitos: [17] },
  { id: 22, nombre: "Herramientas informáticas en salud", prerrequisitos: [16] },
  { id: 23, nombre: "Integrado ciclo inicial", prerrequisitos: [5, 10, 13, 15, 16] },
  { id: 24, nombre: "Gestión del cuidado de la mujer", prerrequisitos: [] },
  { id: 25, nombre: "Calidad en gestión del cuidado", prerrequisitos: [21] },
  { id: 26, nombre: "Gestión del cuidado adulto mayor", prerrequisitos: [17, 19, 20, 23] },
  { id: 27, nombre: "Gestión del cuidado en comunidades", prerrequisitos: [17, 19, 20, 23] },
  { id: 28, nombre: "Enfermería del adulto mayor", prerrequisitos: [] },
  { id: 29, nombre: "Electivo de ética", prerrequisitos: [] },
  { id: 30, nombre: "Bioética", prerrequisitos: [29] },
  { id: 31, nombre: "Metodología investigación", prerrequisitos: [9, 11, 21] },
  { id: 32, nombre: "Gestión del cuidado salud mental", prerrequisitos: [] },
  { id: 33, nombre: "Cuidados paliativos", prerrequisitos: [28] },
  { id: 34, nombre: "Proyecto investigación I", prerrequisitos: [31] },
  { id: 35, nombre: "Gestión del cuidado en urgencia", prerrequisitos: [26, 27] },
  { id: 36, nombre: "Gestión cuidado niño y adolescente", prerrequisitos: [26, 27] },
  { id: 37, nombre: "Gestión del cuidado en comunidades II", prerrequisitos: [27] },
  { id: 38, nombre: "Electivo desarrollo personal", prerrequisitos: [] },
  { id: 39, nombre: "Proyecto investigación II", prerrequisitos: [34] },
  { id: 40, nombre: "Integrado ciclo intermedio", prerrequisitos: Array.from({length: 38}, (_, i) => i + 1) },
  { id: 41, nombre: "Electivo responsabilidad social", prerrequisitos: [] },
  { id: 42, nombre: "Práctica profesional I", prerrequisitos: Array.from({length: 41}, (_, i) => i + 1) },
  { id: 43, nombre: "Práctica profesional II", prerrequisitos: Array.from({length: 41}, (_, i) => i + 1) },
  { id: 44, nombre: "Seminario de integración", prerrequisitos: Array.from({length: 41}, (_, i) => i + 1) }
];

const contenedor = document.getElementById("malla");

function crearRamos() {
  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.id = "ramo-" + ramo.id;
    div.innerText = ramo.nombre;
    div.addEventListener("click", () => completarRamo(ramo.id));
    contenedor.appendChild(div);
  });
  actualizarRamos();
}

function completarRamo(id) {
  const div = document.getElementById("ramo-" + id);
  div.classList.add("completado");
  actualizarRamos();
}

function actualizarRamos() {
  ramos.forEach(ramo => {
    const div = document.getElementById("ramo-" + ramo.id);
    const completados = ramo.prerrequisitos.every(p => {
      const r = document.getElementById("ramo-" + p);
      return r.classList.contains("completado");
    });
    if (ramo.prerrequisitos.length === 0 || completados) {
      div.classList.add("activo");
    }
  });
}

crearRamos();
