"use client";

import { IBookingState } from "@/interfaces/IBooking";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import StepContainer from "../StepContainer";

interface Props {
  booking: IBookingState;
}

const ConfirmacionStep = ({ booking }: Props) => {
  const formatTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "pm" : "am";
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}${period}`;
  };

  return (
    <StepContainer>
      <div className="p-6 font-nunito">
        <h3 className="text-xl font-bold text-pink-100 mb-6">
          Confirmá tu reserva
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Servicio</span>
            <span className="font-semibold text-gray-700">
              {booking.service?.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Profesional</span>
            <span className="font-semibold text-gray-700">
              {booking.professional?.user?.firstName ?? "Profesional"}{" "}
              {booking.professional?.user?.lastName ?? ""}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Fecha</span>
            <span className="font-semibold text-gray-700">
              {booking.date
                ? format(new Date(booking.date), "PPP", { locale: es })
                : "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Horario</span>
            <span className="font-semibold text-gray-700">
              {booking.time
                ? `${formatTime(booking.time.startTime)} - ${formatTime(booking.time.endTime)}`
                : "-"}
            </span>
          </div>

          <div className="flex justify-between border-t pt-4 mt-4">
            <span className="text-lg font-bold text-gray-700">Total</span>
            <span className="text-lg font-bold text-pink-100">
              ${booking.service?.price ?? 0}
            </span>
          </div>
        </div>
      </div>
    </StepContainer>
  );
};

export default ConfirmacionStep;
