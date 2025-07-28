// src/GenogramaEmocionalApp.tsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "👤 Personas significativas",
    fields: ["Persona 1", "Persona 2", "Persona 3"],
  },
  {
    title: "💬 Vínculos emocionales",
    fields: [
      "¿Con quién te sentías más seguro/a?",
      "¿Quién te generaba más tensión o miedo?",
      "¿Cómo se expresaba el cariño?",
    ],
  },
  {
    title: "♻️ Patrones familiares",
    fields: [
      "Las mujeres siempre cuidan a todos.",
      "Los hombres no lloran.",
      "Hay duelos que nunca se hablaron.",
      "Otro patrón importante",
    ],
  },
  {
    title: "⚡ Conflictos y heridas",
    fields: ["¿Qué temas eran tabú?", "¿Qué vínculo necesita sanar?"],
  },
  {
    title: "🧱 Roles y lealtades",
    fields: ["¿Qué rol tenías en tu familia?", "¿A quién sentías que no podías fallarle?"],
  },
  {
    title: "🌿 Semillas de cambio",
    fields: ["¿Qué vínculo fue refugio para ti?", "¿Qué historia deseas reescribir?"],
  },
  {
    title: "🪞 Preguntas para la integración",
    fields: [
      "¿Qué patrones heredaste sin darte cuenta?",
      "¿Qué vínculo te gustaría resignificar?",
      "¿Qué cosas eliges dejar de cargar?",
    ],
  },
];

function exportToCSV(data) {
  const headers = Object.keys(data);
  const values = Object.values(data).map((v) => (v ? v.replace(/"/g, '""') : ""));

  const csvRows = [];

  // Cabecera
  csvRows.push(headers.join(","));

  // Datos (solo una fila porque es formulario único)
  csvRows.push(values.map((v) => `"${v}"`).join(","));

  const csvContent = csvRows.join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "genograma_emocional.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function GenogramaEmocionalApp() {
  const [formData, setFormData] = useState({});
  const [savedJson, setSavedJson] = useState(false);
  const [savedCsv, setSavedCsv] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setSavedJson(false);
    setSavedCsv(false);
  };

  const handleSaveJson = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "genograma_emocional.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSavedJson(true);
  };

  const handleSaveCsv = () => {
    exportToCSV(formData);
    setSavedCsv(true);
  };

  return (
    <div className="p-4 grid gap-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-blue-900">
        Genomotion: Guía Interactiva
      </h1>

      {sections.map((section, idx) => (
        <Card key={idx} className="shadow-md border-blue-100">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              {section.title}
            </h2>
            {section.fields.map((field, i) => (
              <div key={i} className="mb-4">
                <label className="block text-sm text-blue-700 mb-1">{field}</label>
                <Textarea
                  value={formData[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder="Escribe tu respuesta..."
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={handleSaveJson}
        className="bg-blue-700 hover:bg-blue-800 text-white w-full"
      >
        Guardar respuestas (JSON)
      </Button>
      {savedJson && (
        <p className="text-center text-green-600 font-medium mt-2">
          ¡Respuestas guardadas como archivo JSON!
        </p>
      )}

      <Button
        onClick={handleSaveCsv}
        className="bg-green-700 hover:bg-green-800 text-white w-full mt-4"
      >
        Exportar respuestas a CSV (Excel/Calc)
      </Button>
      {savedCsv && (
        <p className="text-center text-green-600 font-medium mt-2">
          ¡Respuestas exportadas como archivo CSV!
        </p>
      )}
    </div>
  );
}
