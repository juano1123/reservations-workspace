"use client";

import FechaStep from "@/components/FechaStep";
import HoraStep from "@/components/HoraStep";
import { Layout } from "@/components/Layout";
import ServicioStep from "@/components/ServicioStep";
import Button from "@/components/shared/Button";
import Steps, { Step } from "@/components/Steps";
import { IBookingState, IProfessional, ITimeSlot } from "@/interfaces/IBooking";
import { IService } from "@/interfaces/IService";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmacionStep from "@/components/ConfirmacionStep";
import { createReservation } from "@/store/services/reservationApi";
import { useAuth } from "@/contexts/AuthContext";
import { usePendingBooking } from "@/contexts/PendingBookingContext";

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
  const router = useRouter();
  const { user, login, register } = useAuth();
  const { setHasPendingBooking } = usePendingBooking();
  const [stepSelected, setStepSelected] = useState<Step>(steps[0]);
  const [booking, setBooking] = useState<IBookingState>({
    service: null,
    professional: null,
    date: null,
    time: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const hasBookingData = !!(booking.service || booking.professional || booking.date || booking.time);

  useEffect(() => {
    setHasPendingBooking(hasBookingData);
  }, [hasBookingData, setHasPendingBooking]);

  useEffect(() => {
    if (!hasBookingData) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasBookingData]);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authFullName, setAuthFullName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  const updateBooking = (partial: Partial<IBookingState>) => {
    setBooking((prev) => ({ ...prev, ...partial }));
  };

  const afterStep = () => {
    if (stepSelected.afterStep) {
      setStepSelected(
        steps.find((s) => s.id === stepSelected.afterStep) ?? steps[0],
      );
    }
  };

  const nextStep = () => {
    if (stepSelected.nextStep) {
      setStepSelected(
        steps.find((s) => s.id === stepSelected.nextStep) ?? steps[0],
      );
    }
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      await createReservation(booking);
      setHasPendingBooking(false);
      toast.success("Reserva creada con éxito");
      router.push("/dashboard");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Error al crear la reserva");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmClick = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      handleConfirm();
    }
  };

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setAuthSubmitting(true);
    try {
      if (authMode === "login") {
        await login(authEmail, authPassword);
      } else {
        await register(authEmail, authPassword, authPhone || undefined, authFullName || undefined);
      }
      setAuthModalOpen(false);
      setAuthEmail("");
      setAuthPassword("");
      setAuthFullName("");
      setAuthPhone("");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Error de autenticación");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const canGoNext = () => {
    switch (stepSelected.id) {
      case "servicio":
        return !!booking.service;
      case "fecha":
        return !!booking.date && !!booking.professional;
      case "hora":
        return !!booking.time;
      default:
        return booking.service && booking.date && booking.time;
    }
  };

  return (
    <Layout withNavigation>
      <div className="min-h-screen w-full pt-8 lg:pt-24 pb-12 flex flex-col items-center sm:px-3">
        <h2 className="text-3xl tracking-tight text-pink-100 sm:text-4xl font-nunito">
          Agenda
        </h2>
        <Steps steps={steps} stepSelected={stepSelected} />
        <div className="px-3 w-full flex justify-center">
          {stepSelected.id === "servicio" && (
            <ServicioStep
              selectedService={booking.service}
              onSelectService={(service: IService) =>
                updateBooking({ service })
              }
            />
          )}
          {stepSelected.id === "fecha" && (
            <FechaStep
              selectedService={booking.service}
              selectedDate={booking.date}
              selectedProfessional={booking.professional}
              onSelectDate={(date: Date) => updateBooking({ date })}
              onSelectProfessional={(professional: IProfessional) =>
                updateBooking({ professional })
              }
            />
          )}
          {stepSelected.id === "hora" && (
            <HoraStep
              selectedService={booking.service}
              selectedDate={booking.date}
              selectedProfessional={booking.professional}
              selectedTime={booking.time}
              onSelectTime={(time: ITimeSlot) => updateBooking({ time })}
              userId={user?.id}
            />
          )}
          {stepSelected.id === "confirmacion" && (
            <ConfirmacionStep booking={booking} />
          )}
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
            className={`hover:opacity-80 ${
              !canGoNext() || submitting ? "cursor-not-allowed opacity-30" : ""
            }`}
            disabled={!canGoNext() || submitting}
            onClick={stepSelected.nextStep ? nextStep : handleConfirmClick}
          >
            {stepSelected.nextStep ? "Siguiente" : submitting ? "Confirmando..." : "Confirmar Reserva"}
          </Button>
        </div>
      </div>

      {/* Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex mb-4">
              <button
                onClick={() => setAuthMode("login")}
                className={`flex-1 py-2 text-sm font-semibold rounded-tl-md ${
                  authMode === "login"
                    ? "bg-pink-100 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setAuthMode("register")}
                className={`flex-1 py-2 text-sm font-semibold rounded-tr-md ${
                  authMode === "register"
                    ? "bg-pink-100 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                Registrarse
              </button>
            </div>
            <p className="text-sm text-gray-500 text-center mb-4">
              Inicia sesión para confirmar tu reserva
            </p>
            <form onSubmit={handleAuth} className="space-y-3">
              {authMode === "register" && (
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={authFullName}
                  onChange={(e) => setAuthFullName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
                required
              />
              {authMode === "register" && (
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
                />
              )}
              <Button
                typeButton="primary"
                className="w-full"
                disabled={authSubmitting}
              >
                {authSubmitting
                  ? "Procesando..."
                  : authMode === "login"
                    ? "Iniciar sesión"
                    : "Crear cuenta"}
              </Button>
            </form>
            <button
              onClick={() => setAuthModalOpen(false)}
              className="mt-3 w-full text-sm text-gray-400 hover:text-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
