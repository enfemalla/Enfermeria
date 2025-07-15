const ramos = [
  { id: 1, nombre: "Biología celular", prerrequisitos: [], semestre: 1 },
  { id: 2, nombre: "Anatomía", prerrequisitos: [], semestre: 1 },
  { id: 3, nombre: "Matemáticas", prerrequisitos: [], semestre: 1 },
  { id: 4, nombre: "Fundamentos de la enfermería", prerrequisitos: [], semestre: 1 },
  { id: 5, nombre: "Educación en enfermería", prerrequisitos: [], semestre: 1 },
  { id: 6, nombre: "Electivo de comunicación", prerrequisitos: [], semestre: 1 },

  { id: 7, nombre: "Microbiología", prerrequisitos: [1], semestre: 2 },
  { id: 8, nombre: "Química", prerrequisitos: [], semestre: 2 },
  { id: 9, nombre: "Bioestadísticas", prerrequisitos: [3], semestre: 2 },
  { id: 10, nombre: "Socioantropología", prerrequisitos: [], semestre: 2 },
  { id: 11, nombre: "Enfermería basada en evidencia", prerrequisitos: [], semestre: 2 },
  { id: 12, nombre: "Electivo del desarrollo", prerrequisitos: [], semestre: 2 },

  { id: 13, nombre: "Fisiología", prerrequisitos: [2, 7], semestre: 3 },
  { id: 14, nombre: "Psicología", prerrequisitos: [], semestre: 3 },
  { id: 15, nombre: "Bioquímica", prerrequisitos: [8], semestre: 3 },
  { id: 16, nombre: "Enfermería salud pública", prerrequisitos: [], semestre: 3 },
  { id: 17, nombre: "Gestión del cuidado", prerrequisitos: [2, 5, 7, 8, 11], semestre: 3 },
  { id: 18, nombre: "Electivo comunicación II", prerrequisitos: [], semestre: 3 },

  { id: 19, nombre: "Fisiopatología", prerrequisitos: [13], semestre: 4 },
  { id: 20, nombre: "Farmacología", prerrequisitos: [13, 15], semestre: 4 },
  { id: 21, nombre: "Gestión del cuidado (cont.)", prerrequisitos: [17], semestre: 4 },
  { id: 22, nombre: "Informática en salud", prerrequisitos: [16], semestre: 4 },
  { id: 23, nombre: "Integrado ciclo inicial", prerrequisitos: [5, 10, 13, 15, 16], semestre: 4 },
  { id: 45, nombre: "Gestión en servicios de salud", prerrequisitos: [16], semestre: 4 },

  { id: 24, nombre: "Gestión cuidado mujer", prerrequisitos: [], semestre: 5 },
  { id: 25, nombre: "Calidad en la gestión del cuidado", prerrequisitos: [21, 45], semestre: 5 },
  { id: 26, nombre: "Gestión adulto mayor", prerrequisitos: [17, 19, 20, 23], semestre: 5 },
  { id: 27, nombre: "Gestión en comunidades", prerrequisitos: [17, 19, 20, 23], semestre: 5 },
  { id: 28, nombre: "Enfermería adulto mayor", prerrequisitos: [], semestre: 5 },
  { id: 29, nombre: "Electivo ética", prerrequisitos: [], semestre: 5 },

  { id: 30, nombre: "Bioética", prerrequisitos: [29], semestre: 6 },
  { id: 31, nombre: "Metodología investigación", prerrequisitos: [9, 11, 21], semestre: 6 },
  { id: 32, nombre: "Salud mental", prerrequisitos: [], semestre: 6 },
  { id: 33, nombre: "Cuidados paliativos", prerrequisitos: [28], semestre: 6 },

  { id: 34, nombre: "Proyecto I", prerrequisitos: [31], semestre: 7 },
  { id: 35, nombre: "Urgencia", prerrequisitos: [26, 27], semestre: 7 },
  { id: 36, nombre: "Niño y adolescente", prerrequisitos: [26, 27], semestre: 7 },
  { id: 37, nombre: "Comunidad II", prerrequisitos: [27], semestre: 7 },
  { id: 38, nombre: "Electivo desarrollo personal", prerrequisitos: [], semestre: 7 },

  { id: 39, nombre: "Proyecto II", prerrequisitos: [34], semestre: 8 },
  { id: 40, nombre: "Integrado ciclo intermedio", prerrequisitos: Array.from({length: 38}, (_, i) => i + 1), semestre: 8 },
  { id: 41, nombre: "Responsabilidad social", prerrequisitos: [], semestre: 8 },

  { id: 42, nombre: "Práctica profesional I", prerrequisitos: Array.from({length: 41}, (_, i) => i + 1), semestre: 9 },
  { id: 43, nombre: "Práctica profesional II", prerrequisitos: Array.from({length: 41}, (_, i) => i + 1), semestre: 10 },
  { id: 44, nombre: "Seminario integración", prerrequisitos: Array.from({length: 41}, (_, i) => i + 1), semestre: 10 }
];

const contenedor = document.getElementById("malla");

function obtenerCompletados() {
  return JSON.parse(localStorage.getItem("ramosCompletados") || "[]");
}

function guardarCompletados(ids) {
  localStorage.setItem("ramosCompletados", JSON.stringify(ids));
}

function crearMalla() {
  contenedor.innerHTML = ""; // 💡 Evita duplicación
  for (let i = 1; i <= 10; i++) {
    const columna = document.createElement("div");
    columna.className = "semestre";
    columna.innerHTML = `<h2>${i}° Semestre</h2>`;
    
    ramos
      .filter(r => r.semestre === i)
      .forEach(ramo => {
        const div = document.createElement("div");
        div.className = "ramo";
        div.id = "ramo-" + ramo.id;
        div.innerText = ramo.nombre;
        div.addEventListener("click", () => completarRamo(ramo.id));
        columna.appendChild(div);
      });
    
    contenedor.appendChild(columna);
  }

  actualizarRamos();
}

function completarRamo(id) {
  const completados = obtenerCompletados();
  if (!completados.includes(id)) {
    completados.push(id);
    guardarCompletados(completados);
  }
  actualizarRamos();
}

function actualizarRamos() {
  const completados = obtenerCompletados();

  ramos.forEach(ramo => {
    const div = document.getElementById("ramo-" + ramo.id);
    if (!div) return;

    div.classList.remove("activo", "completado");

    if (completados.includes(ramo.id)) {
      div.classList.add("completado");
    }

    const requisitosCompletos = ramo.prerrequisitos.every(p => completados.includes(p));
    if (ramo.prerrequisitos.length === 0 || requisitosCompletos) {
      div.classList.add("activo");
    }
  });
}

function reiniciarMalla() {
  localStorage.removeItem("ramosCompletados");
  location.reload();
}

// 🟢 Llamar a crear la malla una vez cargado el script
crearMalla();


