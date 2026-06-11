import { cn } from "@/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { useState } from "react";

const daysCharacters = [
  { name: "Domingo", shortName: "Dom", initials: "D" },
  { name: "Lunes", shortName: "Lun", initials: "L" },
  { name: "Martes", shortName: "Mar", initials: "M" },
  { name: "Miércoles", shortName: "Mié", initials: "M" },
  { name: "Jueves", shortName: "Jue", initials: "J" },
  { name: "Viernes", shortName: "Vie", initials: "V" },
  { name: "Sábado", shortName: "Sáb", initials: "S" },
];

export default function Calendar() {
  const today: Date = startOfToday();
  const [selectedDay, setSelectedDate] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(today, "MMM-yyyy")
  );
  const firstDayCurrentMonth: Date = parse(
    currentMonth,
    "MMM-yyyy",
    new Date()
  );

  const newDays: Date[] = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const previousMonth = (): void => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const nextMonth = (): void => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const selectDate = (date: Date): void => {
    if (isBefore(date, today)) return;
    setSelectedDate(date);
  };

  const colStartClasses: string[] = [
    "",
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  return (
    <section className=" px-3 py-4 rounded-lg">
      <div className="flex items-center">
        <h2 className="flex-auto text-lg tracking-tight text-pink-100 font-nunito">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={nextMonth}
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        {daysCharacters.map((day, dayIdx) => (
          <div key={`${day.name}_${dayIdx}`}>{day.initials}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {newDays.map((day, dayIdx) => (
          <div
            key={`${day.toString()}_${dayIdx}`}
            className={cn(
              dayIdx > 6 && "border-t border-gray-200",
              "py-2",
              dayIdx === 0 && colStartClasses[getDay(day)]
            )}
          >
            <button
              type="button"
              onClick={() => selectDate(day)}
              className={cn(
                isEqual(day, selectedDay) && "text-white",
                !isEqual(day, selectedDay) &&
                  isToday(day) &&
                  "text-pink-100 border-2 border-pink-100 rounded-full",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  isSameMonth(day, firstDayCurrentMonth) &&
                  "text-pink-100",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  "text-gray-400",
                isEqual(day, selectedDay) &&
                  isToday(day) &&
                  "bg-pink-100 text-white",
                isEqual(day, selectedDay) && !isToday(day) && "bg-pink-100",
                !isEqual(day, selectedDay) && "hover:bg-gray-200",
                (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                isBefore(day, today) &&
                  "cursor-not-allowed text-gray-400 hover:bg-white",
                "mx-auto flex h-8 w-8 items-center justify-center rounded-full "
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
