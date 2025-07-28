import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

export default function GenogramaEmocionalApp() {
  const [formData, setFormData] = useState({});
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "genograma_emocional.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSaved(true);
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
                <label className="block text-sm text-blue-700 mb-1">
                  {field}
                </label>
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

      <Button onClick={handleSave} className="bg-blue-700 hover:bg-blue-800 text-white w-full">
        Guardar respuestas
      </Button>

      {saved && (
        <p className="text-center text-green-600 font-medium mt-2">
          ¡Respuestas guardadas como archivo JSON!
        </p>
      )}
    </div>
  );
}
