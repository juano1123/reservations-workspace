"use client";

import FechaStep from "@/components/FechaStep";
import HoraStep from "@/components/HoraStep";
import { Layout } from "@/components/Layout";
import ServicioStep from "@/components/ServicioStep";
import Button from "@/components/shared/Button";
import Steps, { Step } from "@/components/Steps";
import { useState } from "react";

const steps: Step[] = [
  {
    id: "servicio",
    name: "Servicio",
    nextStep: "fecha",
    afterStep: null,
  },
  {
    id: "fecha",
    name: "Fecha",
    nextStep: "hora",
    afterStep: "servicio",
  },
  {
    id: "hora",
    name: "Hora",
    nextStep: "confirmacion",
    afterStep: "fecha",
  },
  {
    id: "confirmacion",
    name: "Confirmación",
    nextStep: null,
    afterStep: "hora",
  },
];

export default function Page() {
  const [stepSelected, setStepSelected] = useState<Step>(steps[0]);

  const afterStep = () => {
    if (stepSelected.afterStep) {
      setStepSelected(
        steps.find((s) => s.id === stepSelected.afterStep) ?? steps[0]
      );
      return;
    }
  };

  const nextStep = () => {
    if (stepSelected.nextStep) {
      setStepSelected(
        steps.find((s) => s.id === stepSelected.nextStep) ?? steps[0]
      );
      return;
    }
  };

  return (
    <Layout withNavbar>
      <div className="bg-white min-h-screen w-full pt-8 lg:pt-24 pb-12 flex flex-col items-center sm:px-3">
        <h2 className="text-3xl tracking-tight text-pink-100 sm:text-4xl font-nunito">
          Agenda
        </h2>
        <Steps steps={steps} stepSelected={stepSelected} />
        <div className="px-3 w-full flex justify-center">
          {stepSelected.id === "servicio" && <ServicioStep />}
          {stepSelected.id === "fecha" && <FechaStep />}
          {stepSelected.id === "hora" && <HoraStep />}
        </div>

        <div className="w-full mt-4 flex justify-center gap-3">
          <Button
            typeButton="disabled"
            disabled={!stepSelected.afterStep}
            className={`${
              !stepSelected.afterStep
                ? "cursor-not-allowed opacity-30"
                : "hover:opacity-80"
            }`}
            onClick={afterStep}
          >
            Anterior
          </Button>
          <Button
            typeButton="primary"
            className={`hover:opacity-80`}
            onClick={nextStep}
          >
            {!stepSelected.nextStep ? "Confirmar" : "Siguiente"}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
