import { IBookingState } from "@/interfaces/IBooking";
import { authFetch } from "@/utils/authFetch";
import { format } from "date-fns";

export async function createReservation(
  booking: IBookingState,
  clientId?: string,
): Promise<unknown> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const dateStr = booking.date
    ? format(booking.date, "yyyy-MM-dd")
    : "";

  const body: Record<string, unknown> = {
    professionalId: booking.professional?.id,
    serviceId: booking.service?.id,
    businessId: process.env.NEXT_PUBLIC_BUSINESS_ID,
    date: dateStr,
    startTime: booking.time?.startTime,
    endTime: booking.time?.endTime,
    status: "pending",
  };

  if (clientId) {
    body.clientId = clientId;
  }

  const res = await authFetch(`${apiUrl}/reservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Error creating reservation");
  }

  return res.json();
}

export async function getReservationsByBusiness(): Promise<unknown[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID;
  const res = await authFetch(`${apiUrl}/reservation/business/${businessId}`);
  return res.json();
}
