const sections = [
  {
    title: "👤 Personas significativas",
    fields: ["Persona 1", "Persona 2", "Persona 3"]
  },
  {
    title: "💬 Vínculos emocionales",
    fields: [
      "¿Con quién te sentías más seguro/a?",
      "¿Quién te generaba más tensión o miedo?",
      "¿Cómo se expresaba el cariño?"
    ]
  },
  {
    title: "♻️ Patrones familiares",
    fields: [
      "Las mujeres siempre cuidan a todos.",
      "Los hombres no lloran.",
      "Hay duelos que nunca se hablaron.",
      "Otro patrón importante"
    ]
  },
  {
    title: "⚡ Conflictos y heridas",
    fields: ["¿Qué temas eran tabú?", "¿Qué vínculo necesita sanar?"]
  },
  {
    title: "🧱 Roles y lealtades",
    fields: ["¿Qué rol tenías en tu familia?", "¿A quién sentías que no podías fallarle?"]
  },
  {
    title: "🌿 Semillas de cambio",
    fields: ["¿Qué vínculo fue refugio para ti?", "¿Qué historia deseas reescribir?"]
  },
  {
    title: "🪞 Preguntas para la integración",
    fields: [
      "¿Qué patrones heredaste sin darte cuenta?",
      "¿Qué vínculo te gustaría resignificar?",
      "¿Qué cosas eliges dejar de cargar?"
    ]
  }
];

const formData = {};
const app = document.getElementById("app");

sections.forEach((section) => {
  const sectionDiv = document.createElement("section");
  const title = document.createElement("h2");
  title.textContent = section.title;
  sectionDiv.appendChild(title);

  section.fields.forEach((field) => {
    const label = document.createElement("label");
    label.textContent = field;

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Escribe tu respuesta...";
    textarea.addEventListener("input", () => {
      formData[field] = textarea.value;
    });

    sectionDiv.appendChild(label);
    sectionDiv.appendChild(textarea);
  });

  app.appendChild(sectionDiv);
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(formData, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "genograma_emocional.json";
  link.click();

  document.getElementById("savedMsg").textContent = "¡Respuestas guardadas como archivo JSON!";
});
