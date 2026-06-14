"use client";

import { IProfessional, ITimeSlot } from "@/interfaces/IBooking";
import { IService } from "@/interfaces/IService";
import { authFetch } from "@/utils/authFetch";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import StepContainer from "../StepContainer";

interface Props {
  selectedService: IService | null;
  selectedDate: Date | null;
  selectedProfessional: IProfessional | null;
  selectedTime: ITimeSlot | null;
  onSelectTime: (time: ITimeSlot) => void;
  userId?: string | null;
}

interface ScheduleDay {
  day: string;
  startTime: string;
  endTime: string;
  blocks?: {
    startTime: string;
    endTime: string;
    type: string;
  }[];
}

interface ReservationSlot {
  startTime: string;
  endTime: string;
}

const weekdayMap: Record<string, string> = {
  Sunday: "Sunday",
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
};

const HoraStep = ({
  selectedService,
  selectedDate,
  selectedProfessional,
  selectedTime,
  onSelectTime,
  userId,
}: Props) => {
  const [availableSlots, setAvailableSlots] = useState<ITimeSlot[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID;

  const slotDuration = selectedService?.duration ?? 60;

  useEffect(() => {
    async function fetchSlots() {
      if (!selectedDate || !selectedProfessional || !businessId) return;

      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");

        const fetches: Promise<Response>[] = [
          authFetch(`${apiUrl}/schedule/business/${businessId}`),
          authFetch(
            `${apiUrl}/reservation/professional/${selectedProfessional.id}/date/${dateStr}`,
          ),
        ];

        if (userId) {
          fetches.push(
            authFetch(`${apiUrl}/reservation/client/${userId}/date/${dateStr}`),
          );
        }

        const responses = await Promise.all(fetches);
        const schedules = await responses[0].json();
        if (!schedules.length) return;

        const dayOfWeek = format(selectedDate, "EEEE");
        const scheduleDay: ScheduleDay | undefined =
          schedules[0].days?.find(
            (d: ScheduleDay) =>
              weekdayMap[d.day] === dayOfWeek || d.day === dayOfWeek,
          );

        if (!scheduleDay) return;

        const professionalReservations: ReservationSlot[] =
          await responses[1].json();

        let existingReservations = professionalReservations;

        if (responses[2]) {
          const clientReservations: ReservationSlot[] =
            await responses[2].json();
          existingReservations = [
            ...professionalReservations,
            ...clientReservations,
          ];
        }

        const dayStart = scheduleDay.startTime;
        const dayEnd = scheduleDay.endTime;

        const breaks =
          scheduleDay.blocks?.filter((b) => b.type === "Break") ?? [];

        const toMinutes = (t: string) => {
          const [h, m] = t.split(":").map(Number);
          return h * 60 + m;
        };

        const isOverlapping = (
          startA: number,
          endA: number,
          startB: number,
          endB: number,
        ) => startA < endB && endA > startB;

        const slots: ITimeSlot[] = [];
        let current = toMinutes(dayStart);
        const end = toMinutes(dayEnd);

        while (current + slotDuration <= end) {
          const isInsideBreak = breaks.some((b) => {
            const bStart = toMinutes(b.startTime);
            const bEnd = toMinutes(b.endTime);
            return current >= bStart && current < bEnd;
          });

          if (isInsideBreak) {
            const breakEnd = Math.min(
              ...breaks
                .filter((b) => {
                  const bStart = toMinutes(b.startTime);
                  return current >= bStart;
                })
                .map((b) => toMinutes(b.endTime)),
            );
            current = breakEnd;
            continue;
          }

          const slotEnd = current + slotDuration;

          if (slotEnd > end) break;

          const slotStartStr = `${Math.floor(current / 60).toString().padStart(2, "0")}:${(current % 60).toString().padStart(2, "0")}`;
          const slotEndStr = `${Math.floor(slotEnd / 60).toString().padStart(2, "0")}:${(slotEnd % 60).toString().padStart(2, "0")}`;

          const overlapsBreak = breaks.some((b) => {
            const bStart = toMinutes(b.startTime);
            const bEnd = toMinutes(b.endTime);
            return isOverlapping(current, slotEnd, bStart, bEnd);
          });

          const isBooked = existingReservations.some((r) => {
            const rStart = toMinutes(r.startTime);
            const rEnd = toMinutes(r.endTime);
            return isOverlapping(current, slotEnd, rStart, rEnd);
          });

          if (!overlapsBreak && !isBooked) {
            slots.push({
              startTime: slotStartStr,
              endTime: slotEndStr,
            });
          }

          current += slotDuration;
        }

        setAvailableSlots(slots);
      } catch {
        console.error("Error fetching schedule or reservations");
      }
    }

    fetchSlots();
  }, [selectedDate, selectedProfessional, businessId, apiUrl, slotDuration, userId]);

  const formatTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "pm" : "am";
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}${period}`;
  };

  return (
    <StepContainer>
      <div className="flex flex-col items-center">
        <div className="w-full">
          {!selectedDate || !selectedProfessional ? (
            <p className="text-center text-gray-400 py-8">
              Selecciona una fecha y profesional primero
            </p>
          ) : availableSlots.length === 0 ? (
            <p className="text-center text-gray-400 py-8">
              No hay horarios disponibles para esta fecha
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-2">
              {availableSlots.map((slot, index) => (
                <button
                  key={`${slot.startTime}_${index}`}
                  type="button"
                  onClick={() => onSelectTime(slot)}
                  className={`flex items-center justify-center rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200 shadow-sm ${
                    selectedTime?.startTime === slot.startTime
                      ? "bg-pink-100 text-white ring-2 ring-pink-300 shadow-md scale-105"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-pink-200 hover:shadow-md hover:scale-[1.02]"
                  }`}
                >
                  {formatTime(slot.startTime)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </StepContainer>
  );
};

export default HoraStep;
