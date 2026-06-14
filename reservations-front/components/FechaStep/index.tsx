"use client";

import { IProfessional } from "@/interfaces/IBooking";
import { IService } from "@/interfaces/IService";
import { authFetch } from "@/utils/authFetch";
import { addDays, format, getDay, startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "../Calendar";
import StepContainer from "../StepContainer";

interface Props {
  selectedService: IService | null;
  selectedDate: Date | null;
  selectedProfessional: IProfessional | null;
  onSelectDate: (date: Date) => void;
  onSelectProfessional: (professional: IProfessional) => void;
}

interface ScheduleDayData {
  day: string;
  startTime: string;
  endTime: string;
  blocks?: { startTime: string; endTime: string; type: string }[];
}

interface ReservationSlot {
  date: string;
  startTime: string;
  endTime: string;
}

const weekdayMap: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const FechaStep = ({
  selectedService,
  selectedDate,
  selectedProfessional,
  onSelectDate,
  onSelectProfessional,
}: Props) => {
  const [professionals, setProfessionals] = useState<IProfessional[]>([]);
  const [closedDates, setClosedDates] = useState<string[]>([]);
  const [disabledDates, setDisabledDates] = useState<string[]>([]);
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        const res = await authFetch(
          `${apiUrl}/professional/business/${businessId}`,
        );
        const data = await res.json();
        setProfessionals(data);
      } catch {
        console.error("Error fetching professionals");
      }
    }

    fetchProfessionals();
  }, [apiUrl, businessId]);

  useEffect(() => {
    async function fetchScheduleAndAvailability() {
      if (!selectedProfessional || !businessId) return;

      try {
        const [scheduleRes, reservationRes] = await Promise.all([
          authFetch(`${apiUrl}/schedule/business/${businessId}`),
          authFetch(
            `${apiUrl}/reservation/professional/${selectedProfessional.id}`,
          ),
        ]);

        const schedules = await scheduleRes.json();
        const allReservations: ReservationSlot[] = await reservationRes.json();

        if (!schedules.length) return;

        const scheduleDays: ScheduleDayData[] = schedules[0].days ?? [];

        const closed = (schedules[0].closedDays ?? []).map(
          (c: { date: string }) => c.date,
        );

        setClosedDates(closed);

        const workingDayIndices = new Set(
          scheduleDays.map((d) => weekdayMap[d.day]),
        );

        const slotDuration = selectedService?.duration ?? 60;
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

        const hasAvailableSlots = (date: Date): boolean => {
          const dayIdx = getDay(date);
          if (!workingDayIndices.has(dayIdx)) return false;

          const scheduleDay = scheduleDays.find(
            (d) => weekdayMap[d.day] === dayIdx,
          );
          if (!scheduleDay) return false;

          const dayStart = toMinutes(scheduleDay.startTime);
          const dayEnd = toMinutes(scheduleDay.endTime);
          const breaks =
            scheduleDay.blocks?.filter((b) => b.type === "Break") ?? [];

          const dateStr = format(date, "yyyy-MM-dd");
          const dayReservations = allReservations.filter(
            (r) => r.date === dateStr,
          );

          let current = dayStart;
          while (current + slotDuration <= dayEnd) {
            const slotEnd = current + slotDuration;

            const isInsideBreak = breaks.some((b) => {
              const bStart = toMinutes(b.startTime);
              const bEnd = toMinutes(b.endTime);
              return current >= bStart && current < bEnd;
            });
            if (isInsideBreak) {
              const breakEnds = breaks
                .filter((b) => {
                  const bStart = toMinutes(b.startTime);
                  return current >= bStart;
                })
                .map((b) => toMinutes(b.endTime));
              if (breakEnds.length) {
                current = Math.min(...breakEnds);
              }
              continue;
            }

            const overlapsBreak = breaks.some((b) => {
              const bStart = toMinutes(b.startTime);
              const bEnd = toMinutes(b.endTime);
              return isOverlapping(current, slotEnd, bStart, bEnd);
            });

            const isBooked = dayReservations.some((r) => {
              const rStart = toMinutes(r.startTime);
              const rEnd = toMinutes(r.endTime);
              return isOverlapping(current, slotEnd, rStart, rEnd);
            });

            if (!overlapsBreak && !isBooked) return true;

            current += slotDuration;
          }

          return false;
        };

        const today = startOfDay(new Date());
        const disabled: string[] = [];
        for (let i = 1; i <= 365; i++) {
          const date = addDays(today, i);
          if (!hasAvailableSlots(date)) {
            disabled.push(format(date, "yyyy-MM-dd"));
          }
        }
        setDisabledDates(disabled);
      } catch {
        console.error("Error fetching schedule or reservations");
      }
    }

    fetchScheduleAndAvailability();
  }, [apiUrl, businessId, selectedProfessional, selectedService?.duration]);

  const filteredProfessionals = professionals.filter((p) => {
    if (!selectedService) return true;
    if (!p.services || p.services.length === 0) return true;
    return p.services.some((s) => s.id === selectedService.id);
  });

  useEffect(() => {
    if (
      selectedProfessional &&
      !filteredProfessionals.some((p) => p.id === selectedProfessional.id)
    ) {
      onSelectProfessional(filteredProfessionals[0]);
    }
  }, [filteredProfessionals, selectedProfessional, onSelectProfessional]);

  return (
    <StepContainer>
      <div className="flex flex-col lg:flex-row gap-4 p-3">
        <div className="lg:w-1/3">
          <h3 className="text-lg font-semibold text-pink-100 mb-3 font-nunito">
            Profesional de servicio:
          </h3>
          {filteredProfessionals.length === 0 && (
            <p className="text-sm text-gray-400">
              No hay profesionales disponibles para este servicio
            </p>
          )}
          {filteredProfessionals.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectProfessional(p)}
              className={`cursor-pointer p-2 rounded-md mb-2 text-sm ${
                selectedProfessional?.id === p.id
                  ? "bg-pink-100 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {p.user?.firstName ?? "Profesional"} {p.user?.lastName ?? ""}
            </div>
          ))}
        </div>
        <div className="lg:w-2/3">
          {selectedProfessional && (
            <Calendar
              selectedDate={selectedDate}
              onSelectDate={onSelectDate}
              closedDates={closedDates}
              disabledDates={disabledDates}
            />
          )}
        </div>
      </div>
    </StepContainer>
  );
};

export default FechaStep;
